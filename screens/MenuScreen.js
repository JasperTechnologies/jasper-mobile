import React from "react"
import { StatusBar, StyleSheet, ScrollView } from "react-native"
import { updateCart, updateCurrentMenuItemIndex } from '../reducers/reducer';
import { connect } from 'react-redux';
import InactiveDetector from '../components/InactiveDetector';
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Button,
  Container,
  View
} from "@draftbit/ui"
import MenuItem from "../components/MenuItem"
import MenuHeader from "../components/MenuHeader"

class MenuScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme),
      cart: []
    }
  }

  onPressMenuItem = (index) => {
    this.props.updateCurrentMenuItemIndex(index)
    this.props.navigation.navigate("MenuItemViewScreen")
  }

  render() {
    return (
      <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_npc}>
        <InactiveDetector navigation={this.props.navigation}>
          <Container style={styles.Menu_Page_Container}>
            <MenuHeader navigateToCheckout={() => this.props.navigation.navigate("CheckoutScreen")}/>
            <ScrollView
              contentContainerStyle={styles.Menu_Scrollview}
              bounces={true}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={true}
            >
              {this.props.currentMenuItems.map(({description, title, price, calories, imageURL}, i) => <MenuItem
                key={i}
                description={description}
                title={title}
                price={price}
                calories={calories}
                imageURL={imageURL}
                onPress={this.onPressMenuItem.bind(this, i)}
              />)}
            </ScrollView>
            <View>
              <Button
                style={styles.Button_nqn}
                icon="MaterialIcons/add"
                type="solid"
                onPress={() => {
                  this.props.navigation.navigate("CheckoutScreen")
                }}
              >
                Checkout
              </Button>
            </View>
          </Container>
        </InactiveDetector>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Menu_Page_Container: {
    display: "flex",
    height: "100%"
  },
  Button_nqn: {
  },
  CardContainer_ntj: {
    width: 300
  },
  Menu_Scrollview: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  }
})

const mapStateToProps = state => {
  let cart = state.cart.map((cartItem, i) => ({
    key: i,
    ...cartItem
  }));
  return {
    cart: state.cart,
    currentMenuItems: state.currentMenuItems
  };
};

const mapDispatchToProps = {
  updateCart,
  updateCurrentMenuItemIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MenuScreen));
