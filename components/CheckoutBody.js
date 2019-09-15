import React from "react"
import { StyleSheet, Text, ScrollView } from "react-native"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CART } from '../constants/graphql-query';
import { REMOVE_ITEM_FROM_CART, SET_CURRENT_MENU_ITEM } from '../constants/graphql-mutation';
import CartItem from './CartItem'
import CheckoutTotalItem from './CheckoutTotalItem'
import {
  centsToDollar,
  getSubtotalOfCart,
  getSubtotalTaxOfCart,
  getTotalOfCart
} from '../utilities/money';
import {
  withTheme,
  Icon,
  Container,
  Button,
  View,
} from "@draftbit/ui"

function EmptyView() {
  return (
    <View>
      <Text>Your cart is empty</Text>
    </View>
  );
}

function CheckoutBody({theme, navigateToPurchase, navigateToMenuItem}) {
	const [ removeItemFromCart ] = useMutation(REMOVE_ITEM_FROM_CART);
	const [ setCurrentMenuItem ] = useMutation(SET_CURRENT_MENU_ITEM);
	const { data: cartData, loading, error } = useQuery(GET_CART);
	if (loading || error) {
		return null;
	}
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
									onDelete={() => removeItemFromCart(index)}
									onEdit={() => {
										setCurrentMenuItem({
											variables: {
												menuItem: item
											}
										});
										navigateToMenuItem()
									}}
								/>
							);
						})
					}
				</Container>
				<CheckoutTotalItem 
					textTheme={theme.typography.headline3} 
					title={"Subtotal"} 
					amount={`$${centsToDollar(getSubtotalOfCart(cart))}`}
					/>
				<CheckoutTotalItem 
					textTheme={theme.typography.headline3} 
					title={"Tax"} 
					amount={`$${centsToDollar(getSubtotalTaxOfCart(cart))}`}
					/>
				<CheckoutTotalItem 
					textTheme={theme.typography.headline1} 
					title={"Total"} 
					amount={`$${centsToDollar(getTotalOfCart(cart))}`}
					/>
			</ScrollView>
			<Container style={styles.Footer_Container} elevation={0} useThemeGutterPadding={true}>
				<Button
					style={styles.Button_n7s}
					type="solid"
					onPress={navigateToPurchase}
				>
					Purchase
				</Button>
			</Container>
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
})

export default withTheme(CheckoutBody);
