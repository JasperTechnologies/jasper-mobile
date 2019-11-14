import clover from 'remote-pay-cloud';
import React, {createContext, useContext, useState, useEffect, useRef } from 'react';
import { Text } from "react-native";
import _get from 'lodash/get';
import {
  useQuery,
  useMutation
} from '@apollo/react-hooks';
import { getUniqueId } from 'react-native-device-info';
import {
  GET_LOCATION,
  GET_ORDER_TYPE
} from '../../../constants/graphql-query';
import {
  UPDATE_ORDER,
  SET_CHECKOUT_SUCCESS,
  CREATE_ORDER_LOG,
  SET_PAYMENT_PROCESSOR_STATUS
} from '../../../constants/graphql-mutation';
import {
  printKitchenReceipt,
  printCustomerReceipt
} from '../../../utilities/printer';
import {
  cartToOrderLogs
} from '../../../utilities/log';
import LoadingContainer from '../../LoadingContainer';
import {
  toDisplayOrder,
  toSaleRequest,
  toEnterInputOption,
  toEscInputOption,
  toLineItemsPayload,
  delay
} from './utils';

class POSCloverConnectorListener extends clover.sdk.remotepay.ICloverConnectorListener{
    constructor({
      notifySaleSuccess,
      notifyConnected,
      notifyDisconnected
    }) {
      super();
      this.notifySaleSuccess = notifySaleSuccess;
      this.notifyConnected = notifyConnected;
      this.notifyDisconnected = notifyDisconnected;
    }

    onDeviceConnected(){
      console.log('onDeviceConnected');
    }

    onDeviceDisconnected(){
      console.log('onDeviceDisconnected');
      this.notifyDisconnected();
    }

    onDeviceError(deviceErrorEvent){
      console.log('onDeviceError', deviceErrorEvent);
    }

    onDeviceReady(merchantInfo){
      console.log("ready")
      this.notifyConnected();
    }

    onSaleResponse(response) {
      this.notifySaleSuccess(response);
    }

}


export class CloverConnection {
    constructor(){
      this.cloverConnector = null;
      this.connected = false;
      this.applicationId = '17GTAPT6R62MP';

      this.onSaleResponse = null;
    }

    setOnSaleResponse = (onSaleResponse) => {
      this.onSaleResponse = onSaleResponse;
    }

    onSaleSuccess = (response) => {
      if (this.onSaleResponse) {
        this.onSaleResponse(response);
      }
    }

    onDeviceConnected = () => {
      this.connected = true;
    }

    onDeviceDisconnected = () => {
      this.connected = false;
    }

    async connectToDeviceCloud(accessToken, merchantId, deviceId) {
        console.log('connecting.....', accessToken, merchantId, deviceId);
        let factoryConfig = {};
        factoryConfig[clover.CloverConnectorFactoryBuilder.FACTORY_VERSION] = clover.CloverConnectorFactoryBuilder.VERSION_12;
        let cloverConnectorFactory = clover.CloverConnectorFactoryBuilder.createICloverConnectorFactory(factoryConfig);

        const cloudConfigurationBuilder = new clover.WebSocketCloudCloverDeviceConfigurationBuilder(this.applicationId, deviceId, merchantId, accessToken);
        const cloudConfiguration = cloudConfigurationBuilder.setCloverServer("https://sandbox.dev.clover.com/")
            .setFriendlyId('')
            .setForceConnect(false)
            .setHeartbeatInterval(600)
            .setHeartbeatDisconnectTimeout(3000)
            .setReconnectDelay(3000)
            .build();
        this.cloverConnector = cloverConnectorFactory.createICloverConnector(cloudConfiguration);

        let connectorListener = new POSCloverConnectorListener({
          notifySaleSuccess: this.onSaleSuccess,
          notifyConnected: this.onDeviceConnected,
          notifyDisconnected: this.onDeviceDisconnected
        });

        this.cloverConnector.addCloverConnectorListener(connectorListener);
        this.cloverConnector.initializeConnection();
    }
}

const CloverContext = createContext();
export const CloverProvider = ({children}) => {
  const { data: locationData } = useQuery(GET_LOCATION);
  const [ clover, setClover ] = useState(null);

  const location = locationData && locationData.location;
  useEffect(() => {
    if (location) {
      const cloverConnection = new CloverConnection();
      const deviceId = getUniqueId();
      const currentDevice = location.tabletDevices.find((device) => device.headerId === deviceId);

      if (currentDevice &&
          currentDevice.cloverPaymentDeviceId &&
          location.cloverMetaData &&
          location.cloverMetaData.accessToken &&
          location.cloverMetaData.merchantId
        ) {
        cloverConnection.connectToDeviceCloud(location.cloverMetaData.accessToken, location.cloverMetaData.merchantId, currentDevice.cloverPaymentDeviceId);
        setClover(cloverConnection);
      }
    }
  }, [location]);
  return (
    <CloverContext.Provider value={{clover}}>
      {children}
    </CloverContext.Provider>
  );
};

