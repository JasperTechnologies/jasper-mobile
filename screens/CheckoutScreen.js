import React from "react"
import { StatusBar, StyleSheet, Text, FlatList, ScrollView } from "react-native"
import {
  editMenuItem,
  removeItemFromCart
} from '../reducers/reducer';
import InactiveDetector from '../components/InactiveDetector';
import CheckoutRemoveButton from '../components/CheckoutRemoveButton';
import { connect } from 'react-redux';
import { yummy as screenTheme } from "../config/Themes"
import {
  centsToDollar,
  calculateTotalPrice,
  getSubtotalOfCart,
  getSubtotalTaxOfCart,
  getTotalOfCart
} from '../utilities/money';
import {
  withTheme,
  ScreenContainer,
  Icon,
  IconButton,
  Image,
  Container,
  RowHeadlineImageIcon,
  Button,
  View,
  Touchable
} from "@draftbit/ui"

function EmptyView() {
  return (
    <View>
      <Text>Your cart is empty</Text>
    </View>
  );
}

class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("dark-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  renderCheckout = () => {
    const { theme } = this.state;
    const { cart } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.ScrollView_Main}
          showsVerticalScrollIndicator={true}
        >
          <Container style={styles.Checkout_Logo_Container}>
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
          </Container>
          <Container style={styles.CartItem_Cell_Container} elevation={0} useThemeGutterPadding={true}>
            {
              cart.map((item, index) => {
                return (
                  <Touchable
                    key={`${item.name}-${index}`}
                    onPress={
                      () => {
                        this.props.editMenuItem(item);
                        this.props.navigation.navigate("MenuItemViewScreen");
                      }
                    }
                  >
                    <View style={styles.CartItem_Cell}>
                      <View style={styles.CartItem_Cell_Image_Container}>
                        <Image style={styles.CartItem_Cell_Image} source={item.imageURL} resizeMode="cover" />
                      </View>
                      <View style={styles.CartItem_Cell_Content}>
                        <View>
                          <View style={styles.CartItem_Top_Container}>
                            <Text
                              style={[
                                theme.typography.headline1,
                                {
                                  color: theme.colors.strong
                                }
                              ]}
                            >
                              {item.title}
                            </Text>
                            <View style={styles.CartItem_Count_Container}>
                              <Text
                                style={[
                                  theme.typography.headline3,
                                  {
                                    color: theme.colors.primary
                                  }
                                ]}
                              >
                                {item.form.quantity}
                              </Text>
                            </View>
                            <View style={styles.CartItem_Price_Container}>
                              <Text
                                style={[
                                  theme.typography.headline3
                                ]}
                              >
                                {`$${centsToDollar(calculateTotalPrice(item.price, item.form.quantity, item.form.options))}`}
                              </Text>
                            </View>
                          </View>
                          {
                            item.form.options.map((option, optionIndex) => {
                              return (
                                <Text
                                  key={`${option.name}-${optionIndex}`}
                                  style={[
                                    theme.typography.headline4,
                                    {
                                      color: theme.colors.strong
                                    }
                                  ]}
                                >
                                  {option.name}
                                </Text>
                              );
                            })
                          }
                          <View style={styles.Remove_Button_Container}>
                            <CheckoutRemoveButton
                              removeItemFromCart={this.props.removeItemFromCart}
                              item={item}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </Touchable>
                );
              })
            }
          </Container>
          <Container style={styles.Price_Container} useThemeGutterPadding={true}>
            <View style={styles.Price_Label_Container}>
              <Text
                style={[
                  theme.typography.headline3
                ]}
              >
                Subtotal
              </Text>
            </View>
            <View style={styles.Price_Value_Container}>
              <Text
                style={[
                  theme.typography.headline3
                ]}
              >
                {`$${centsToDollar(getSubtotalOfCart(cart))}`}
              </Text>
            </View>
          </Container>
          <Container style={styles.Price_Container} useThemeGutterPadding={true}>
            <View style={styles.Price_Label_Container}>
              <Text
                style={[
                  theme.typography.headline3
                ]}
              >
                Tax
              </Text>
            </View>
            <View style={styles.Price_Value_Container}>
              <Text
                style={[
                  theme.typography.headline3
                ]}
              >
                {`$${centsToDollar(getSubtotalTaxOfCart(cart))}`}
              </Text>
            </View>
          </Container>
          <Container style={styles.Price_Container} useThemeGutterPadding={true}>
            <View style={styles.Price_Label_Container}>
              <Text
                style={[
                  theme.typography.headline1
                ]}
              >
                Total
              </Text>
            </View>
            <View style={styles.Price_Value_Container}>
              <Text
                style={[
                  theme.typography.headline1
                ]}
              >
                {`$${centsToDollar(getTotalOfCart(cart))}`}
              </Text>
            </View>
          </Container>
        </ScrollView>
        <Container style={styles.Footer_Container} elevation={0} useThemeGutterPadding={true}>
          <Button
            style={styles.Button_n7s}
            type="solid"
            onPress={() => {
              this.props.navigation.navigate("ThankYouScreen")
            }}
          >
            Purchase
          </Button>
        </Container>
      </View>
    );
  }

  render() {
    const { theme } = this.state;
    const { cart } = this.props;
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
            {
              cart.length ?
              this.renderCheckout() : <EmptyView />
            }
          </Container>
        </InactiveDetector>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  ScrollView_Main: {
  },
  Price_Container: {
    display: 'flex',
    flexDirection: 'row'
  },
  Price_Label_Container: {
    flex: 1,
    alignItems: 'flex-start'
  },
  Price_Value_Container: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 24
  },
  Checkout_Container: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  Checkout_Logo_Container: {
    paddingBottom: 50
  },
  Container_MenuItemNav: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  Touchable_Back: {
    alignSelf: "flex-start",
    margin: 24
  },
  CartItem_Count_Container: {
    borderWidth: 2,
    borderColor: '#DDDDDD',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 3,
    marginTop: -5,
    marginLeft: 10
  },
  CartItem_Price_Container: {
    display: "flex",
    flex: 1,
    alignItems: "flex-end"
  },
  CartItem_Cell_Container: {
    borderTopColor: '#DDDDDD',
    borderTopWidth: 2,
    paddingVertical: 24
  },
  CartItem_Top_Container: {
    display: 'flex',
    flexDirection: 'row'
  },
  CartItem_Cell: {
    display: "flex",
    flexDirection: "row",
		marginBottom: 24,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    minHeight: 150
  },
  CartItem_Cell_Image_Container: {
    width: 100,
    height: 100,
    overflow: "hidden"
  },
  CartItem_Cell_Image: {
    width: 100,
    height: 100
  },
  CartItem_Cell_Content: {
    flex: 1,
    paddingHorizontal: 24
  },
  Button_n7s: {
    width: "100%",
    height: 48
  },
  Footer_Container: {
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
  Remove_Button_Container: {
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 12
  }
})

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = {
  editMenuItem,
  removeItemFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CheckoutScreen));
