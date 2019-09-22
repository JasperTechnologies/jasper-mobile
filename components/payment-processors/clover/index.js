import clover from 'remote-pay-cloud';
import React, {createContext, useContext, useState, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_LOCATION
} from '../../../constants/graphql-query';

class POSCloverConnectorListener extends clover.sdk.remotepay.ICloverConnectorListener{

    // called when the Clover device is connected, but not ready to communicate
    onDeviceConnected(){
        console.log('onDeviceConnected');
    }

    // called when the Clover device is disconnected
    onDeviceDisconnected(){
        console.log('onDeviceDisconnected');
    }

    // called when a Clover device error event is encountered
    onDeviceError(deviceErrorEvent){
        console.log('onDeviceError', deviceErrorEvent);
        //TODO
    }

    // called when the Clover device is ready to communicate
    onDeviceReady(merchantInfo){
        console.log("ready", merchantInfo)
    }

}


export class CloverConnection {
    constructor(){
        this.cloverConnector = null;
        this.connected = false;
        this.applicationId = '17GTAPT6R62MP';
        // Object.assign(this, options);
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
            .setHeartbeatInterval(1000)
            .setReconnectDelay(3000)
            .build();
        this.cloverConnector = cloverConnectorFactory.createICloverConnector(cloudConfiguration);

        let connectorListener = new POSCloverConnectorListener();

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
      cloverConnection.connectToDeviceCloud("02f99667-7967-3839-490a-ffb9c842af97", "NHB4X5ZMNBPJ1", "7354c7fb-8de6-07fa-110e-9c34b69d0ead");
      setClover(cloverConnection);
    }
  }, [location]);
  return (
    <CloverContext.Provider value={{clover}}>
      {children}
    </CloverContext.Provider>
  );
};
export const useClover = () => useContext(CloverContext);
