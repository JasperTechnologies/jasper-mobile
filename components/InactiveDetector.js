import React, { useState } from "react";
import { View, PanResponder, Text, StyleSheet } from "react-native";
import { useQuery, useMutation } from '@apollo/react-hooks';
import CountdownCircle from './CountdownCircle'
import ModalContainer from './ModalContainer';
import {
  GET_CHECKOUT_STATE
} from '../constants/graphql-query';
import {
  CLEAR_CART
} from '../constants/graphql-mutation';
import {
  withTheme,
  Container,
} from "@draftbit/ui";

function InactivityModal({theme, showTimer, homecoming, setShowTimer}) {
  if (showTimer) {
    return <ModalContainer>
    <Container style={[styles.Checkout_Container, styles.Container_MenuItemNav, styles.Modal_Container]}>
      <Text style={[styles.ModalHeader, theme.typography.headline1]}>
        Are You Still There? Tap To Continue
      </Text>
      <CountdownCircle
        seconds={1}
        radius={80}
        borderWidth={16}
        color="#ff003f"
        bgColor="#fff"
        textStyle={{ fontSize: 20 }}
        onTimeElapsed={() => {
          homecoming();
          setShowTimer(false)
        }}
      />
    </Container>
  </ModalContainer>
  }
  return (
    null
  );
}


const TIMEOUT = 20000;

function InactiveDetector({
  children,
  navigation,
  theme
}) {
  const { data: { checkoutState }} = useQuery(GET_CHECKOUT_STATE);
  const [clearCart] = useMutation(CLEAR_CART);
  const [timeoutId, setTimeoutId] = useState(null);
  const [showTimer, setShowTimer] = useState(null);

  this.handleInactivity = () => {
    const currentScreen = navigation.state.routes[navigation.state.index].key;
    if (
      (currentScreen === 'MenuScreen' ||
      (currentScreen === 'CheckoutScreen' && checkoutState !== "IN_PROGRESS") ||
      currentScreen === 'MenuItemViewScreen'
      )
    ) {
      this.resetTimeout();
    }
  }

  this.resetTimeout = () => {
    clearTimeout(timeoutId);
    setShowTimer(false)
    setTimeoutId(setTimeout(() => setShowTimer(true), TIMEOUT));
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
      <InactivityModal
        theme={theme}
        showTimer={showTimer}
        homecoming={this.homecoming}
        setShowTimer={setShowTimer}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  Checkout_Container: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  Container_MenuItemNav: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  Touchable_Back: {
    alignSelf: "flex-start",
    margin: 24
  },
  CartItem_Cell: {
    display: "flex",
    flexDirection: "row",
		marginBottom: 24,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    minHeight: 150
  },
  Root_n9y: {
    justifyContent: "space-between"
  },
  Modal_Container: {
    height: "40%",
    width: "30%",
    backgroundColor: 'white',
    borderRadius: 10
  },
  ModalHeader: {
    marginTop: 50,
    paddingRight: 50,
    paddingLeft: 50,
    textAlign: 'center',
    marginBottom: 50
  }
})

export default withTheme(InactiveDetector);
