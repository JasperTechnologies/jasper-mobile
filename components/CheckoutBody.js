import React from "react"
import { StyleSheet, Text, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { GET_CART, GET_TIP_PERCENT_INDEX } from '../constants/graphql-query';
import {
  REMOVE_ITEM_FROM_CART,
	SET_EDITING_MENU_ITEM,
	SET_TIP_PERCENT_INDEX
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

function EmptyView() {
  return (
    <View>
      <Text>Your cart is empty</Text>
    </View>
  );
}

const tipPercentages = [0, 10, 15, 20, 25]

function CheckoutBody({theme, navigateToPurchase, navigateToMenuItem}) {
	const [ removeItemFromCart ] = useMutation(REMOVE_ITEM_FROM_CART);
	const [ setEditingMenuItem ] = useMutation(SET_EDITING_MENU_ITEM);
	const [ setTipPercent ] = useMutation(SET_TIP_PERCENT_INDEX);
	const { data: cartData, loading, error } = useQuery(GET_CART);
	const { data: currentTipIndex } = useQuery(GET_TIP_PERCENT_INDEX);

  const [ getCart ] = useLazyQuery(GET_CART);
	if (loading || error) {
		return null;
	}
	const tipPercent = currentTipIndex !== undefined? tipPercentages[currentTipIndex] : 0
	const { cart } = cartData;
	return  cart.length === 0?
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
					<Text style={[theme.typography.headline1, {marginLeft: 305, marginBottom: 20}]}>Tip Amount</Text>
					<View style={styles.Tip_View} useThemeGutterPadding={true}>
						{tipPercentages.map((tip, index) => (
							<TouchableWithoutFeedback key={index} onPress={() => setTipPercent(index)}>
								<View style={index === tipPercent? {...styles.Selected_Tip_Box, backgroundColor: theme.colors.primary} : styles.Tip_Box}>
									<Text style={index === tipPercent? styles.Selected_Tip_Text : styles.Tip_Text}>
										{tip}%
									</Text>
									<Text style={index === tipPercent? styles.Selected_Tip_Text : styles.Tip_Text}>
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
					amount={`$${centsToDollar(getTipsOfCart(cart, tipPercent))}`}
					/>
				<CheckoutTotalItem
					textTheme={theme.typography.headline3}
					title={"Tax"}
					amount={`$${centsToDollar(getSubtotalTaxOfCart(cart))}`}
					/>
				<CheckoutTotalItem
					textTheme={theme.typography.headline1}
					title={"Total"}
					amount={`$${centsToDollar(getTotalOfCart(cart, tipPercent))}`}
					/>
			</ScrollView>
			<FooterNavButton text={'Purchase'} onPress={navigateToPurchase} />
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
		width: 150, 
		height: 150, 
		backgroundColor: 'white', 
		borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
	},
	Selected_Tip_Box: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 150, 
		height: 150, 
		borderRadius: 4,
    borderWidth: 0.5,
	},
	Selected_Tip_Text: {
		color: "white",
		fontSize: 20
	},
	Tip_Text: {
		fontSize: 20
	},
	ScrollView_Main: {
		paddingBottom: 100
	},
	Tip_Section: {
		marginBottom: 24
	}
})

export default withTheme(CheckoutBody);
