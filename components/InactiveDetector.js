import React from "react";
import { View, PanResponder } from "react-native";
import { useQuery } from '@apollo/react-hooks';
import { GET_CHECKOUT_STATE } from '../constants/graphql-query'

function getCheckoutState() {
  const { data: { checkout }} = useQuery(GET_CHECKOUT_STATE);
  if(checkout === 'IN_PROGRESS'){
    return null
  }
  return checkout
}

const TIMEOUT = 60000;
class InactiveDetector extends React.Component {
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
      onStartShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
      onResponderTerminationRequest: this.handleInactivity
    });
    this.handleInactivity();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleInactivity = () => {
    clearTimeout(this.timeout);

    this.resetTimeout();
  }

  resetTimeout = () => {
    this.timeout = setTimeout(this.homecoming, TIMEOUT);
  }

  onMoveShouldSetPanResponderCapture = () => {
    this.handleInactivity();
    return false;
  }

  homecoming = () => {
    const { navigation } = this.props;
    const currentScreen = navigation.state.routes[navigation.state.index].key;
    const checkoutState = getCheckoutState()
    if (
      (currentScreen === 'MenuScreen' ||
      (currentScreen === 'CheckoutScreen' && checkoutState !== "IN_PROGRESS") ||
      currentScreen === 'MenuItemViewScreen'
      )
    ) {
      navigation.navigate("LandingScreen");
    }
  }

  render() {
    return (
      <View
        collapsable={false}
        style={{
          width: "100%",
          height: "100%"
        }}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </View>
    );
  }
}

export default InactiveDetector;
