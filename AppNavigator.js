import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import MenuItemViewScreen from "./screens/MenuItemViewScreen"
import EmailPasswordLoginScreen from "./screens/EmailPasswordLoginScreen"
import SimpleWelcomeScreen from "./screens/SimpleWelcomeScreen"
import SignupWithEmailScreen from "./screens/SignupWithEmailScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"
import MenuScreen from "./screens/MenuScreen"
import CheckoutScreen from "./screens/CheckoutScreen"
import ThankYouScreen from "./screens/ThankYouScreen"

import { Icon, Touchable } from "@draftbit/ui"

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
)
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