const useClover = () => useContext(CloverContext);

export function OrderDisplayView({ cart, taxes, tipPercentage }) {
  const { clover } = useClover();
  if (clover) {
    clover.cloverConnector.showDisplayOrder(toDisplayOrder(cart, taxes, tipPercentage));
  }
  return null;
}

export function CancelingSaleView() {
  const { clover } = useClover();
  useEffect(() => {
    if (clover) {
      // escaping from sales view
      clover.cloverConnector.invokeInputOption(toEnterInputOption());
      setTimeout(() => {
        clover.cloverConnector.invokeInputOption(toEscInputOption());
      }, 1000);
    }
  }, [])
  return <LoadingContainer message={'Canceling Order...'} />;
}

export function LandingView() {
  const { clover } = useClover();
  if (clover) {
    // show welcome view
    clover.cloverConnector.showWelcomeScreen();
  }

  return null;
}

export function PaymentView({ cart, taxes, tipPercentage }) {
  const { clover } = useClover();
  const { data: { location } } = useQuery(GET_LOCATION);
  const { data: { orderType } } = useQuery(GET_ORDER_TYPE);
  const [ createOrderLog ] = useMutation(CREATE_ORDER_LOG);
  const [ updateOrder ] = useMutation(UPDATE_ORDER);
  const [ setCheckoutSuccess ] = useMutation(SET_CHECKOUT_SUCCESS);

  const showThankyouScreen = async () => {
    for (i = 0; i < 3; i++) {
      if (clover.connected) {
        clover.cloverConnector.showWelcomeScreen();
        setCheckoutSuccess({
          refetchQueries: ["GetCheckoutState"]
        });
        break;
      }
      await delay(2000);
    }
  }
  const onSaleResponse = async (response) => {
    if (response.success) {
      const orderId = response.payment.order.id;
      const lineItems = toLineItemsPayload(cart);
      updateOrder({
        variables: {
          orderId: orderId,
          lineItems
        }
      }).catch((e) => {});

      // logging
      const logs = cartToOrderLogs(cart);
      createOrderLog({
        variables: {
          items: logs
        }
      });

      // print receipts
      const deviceId = getUniqueId();
      const currentDevice = location.tabletDevices.find((device) => device.headerId === deviceId);
      if (currentDevice.receiptPrinter) {
        printCustomerReceipt(cart, _get(response, 'payment.cardTransaction.transactionNo'), orderType, currentDevice.receiptPrinter.ipAddress);
      }
      if (currentDevice.kitchenPrinter) {
        printKitchenReceipt(cart, _get(response, 'payment.cardTransaction.transactionNo'), orderType, currentDevice.kitchenPrinter.ipAddress);
      }

      // show thank you screen
      showThankyouScreen();

    } else {
      // error
    }
  }
  const showSaleView = async () => {
    for (i = 0; i < 3; i++) {
      if (clover.connected) {
        clover.cloverConnector.sale(toSaleRequest(cart, taxes, tipPercentage));
        break;
      }
      await delay(1000);
    }
  }

  useEffect(() => {
    if (clover) {
      clover.setOnSaleResponse(onSaleResponse);
    }
    showSaleView();
  }, []);

  return null;
}

export function CloverStatusIndicator() {
  const { clover } = useClover();
  const [ setPaymentProcessorStatus ] = useMutation(SET_PAYMENT_PROCESSOR_STATUS);
  const [ connected, setConnected ] = useState(clover.connected);
  useEffect(() => {
    const interval = setInterval(() => {
      if (clover.connected) {
        setPaymentProcessorStatus({ variables: { status: "CONNECTED" } });
        setConnected(true);
      } else {
        setPaymentProcessorStatus({ variables: { status: "NOT_CONNECTED" } });
        setConnected(false);
      }
    }, 500);
    return () => {
      clearInterval(interval);
    }
  }, []);

  if (!connected) {
    return <Text style={{ color: "#fc4903" }}>Waiting Clover Device</Text>;
  }
  return <Text style={{ color: "#27e327" }}>Clover Device Connected</Text>;
}
