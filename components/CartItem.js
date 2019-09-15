import React from "react"
import { StatusBar, StyleSheet, Text, FlatList, ScrollView } from "react-native"
import CheckoutRemoveButton from '../components/CheckoutRemoveButton';
import { yummy as screenTheme } from "../config/Themes"
import {
  centsToDollar,
  calculateTotalPrice,
} from '../utilities/money';
import {
	withTheme,
  Image,
  View,
  Touchable
} from "@draftbit/ui"

const theme = screenTheme

function CartItem({item, index, onEdit, onDelete}) {
return <Touchable
	key={`${item.name}-${index}`}
	onPress={onEdit}
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
						removeItemFromCart={onDelete}
						item={item}
					/>
				</View>
			</View>
		</View>
	</View>
</Touchable>
}

const styles = StyleSheet.create({
  Price_Container: {
    display: 'flex',
    flexDirection: 'row'
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
  Remove_Button_Container: {
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 12
  }
})

export default withTheme(CartItem);