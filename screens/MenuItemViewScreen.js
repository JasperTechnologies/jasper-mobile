import React from "react"
import { StatusBar, StyleSheet, View, ScrollView, Text, FlatList } from "react-native"
import { updateCart } from '../reducers/reducer';
import { yummy as screenTheme } from '../config/Themes';
import { centsToDollar } from '../utilities/money';
import { connect } from 'react-redux';
import {
  withTheme,
  ScreenContainer,
  Image,
  Container,
  RowBodySwitch,
  Stepper,
  Button,
  Touchable
} from "@draftbit/ui"

class MenuItemViewScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme),
      quantity: 0
    }
  }

  updateQuantity = (newQuantity) => {
    this.setState({ quantity: newQuantity})
  }

  handleAddItemToCart = () => {
    const quantity = this.state.quantity
    const { cart, currentMenuItemIndex, menuItems} = this.props
    const currentMenuItem = menuItems[currentMenuItemIndex]
    const newCartItem = { quantity, ...currentMenuItem}
    const newCart = cart.concat(newCartItem)
    this.props.updateCart(newCart)
  }

  render() {
    const { theme } = this.state
    const { currentMenuItemIndex, menuItems} = this.props
    const currentMenuItem = menuItems[currentMenuItemIndex]
    return (
      <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_npc}>
        <Image style={styles.Image_ne5} source={currentMenuItem.imageURL} resizeMode="cover" />
        <Container style={styles.Container_nqd} elevation={0} useThemeGutterPadding={true}>
          <Text
            style={[
              styles.Text_nwi,
              theme.typography.headline4,
              {
                color: theme.colors.strong
              }
            ]}
          >
            {currentMenuItem.title}
          </Text>
          <Text
            style={[
              styles.Text_nn7,
              theme.typography.subtitle2,
              {
                color: theme.colors.medium
              }
            ]}
          >
            {currentMenuItem.descriptoin}
          </Text>
          <Text
            style={[
              styles.Text_n2d,
              theme.typography.caption,
              {
                color: theme.colors.light
              }
            ]}
          >
            {currentMenuItem.calories} Cal.
          </Text>
          <Text
            style={[
              styles.Text_ngd,
              theme.typography.headline5,
              {
                color: theme.colors.primary
              }
            ]}
          >
            ${currentMenuItem.price}
          </Text>
        </Container>
        <Container style={styles.Container_nqy} elevation={0} useThemeGutterPadding={true}>
          <Text
            style={[
              styles.Text_n14,
              theme.typography.headline1,
              {
                color: theme.colors.medium
              }
            ]}
          >
            Ingredients
          </Text>
          <View style={styles.View_nzi}>
            <ScrollView
              contentContainerStyle={styles.ScrollView_nrz}
              showsVerticalScrollIndicator={true}
            >
              <FlatList
                style={styles.FlatList_nqo}
                data={currentMenuItem.ingredients ? currentMenuItem.ingredients.map(
                  (ingredient) => ({
                    color: "medium",
                    title: `${ingredient.name} ${ingredient.price ? `($${centsToDollar(ingredient.price)})` : ''}`,
                    fieldName: "switchValue"
                  })
                ) : []}
                renderItem={({ item }) => (
                  <RowBodySwitch {...item} style={{ marginBottom: theme.spacing.small }} />
                )}
                keyExtractor={(_item, idx) => idx.toString()}
              />
            </ScrollView>
          </View>
        </Container>
        <Container
          style={styles.Container_n2x}
          elevation={0}
          backgroundColor={theme.colors.divider}
          useThemeGutterPadding={true}
        >
          <Stepper onChange={this.updateQuantity} value={this.state.quantity} style={styles.Stepper_nrj} />
          <Button
            style={styles.Button_n5x}
            type="solid"
            color={theme.colors.primary}
            onPress={() => {
              this.handleAddItemToCart()
              this.props.navigation.navigate("MenuScreen")
            }}
          >
            Add To Cart
          </Button>
          <Touchable
            style={styles.Touchable_n3w}
            onPress={() => {
              this.updateQuantity(0)
              this.props.navigation.navigate("MenuScreen")
            }}
          >
            <Text
              style={[
                styles.Text_n54,
                theme.typography.button,
                {
                  color: theme.colors.primary
                }
              ]}
            >
              Back
            </Text>
          </Touchable>
        </Container>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Button_n5x: {
    width: "100%",
    height: 48
  },
  Container_n2x: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
    flexGrow: 1
  },
  Container_nqd: {
    paddingVertical: 16
  },
  Container_nqy: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  Image_ne5: {
    width: "100%",
    height: "35%"
  },
  ScrollView_nrz: {
    minWidth: "100%",
    minHeight: 0,
    paddingBottom: 100
  },
  Stepper_nrj: {
    width: 126,
    height: 42,
    marginBottom: 16
  },
  Text_n14: {
    paddingBottom: 40
  },
  Text_n2d: {
    textAlign: "auto",
    width: "100%",
    marginTop: 8
  },
  Text_n54: {
    textAlign: "center"
  },
  Text_ngd: {
    textAlign: "left",
    marginTop: 16
  },
  Text_nn7: {
    textAlign: "auto",
    width: "100%",
    marginTop: 8
  },
  Text_nwi: {
    textAlign: "auto",
    width: "100%"
  },
  Touchable_n3w: {
    width: "100%",
    marginTop: 24
  },
  View_nzi: {
    maxHeight: 250,
    alignSelf: "center",
    alignContent: "center"
  }
})

const mapStateToProps = state => {
  return {
    cart: state.cart,
    menuItems: state.menuItems,
    currentMenuItemIndex: state.currentMenuItemIndex
  };
};

const mapDispatchToProps = {
  updateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MenuItemViewScreen));
