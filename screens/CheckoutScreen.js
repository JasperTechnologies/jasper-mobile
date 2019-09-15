import React from "react"
import { StatusBar, StyleSheet, Text, FlatList, ScrollView } from "react-native"

import InactiveDetector from '../components/InactiveDetector';
import CheckoutBody from '../components/CheckoutBody'
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Icon,
  IconButton,
  Container,
} from "@draftbit/ui"

class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("dark-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { theme } = this.state;
    return (
      <ScreenContainer hasSafeArea={true} scrollable={false} style={styles.Root_n9y}>
        <InactiveDetector navigation={this.props.navigation}>
          <Container style={styles.Checkout_Container}>
            <Container style={styles.Container_MenuItemNav} elevation={0}>
              <IconButton
                style={styles.Touchable_Back}
                icon="MaterialIcons/arrow-back"
                size={32}
                color={theme.colors.primary}
                onPress={() => {
                  this.props.navigation.navigate("MenuScreen")
                }}
              />
            </Container>
            <CheckoutBody 
              theme={theme} 
              navigateToPurchase={() => this.props.navigation.navigate("ThankYouScreen")}
              navigateToMenuItem={() => this.props.navigation.navigate("MenuItemViewScreen")}
              />
          </Container>
        </InactiveDetector>
      </ScreenContainer>
    )
  }
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
})


export default withTheme(CheckoutScreen);
