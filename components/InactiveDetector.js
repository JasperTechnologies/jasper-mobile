import React, { useEffect, useState } from "react";
import { View, PanResponder } from "react-native";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_CHECKOUT_STATE
} from '../constants/graphql-query';
import {
  CLEAR_CART
} from '../constants/graphql-mutation';

const TIMEOUT = 120000;

function InactiveDetector({
  children,
  navigation
}) {
  const { data: { checkoutState }} = useQuery(GET_CHECKOUT_STATE);
  const [clearCart] = useMutation(CLEAR_CART);
  const [timeoutId, setTimeoutId] = useState(null);

  this.handleInactivity = () => {
    this.resetTimeout();
  }

  this.resetTimeout = () => {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(this.homecoming, TIMEOUT));
  }

  this.onMoveShouldSetPanResponderCapture = () => {
    this.handleInactivity();
    return false;
  }

  this.homecoming = () => {
    const currentScreen = navigation.state.routes[navigation.state.index].key;
    if (
      (currentScreen === 'MenuScreen' ||
      (currentScreen === 'CheckoutScreen' && checkoutState !== "IN_PROGRESS") ||
      currentScreen === 'MenuItemViewScreen'
      )
    ) {
      clearCart();
      navigation.navigate("LandingScreen");
    }
  }

  [panResponder] = useState(PanResponder.create({
    onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
    onStartShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
    onResponderTerminationRequest: this.onMoveShouldSetPanResponderCapture
  }));

  return (
    <View
      collapsable={false}
      style={{
        width: "100%",
        height: "100%"
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </View>
  );
}
export default InactiveDetector;
