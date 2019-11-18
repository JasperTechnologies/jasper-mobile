import React from "react"
import { useQuery } from '@apollo/react-hooks';
import {
  GET_LOCATION
} from './constants/graphql-query';
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import InactiveDetector from "./components/InactiveDetector";
import Notification from './components/Notification';
import ProcessorNavigationDetector from "./components/payment-processors/processor-navigation-detector";
import MenuItemViewScreen from "./screens/MenuItemViewScreen"
import EmailPasswordLoginScreen from "./screens/EmailPasswordLoginScreen"
import ConsoleScreen from "./screens/ConsoleScreen"
import LandingScreen from "./screens/LandingScreen"
import MenuScreen from "./screens/MenuScreen"
import CheckoutScreen from "./screens/CheckoutScreen"
import ThankYouScreen from "./screens/ThankYouScreen";

import { CloverProvider } from "./components/payment-processors/clover";
import { getProvider } from './utilities/payment-processor';

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
    ConsoleScreen: {
      screen: ConsoleScreen,
      navigationOptions: ({ navigation }) => ({ title: "Console" })
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
  //logic to determine processor Provider
  const { data: locationData, loading } = useQuery(GET_LOCATION);
  const provider = getProvider(locationData ? locationData.location : null);
  if (loading || !provider) {
    return [
      children
    ];
  }
  if (provider === 'CLOVER') {
    return (
      <CloverProvider>
        {children}
      </CloverProvider>
    );
  }

  return null;
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
        <Notification />
        <ProcessorNavigationDetector navigation={navigation} />
        <InactiveDetector navigation={navigation}>
          <AppNavigator navigation={navigation} />
        </InactiveDetector>
      </ProcessorProvider>
    );
  }
}

export default createAppContainer(AppContainer)
