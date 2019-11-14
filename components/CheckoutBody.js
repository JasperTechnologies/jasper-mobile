import React, { useState } from "react"
import { StyleSheet, Text, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  GET_CART,
	GET_TIP_PERCENTAGE,
	GET_LOCATION,
  GET_CHECKOUT_STATE,
  GET_ORDER_TYPE,
} from '../constants/graphql-query';
import {
  REMOVE_ITEM_FROM_CART,
	SET_TIP_PERCENTAGE,
  SET_CHECKOUT_IN_PROGRESS,
	CHECKOUT_COMPLETE,
  SET_ORDER_TYPE
} from '../constants/graphql-mutation';
import CartItem from './CartItem'
import CheckoutTotalItem from './CheckoutTotalItem';
import {
  centsToDollar,
  getTipsOfCart,
  getPaymentSummary
} from '../utilities/money';
import {
  withTheme,
  Container,
  View,
} from "@draftbit/ui"
import FooterNavButton from "./FooterNavButton";
import gql from 'graphql-tag';
function EmptyView() {
  return (
    <View>
      <Text>Your cart is empty</Text>
    </View>
  );
}

const tipPercentages = [0, 5, 10, 15, 20]

function CheckoutBody({theme, navigateToMenuItem}) {
	const [ removeItemFromCart ] = useMutation(REMOVE_ITEM_FROM_CART);
	const [ setTipPercentage ] = useMutation(SET_TIP_PERCENTAGE);
	const [ setCheckoutInProgress ] = useMutation(SET_CHECKOUT_IN_PROGRESS);
	const [ checkoutComplete ] = useMutation(CHECKOUT_COMPLETE);
  const [ setOrderType ] = useMutation(SET_ORDER_TYPE);
	const { data: cartData, loading, error } = useQuery(GET_CART);
	const { data: { tipPercentage } } = useQuery(GET_TIP_PERCENTAGE);
  const { data: { orderType } } = useQuery(GET_ORDER_TYPE);
  const { data: { location: { taxes } } } = useQuery(GET_LOCATION);
	if (loading || error) {
		return null;
	}

	const { cart } = cartData;

  const onCheckout = () => {
    setCheckoutInProgress({
      refetchQueries: ["GetCheckoutState"]
    });
  };

  const {
    subTotal,
    tax,
    total,
    tip,
    totalPayment
  } = getPaymentSummary(cart, taxes, tipPercentage);
	return cart.length === 0 ?
		<EmptyView /> :(
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={styles.ScrollView_Main}
				showsVerticalScrollIndicator={true}
			>
				<Container
          style={[
            styles.Checkout_Title_Container
          ]}
        >
					<Text
						style={[
							styles.Checkout_Title,
							{
								color: theme.colors.medium
							}
						]}
					>
						Let's Checkout
					</Text>
				</Container>
				<Container style={styles.CartItem_Cell_Container} elevation={0} useThemeGutterPadding={true}>
					{
						cart.map((item, index) => {
							return (
								<CartItem
									key={`${index}-${item.title}`}
									item={item}
									index={index}
									onDelete={() => {
                    removeItemFromCart({
                      variables: {
												index
											},
                      refetchQueries: ["GetCart"]
                    });
                  }}
									onEdit={() => {
                    navigateToMenuItem();
									}}
								/>
							);
						})
					}
				</Container>
        <View style={styles.OrderType_Section}>
          <Text style={[
            styles.Checkout_Title,
            {
              color: theme.colors.medium
            }
          ]}>
            Would you like to Eat Here or To Go?
          </Text>
          <View style={styles.OrderType_View}>
            <TouchableWithoutFeedback
              onPress={() => {
                setOrderType({
                  variables: {
                    orderType: 'EAT_HERE'
                  }
                })
              }}>
              <View
                style={
                  orderType === 'EAT_HERE' ?
                  {
                    ...styles.Selected_OrderType_Box,
                    backgroundColor: theme.colors.primary
                  } : styles.OrderType_Box
                }
              >
                <Text
                  style={[
                    theme.typography.headline1,
                    orderType === 'EAT_HERE' ? styles.Selected_OrderType_Text : styles.OrderType_Text
                  ]}
                >
                  Eat Here
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setOrderType({
                  variables: {
                    orderType: 'TO_GO'
                  }
                })
              }}>
              <View
                style={
                  orderType === 'TO_GO' ?
                  {
                    ...styles.Selected_OrderType_Box,
                    backgroundColor: theme.colors.primary
                  } : styles.OrderType_Box
                }
              >
                <Text
                  style={[
                    theme.typography.headline1,
                    orderType === 'TO_GO' ? styles.Selected_OrderType_Text : styles.OrderType_Text
                  ]}
                >
                  To Go
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
				<View style={styles.Tip_Section}>
					<Text style={[
            styles.Checkout_Title,
            {
              color: theme.colors.medium
            }
          ]}>
            {`Tip (${tipPercentage}%)`}
          </Text>
					<View style={styles.Tip_View}>
						{tipPercentages.map((tip, index) => (
							<TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  setTipPercentage({
                    variables: {
                      tipPercentage: tip
                    }
                  })
                }}>
								<View
                  style={
                    tip === tipPercentage ?
                    {
                      ...styles.Selected_Tip_Box,
                      backgroundColor: theme.colors.primary
                    } : styles.Tip_Box
                  }
                >
									<Text
                    style={[
                      index ? theme.typography.headline1 : theme.typography.headline3,
                      tip === tipPercentage ? styles.Selected_Tip_Percentage_Text : styles.Tip_Percentage_Text
                    ]}
                  >
										{tip}%
									</Text>
									<Text
                    style={[
                      theme.typography.headline3,
                      tip === tipPercentage ? styles.Selected_Tip_Text : styles.Tip_Text
                    ]}
                  >
										${centsToDollar(getTipsOfCart(cart, tip))}
									</Text>
								</View>
							</TouchableWithoutFeedback>
						))}
					</View>
				</View>
				<View style={styles.CartItem_Cell_Container}/>
        <Text style={[
          styles.Checkout_Title,
          {
            color: theme.colors.medium,
            paddingBottom: 48
          }
        ]}>
          Here is your total
        </Text>
				<CheckoutTotalItem
					textTheme={theme.typography.headline3}
					title={"Subtotal"}
					amount={`$${centsToDollar(subTotal)}`}
					/>
				<CheckoutTotalItem
					textTheme={theme.typography.headline3}
					title={"Tip"}
					amount={`$${centsToDollar(tip)}`}
					/>
				<CheckoutTotalItem
					textTheme={theme.typography.headline3}
					title={"Tax"}
					amount={`$${centsToDollar(tax)}`}
					/>
				<CheckoutTotalItem
					textTheme={theme.typography.headline1}
					title={"Total"}
					amount={`$${centsToDollar(totalPayment)}`}
					/>
			</ScrollView>
			<FooterNavButton
        disabled={!orderType}
        text={orderType ? `Checkout $${centsToDollar(totalPayment)}` : 'Would you like to Eat Here or To Go?'}
        onPress={onCheckout}
      />
		</View>
	);
}


