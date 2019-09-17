import React, { useEffect } from "react";
import { View, PanResponder } from "react-native";
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { CLEAR_CART } from '../constants/graphql-mutation';

const TIMEOUT = 120000;

function InactiveDetector({
  children,
  navigation
}) {
  const [clearCart] = useMutation(CLEAR_CART);
  this.timeout = null;
  this.panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
    onStartShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
    onResponderTerminationRequest: this.handleInactivity
  });

  this.handleInactivity = () => {
    clearTimeout(this.timeout);

    this.resetTimeout();
  }

  this.resetTimeout = () => {
    this.timeout = setTimeout(this.homecoming, TIMEOUT);
  }

  this.onMoveShouldSetPanResponderCapture = () => {
    this.handleInactivity();
    return false;
  }

  this.homecoming = () => {
    clearCart();
    navigation.navigate("LandingScreen");
  }

  useEffect(() => {
    return () => {
      clearTimeout(this.timeout);
    };
  });


  clearTimeout(this.timeout);
  this.handleInactivity();

  return (
    <View
      collapsable={false}
      {...this.panResponder.panHandlers}
    >
      {children}
    </View>
  );
}

export default InactiveDetector;
