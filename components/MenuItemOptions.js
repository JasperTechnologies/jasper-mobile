import React from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { centsToDollar } from '../utilities/money';
import { withTheme, RowBodySwitch, RowBodyCheckbox } from "@draftbit/ui"

function MenuItemOptions({options, theme, form}) {

	this.renderCheckBoxOptionValue = (item, option) => {
		const isSelected = Boolean(form.optionValues.find(o => o.id === item.optionValueForm.id && option.id === item.optionValueForm.optionId));
		const selectedValue = isSelected === true ? 'checked' : 'unchecked'
		return (
			<RowBodyCheckbox
				title={item.title}
				color={theme.primary}
				style={{ marginBottom: theme.spacing.small }} 
				status={selectedValue}
				onPress={() => {
					this.handleCheckBoxOption(item.optionValueForm, isSelected)
				}}
			/>
		);
	}

	this.renderSwitchOptionValue = (item, option) => {
		const isSelected = Boolean(form.optionValues.find(o => o.id === item.optionValueForm.id && option.id === item.optionValueForm.optionId));
		return (
			<RowBodySwitch
				title={item.title}
				color={item.color}
				style={{ marginBottom: theme.spacing.small }} 
				value={isSelected}
				onValueChange={() => {
					this.handleSwitchOption(item.optionValueForm, isSelected)
				}}
			/>
		);
	}

	return options.map((option, index) => {
		return (
			<View key={`${option.title}-${index}`} style={styles.Option_Type_Container}>
				<View style={styles.Option_Type_Header}>
					<Text
						style={[
							styles.Text_nwi,
							theme.typography.headline4,
							{
								color: theme.colors.strong
							}
						]}
					>
						{option.title}
					</Text>
				</View>
				<FlatList
					style={styles.Option_List}
					data={option.optionValues ? option.optionValues.map(
						(optionValue) => ({
							optionValueForm: {
								...optionValue,
								optionId: option.id,
							},
							color: "medium",
							title: `${optionValue.title} ${optionValue.price ? `($${centsToDollar(optionValue.price)})` : ''}`
						})
					) : []}
					renderItem={({item}) => {
						if(option.maxSelections === 1) {
							return this.renderCheckBoxOptionValue(item, option)
						}
						return this.renderSwitchOptionValue(item, option)
					}}
					keyExtractor={(_item, idx) => idx.toString()}
				/>
			</View>
		);
	});
}

const styles = StyleSheet.create({
  Text_nwi: {
    textAlign: "auto",
    width: "100%"
  },
  Option_Type_Container: {
    width: "100%"
  },
  Option_Type_Header: {
    width: "100%",
    backgroundColor: "#eee",
    padding: 16
  },
  Option_List: {
    width: "100%"
  }
})

export default withTheme(MenuItemOptions)