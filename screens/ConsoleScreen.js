import React, { useEffect, useState } from "react"
import { AsyncStorage, StatusBar, StyleSheet, Text } from "react-native"
import { useQuery } from '@apollo/react-hooks';
import {
  withTheme,
  ScreenContainer,
  Container,
  Button,
  Touchable,
  View
} from "@draftbit/ui";
import { getUniqueId } from 'react-native-device-info';
import {
  GET_PAYMENT_PROCESSOR_STATUS,
  GET_LOCATION
} from '../constants/graphql-query';
import { yummy as theme } from "../config/Themes"
import { PaymentProcessorStatusIndicator } from '../components/payment-processors/status-indicator';
import { findPrinters } from '../utilities/printer';
function ConsoleScreen({ navigation }) {
  const { data: { paymentProcessorStatus }} = useQuery(GET_PAYMENT_PROCESSOR_STATUS);
  const { data: locationData } = useQuery(GET_LOCATION);
  const [ kitchenPrinterConnected, setKitchenPrinterConnected ] = useState(false);
  const [ receiptPrinterConnected, setReceiptPrinterConnected ] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const printers = await findPrinters() || [];
      const deviceId = getUniqueId();
      const location = locationData && locationData.location;
      const currentDevice = location.tabletDevices.find((device) => device.headerId === deviceId);
      if (currentDevice.kitchenPrinter && printers.find((printer => printer.portName === currentDevice.kitchenPrinter.ipAddress))) {
        setKitchenPrinterConnected(true);
      } else {
        setKitchenPrinterConnected(false);
      }

      if (currentDevice.receiptPrinter && printers.find((printer => printer.portName === currentDevice.receiptPrinter.ipAddress))) {
        setReceiptPrinterConnected(true);
      } else {
        setReceiptPrinterConnected(false);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  const logout = () => {
    AsyncStorage.removeItem("userToken", () => {
      navigation.navigate("EmailPasswordLoginScreen");
    });
  };

  const isReady = () => {
    if (
      paymentProcessorStatus === "CONNECTED" &&
      receiptPrinterConnected &&
      kitchenPrinterConnected
    ) {
      return true;
    }

    return false;
  };

  return (
    <ScreenContainer scrollable={false}>
      <Touchable
        disabled={!isReady()}
        onPress={() => {
          navigation.navigate("LandingScreen");
        }}
      >
        <Container
          style={styles.MainContainer}
          backgroundImageResizeMode="cover"
        >
          <Text
            style={styles.TabTo_Text_Text}
          >{isReady() ? "Tab to Landing View" : "Waiting for Devices"}</Text>
          <PaymentProcessorStatusIndicator />
          {
            receiptPrinterConnected ?
            <Text style={{ color: "#27e327" }}>Receipt Printer Connected</Text> :
            <Text style={{ color: "#fc4903" }}>Waiting Receipt Printer</Text>
          }
          {
            kitchenPrinterConnected ?
            <Text style={{ color: "#27e327" }}>Kitchen Printer Connected</Text> :
            <Text style={{ color: "#fc4903" }}>Waiting Kitchen Printer</Text>
          }
        </Container>
      </Touchable>
      <View style={styles.Logout_Button_Container}>
        <Button
          style={styles.Logout_Button}
          type="outline"
          color={theme.colors.primary}
          onPress={this.logout}
        >
          Logout
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  Logout_Button: {
  },
  MainContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  TabTo_Text_Text: {
    fontWeight: 'bold',
    fontSize: 40,
    paddingBottom: 24
  },
  Logout_Button_Container: {
    position: "absolute",
    bottom: 10,
    right: 10
  }
})

export default ConsoleScreen
