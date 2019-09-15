import React from "react"
import { StyleSheet, Text, ScrollView } from "react-native"
import {
  withTheme,
  Container,
  View,
} from "@draftbit/ui"

function CheckoutTotalItem({textTheme, title, amount}) {
	return  (
		<Container style={styles.Price_Container} useThemeGutterPadding={true}>
			<View style={styles.Price_Label_Container}>
				<Text
					style={[
						textTheme
					]}
				>
					{title}
				</Text>
			</View>
			<View style={styles.Price_Value_Container}>
				<Text
					style={[
						textTheme
					]}
				>
					{amount}
				</Text>
			</View>
		</Container>
	);
}


const styles = StyleSheet.create({
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
  }
})

export default withTheme(CheckoutTotalItem);
