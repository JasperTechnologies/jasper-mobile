import React from "react"
import { StatusBar, StyleSheet, ScrollView } from "react-native"
import { updateCart, updateCurrentMenuItemIndex } from '../reducers/reducer';
import { connect } from 'react-redux';
import Homecoming from '../components/Homecoming';
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Button
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
        <Homecoming navigation={this.props.navigation} />
        <MenuHeader navigateToCheckout={() => this.props.navigation.navigate("CheckoutScreen")}/>
        <ScrollView
          contentContainerStyle={styles.ScrollView_na3}
          bounces={true}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
        >
          {this.props.menuItems.map(({description, title, price, calories, imageURL}, i) => <MenuItem
            key={i}
            description={description}
            title={title}
            price={price}
            calories={calories}
            imageURL={imageURL}
            onPress={this.onPressMenuItem.bind(this, i)}
          />)}
        </ScrollView>
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
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  MenuHeaderText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    paddingRight: 20,
    paddingTop: 40
  },
  MenuHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20
  },
  Button_nqn: {
    marginTop: 40
  },
  CardContainer_ntj: {
    width: 300
  },
  Icon_n49: {
    width: 48,
    height: 48,
    alignSelf: "flex-end",
    marginTop: 40,
    marginRight: 40
  },
  ScrollView_na3: {
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 200,
    marginTop: 60,
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
    menuItems: state.menuItems
  };
};

const mapDispatchToProps = {
  updateCart,
  updateCurrentMenuItemIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MenuScreen));
