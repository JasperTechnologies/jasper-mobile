import React from "react";
import { View, PanResponder } from "react-native";
import { connect } from 'react-redux';
import {
  clearCart
} from '../reducers/reducer';

const TIMEOUT = 120000;
class InactiveDetector extends React.Component {
  constructor(props) {
    super(props);
  }
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
    this.props.clearCart();
    this.props.navigation.navigate("LandingScreen")
  }

  render() {
    return (
      <View
        collapsable={false}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </View>
    );
  }
}
export default InactiveDetector;
// const mapStateToProps = state => {
//   return {};
// };
//
// const mapDispatchToProps = {
//   clearCart
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(InactiveDetector);
