import React from "react"
import { StatusBar, StyleSheet, Text, FlatList } from "react-native"
import { updateCart } from '../reducers/reducer';
import InactiveDetector from '../components/InactiveDetector';
import { connect } from 'react-redux';
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Icon,
  Container,
  RowHeadlineImageIcon,
  Button,
  Touchable
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
    const { theme } = this.state

    return (
      <ScreenContainer hasSafeArea={true} scrollable={false} style={styles.Root_n9y}>
        <InactiveDetector navigation={this.props.navigation}>
          <Icon
            style={styles.Icon_nie}
            name="MaterialCommunityIcons/food-fork-drink"
            size={100}
            color={theme.colors.primary}
          />
          <Text
            style={[
              styles.Text_nxj,
              theme.typography.headline1,
              {
                color: theme.colors.medium
              }
            ]}
          >
            Checkout
          </Text>
          <Container style={styles.Container_nmz} elevation={0} useThemeGutterPadding={true}>
            <FlatList
              style={styles.FlatList_nix}
              data={this.props.cart}
              renderItem={({ item }) => (
                <RowHeadlineImageIcon {...item} style={{ marginBottom: theme.spacing.small }} />
              )}
              keyExtractor={(_item, idx) => idx.toString()}
            />
          </Container>
          <Container style={styles.Container_n5h} elevation={0} useThemeGutterPadding={true}>
            <Text
              style={[
                styles.Text_n69,
                theme.typography.headline2,
                {
                  color: theme.colors.medium
                }
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                styles.Text_n69,
                theme.typography.headline4,
                {
                  color: theme.colors.strong
                }
              ]}
            >
              ${this.props.cart.reduce((initial, current) => initial + current.price, 0)}
            </Text>
          </Container>
          <Container style={styles.Container_n5a} elevation={0} useThemeGutterPadding={true}>
            <Button
              style={styles.Button_n7s}
              type="solid"
              onPress={() => {
                this.props.updateCart([])
                this.props.navigation.navigate("ThankYouScreen")
              }}
            >
              Purchase
            </Button>
            <Touchable
              style={styles.Touchable_n2o}
              onPress={() => {
                this.props.navigation.navigate("MenuScreen")
              }}
            >
              <Text
                style={[
                  styles.Text_nmj,
                  theme.typography.button,
                  {
                    color: theme.colors.light
                  }
                ]}
              >
                Back
              </Text>
            </Touchable>
          </Container>
        </InactiveDetector>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Button_n7s: {
    width: "100%",
    height: 48
  },
  Container_n5a: {
    marginBottom: 24
  },
  Container_n5h: {
    alignItems: "center"
  },
  Icon_nie: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 25
  },
  Root_n9y: {
    justifyContent: "space-between"
  },
  Text_n69: {
    textAlign: "center",
    width: "90%",
    height: 20,
    marginBottom: 10
  },
  Text_nmj: {
    textAlign: "center",
    height: 20,
    marginTop: 20
  },
  Text_nxj: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  Touchable_n2o: {
    marginBottom: 24
  }
})

const mapStateToProps = state => {
  let cart = state.cart.map((cartItem, i) => ({
    key: i,
    icon: "MaterialIcons/favorite",
    image: cartItem.imageURL,
    subtitle: `${cartItem.price * cartItem.quantity}`,
    ...cartItem,
    title: cartItem.title + ` x${cartItem.quantity}`
  }));
  return {
    cart
  };
};

const mapDispatchToProps = {
  updateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CheckoutScreen));
