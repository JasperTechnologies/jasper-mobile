import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import InactiveDetector from "./components/InactiveDetector";

import MenuItemViewScreen from "./screens/MenuItemViewScreen"
import EmailPasswordLoginScreen from "./screens/EmailPasswordLoginScreen"
import SimpleWelcomeScreen from "./screens/SimpleWelcomeScreen"
import LandingScreen from "./screens/LandingScreen"
import SignupWithEmailScreen from "./screens/SignupWithEmailScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"
import MenuScreen from "./screens/MenuScreen"
import CheckoutScreen from "./screens/CheckoutScreen"
import ThankYouScreen from "./screens/ThankYouScreen"

import { CloverProvider } from "./components/payment-processors/clover";

function shouldShowBackButton(stackRouteNavigation) {
  let parent = stackRouteNavigation.dangerouslyGetParent()
  return parent.state.routes.indexOf(stackRouteNavigation.state) > 0
}

const AppNavigator = createSwitchNavigator(
  {
    MenuItemViewScreen: {
      screen: MenuItemViewScreen,
      navigationOptions: ({ navigation }) => ({ title: "Menu Item View" })
    },
    EmailPasswordLoginScreen: {
      screen: EmailPasswordLoginScreen,
      navigationOptions: ({ navigation }) => ({ title: "Email & Password Login" })
    },
    SimpleWelcomeScreen: {
      screen: SimpleWelcomeScreen,
      navigationOptions: ({ navigation }) => ({ title: "Simple Welcome" })
    },
    SignupWithEmailScreen: {
      screen: SignupWithEmailScreen,
      navigationOptions: ({ navigation }) => ({ title: "Signup With Email" })
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
      navigationOptions: ({ navigation }) => ({ title: "Forgot Password" })
    },
    LandingScreen: {
      screen: LandingScreen,
      navigationOptions: ({ navigation }) => ({ title: "Landing" })
    },
    MenuScreen: {
      screen: MenuScreen,
      navigationOptions: ({ navigation }) => ({ title: "Menu" })
    },
    CheckoutScreen: {
      screen: CheckoutScreen,
      navigationOptions: ({ navigation }) => ({ title: "Checkout" })
    },
    ThankYouScreen: {
      screen: ThankYouScreen,
      navigationOptions: ({ navigation }) => ({ title: "Thank You" })
    }
  },
  {
    initialRouteName: "EmailPasswordLoginScreen"
  }
);

function ProcessorProvider({ children }) {
  // logic to determine processor Provider
  return (
    <CloverProvider>
      {children}
    </CloverProvider>
  );
}

class AppContainer extends React.Component {
  static router = {
    ...AppNavigator.router,
    getStateForAction: (action, lastState) => {
      return AppNavigator.router.getStateForAction(action, lastState);
    },
  };

  render() {
    const { navigation } = this.props;

    return (
      <ProcessorProvider>
        <InactiveDetector navigation={navigation}>
          <AppNavigator navigation={navigation} />
        </InactiveDetector>
      </ProcessorProvider>
    );
  }
}

export default createAppContainer(AppContainer)