const styles = StyleSheet.create({
  Checkout_Title_Container: {
    paddingVertical: 50
  },
  Checkout_Title: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "800"
  },
  CartItem_Cell_Container: {
    borderTopColor: '#DDDDDD',
    borderTopWidth: 2,
    paddingVertical: 24
  },
  CartItem_Cell: {
    display: "flex",
    flexDirection: "row",
		marginBottom: 24,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    minHeight: 150
  },
  Button_n7s: {
    width: "100%",
    height: 48
  },
  Footer_Container: {
    marginBottom: 24
  },
	Tip_View: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
    paddingVertical: 50,
	},
	Tip_Box: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
    flex: 1,
		height: 150,
		backgroundColor: 'white',
    margin: 12
	},
	Selected_Tip_Box: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		height: 150,
    margin: 12
	},
	Selected_Tip_Text: {
		color: "#FFFFFF"
	},
	Tip_Text: {
	},
  Selected_Tip_Percentage_Text: {
		color: "#FFFFFF"
	},
	Tip_Percentage_Text: {
	},
	ScrollView_Main: {
		paddingBottom: 200
	},
	Tip_Section: {
		marginBottom: 24,
    paddingHorizontal: 48,
	},
  Tip_section_Title: {
    textAlign: "center",
    marginBottom: 24
  },
  OrderType_Section: {
    paddingHorizontal: 48,
  },
  OrderType_View: {
    flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
    paddingVertical: 50,
  },
  Selected_OrderType_Box: {
    display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
    flex: 1,
		height: 150,
    margin: 12
  },
  OrderType_Box: {
    display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
    flex: 1,
		height: 150,
		backgroundColor: 'white',
    margin: 12
  },
  Selected_OrderType_Text: {
    color: "#FFFFFF"
  },
  OrderType_Text: {

  }
})

export default withTheme(CheckoutBody);
