import React from "react"
import { StyleSheet, Text, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
// import { useClover } from './payment-processors/clover';
import {
  GET_CART,
  GET_TIP_PERCENT_INDEX
} from '../constants/graphql-query';
import {
  REMOVE_ITEM_FROM_CART,
	SET_EDITING_MENU_ITEM,
	SET_TIP_PERCENT_INDEX,
  SET_CHECKOUT_IN_PROGRESS,
	PURCHASE,
	CHECKOUT_COMPLETE
} from '../constants/graphql-mutation';
import CartItem from './CartItem'
import CheckoutTotalItem from './CheckoutTotalItem'
import {
  centsToDollar,
  getSubtotalOfCart,
  getSubtotalTaxOfCart,
	getTotalOfCart,
	getTipsOfCart
} from '../utilities/money';
import {
  withTheme,
  Icon,
  Container,
  View,
} from "@draftbit/ui"
import FooterNavButton from "./FooterNavButton";
import gql from 'graphql-tag';

// import clove from 'remote-pay-cloud';

function EmptyView() {
  return (
    <View>
      <Text>Your cart is empty</Text>
    </View>
  );
}

const tipPercentages = [0, 10, 15, 20, 25]

function CheckoutBody({theme, navigateToMenuItem, navigateToThankYouScreen}) {
	const [ removeItemFromCart ] = useMutation(REMOVE_ITEM_FROM_CART);
	const [ setEditingMenuItem ] = useMutation(SET_EDITING_MENU_ITEM);
	const [ setTipPercent ] = useMutation(SET_TIP_PERCENT_INDEX);
	const [ setCheckoutInProgress ] = useMutation(SET_CHECKOUT_IN_PROGRESS);
	const [ purchase ] = useMutation(PURCHASE)
	const [ checkoutComplete ] = useMutation(CHECKOUT_COMPLETE)
	const { data: cartData, loading, error } = useQuery(GET_CART);
	const { data: { tipPercentIndex } } = useQuery(GET_TIP_PERCENT_INDEX);
  // const { clover } = useClover();
  // const displayOrder = new clove.sdk.remotepay.SaleRequest();
  // displayOrder.setExternalId(clove.CloverID.getNewId());
	// displayOrder.setAmount(2139);
	// console.log({message: "Sending sale", request: displayOrder});
	// clover.cloverConnector.sale(displayOrder);

  const [ getCart ] = useLazyQuery(GET_CART);
	if (loading || error) {
		return null;
	}

  async function onCheckout(){
		setCheckoutInProgress();
		await purchase({
			variables: {
				deviceId: '111',
				amountInCents: 1
			}
		})
		checkoutComplete()
		navigateToThankYouScreen()
  };

	const { cart } = cartData;
	return cart.length === 0 ?
		<EmptyView /> :(
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
								<CartItem
									key={index}
									item={item}
									index={index}
									onDelete={() => {
                    removeItemFromCart({
                      variables: {
												index
											}
                    });
                    getCart();
                  }}
									onEdit={() => {
										setEditingMenuItem({
											variables: {
												menuItem: item,
                        editingMenuItemForm: item.form
											}
										});
										navigateToMenuItem();
									}}
								/>
							);
						})
					}
				</Container>
				<View style={styles.Tip_Section}>
					<Text style={[
            theme.typography.headline1,
            styles.Tip_section_Title,
            {
              color: theme.colors.medium
            }
          ]}>
            {`Tip (${tipPercentages[tipPercentIndex]}%)`}
          </Text>
					<View style={styles.Tip_View}>
						{tipPercentages.map((tip, index) => (
							<TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  setTipPercent({
                    variables: {
                      percentIndex: index
                    }
                  })
                }}>
								<View
                  style={
                    index === tipPercentIndex ?
                    {
                      ...styles.Selected_Tip_Box,
                      backgroundColor: theme.colors.primary
                    } : styles.Tip_Box
                  }
                >
									<Text
                    style={[
                      theme.typography.headline3,
                      index === tipPercentIndex ? styles.Selected_Tip_Percentage_Text : styles.Tip_Percentage_Text
                    ]}
                  >
										{tip}%
									</Text>
									<Text
                    style={[
                      index ? theme.typography.headline1 : theme.typography.headline3,
                      index === tipPercentIndex ? styles.Selected_Tip_Text : styles.Tip_Text
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
				<CheckoutTotalItem
					textTheme={theme.typography.headline3}
					title={"Subtotal"}
					amount={`$${centsToDollar(getSubtotalOfCart(cart))}`}
					/>
				<CheckoutTotalItem
					textTheme={theme.typography.headline3}
					title={"Tip"}
					amount={`$${centsToDollar(getTipsOfCart(cart, tipPercentages[tipPercentIndex]))}`}
					/>
				<CheckoutTotalItem
					textTheme={theme.typography.headline3}
					title={"Tax"}
					amount={`$${centsToDollar(getSubtotalTaxOfCart(cart))}`}
					/>
				<CheckoutTotalItem
					textTheme={theme.typography.headline1}
					title={"Total"}
					amount={`$${centsToDollar(getTotalOfCart(cart, tipPercentages[tipPercentIndex]))}`}
					/>
			</ScrollView>
			<FooterNavButton text={`Checkout $${centsToDollar(getTotalOfCart(cart, tipPercentages[tipPercentIndex]))}`} onPress={onCheckout} />
		</View>
	);
}


const styles = StyleSheet.create({
  Checkout_Logo_Container: {
    paddingBottom: 50
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
  Icon_nie: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 25
  },
  Text_nxj: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
	},
	Tip_View: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
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
		paddingBottom: 100
	},
	Tip_Section: {
		marginBottom: 24,
    paddingHorizontal: 48,
	},
  Tip_section_Title: {
    textAlign: "center",
    marginBottom: 24
  }
})

export default withTheme(CheckoutBody);
