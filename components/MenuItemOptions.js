import React from "react"
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity
} from "react-native"
import { centsToDollar } from '../utilities/money';
import {
	withTheme,
	RowBodySwitch,
	RowBodyCheckbox,
	Image
} from "@draftbit/ui"

function OptionValueCell({optionValueForm, theme, isSelected}) {
	return (
		<View style={styles.OptionValue_Cell}>
			{optionValueForm.pictureURL && <Image style={styles.OptionValue_Image} source={optionValueForm.pictureURL} />}
			<View style={styles.OptionValue_Text_View}>
				<Text
					style={[
						isSelected ? theme.typography.headline1 : theme.typography.headline2,
						{
							color: isSelected ? "#fff" : theme.colors.strong
						}
					]}
				>
					{optionValueForm.title}
				</Text>
				{
					optionValueForm.price ?
					<Text
						style={[
							isSelected ? theme.typography.headline2 : theme.typography.headline5,
							{
								color: isSelected ? "#fff" : theme.colors.strong
							}
						]}
					>
						{`(+$${centsToDollar(optionValueForm.price)})`}
					</Text> : null
				}
			</View>
		</View>
	)
}

const ThemedOptionValueCell = withTheme(OptionValueCell);

function MenuItemOptions({options, theme, form}) {

	this.renderRadioButton = (optionValueForm, option) => {
		const isSelected = Boolean(form.optionValues.find(o => o.id === optionValueForm.id && option.id === optionValueForm.optionId));
		return (
			<TouchableOpacity
				onPress={() => {
					this.handleRadioButton(optionValueForm, isSelected);
				}}
				key={`${optionValueForm.id}-${optionValueForm.optionId}`}
				style={[
					styles.OptionValue_Touchable,
					isSelected ? { backgroundColor: theme.colors.primary } : { backgroundColor: "#fff" }
				]}
			>
				<ThemedOptionValueCell optionValueForm={optionValueForm} isSelected={isSelected} />
			</TouchableOpacity>
		);
	}

	this.renderCheckBoxButton = (optionValueForm, option) => {
		const isSelected = Boolean(form.optionValues.find(o => o.id === optionValueForm.id && option.id === optionValueForm.optionId));
		return (
			<TouchableOpacity
				onPress={() => {
					this.handleCheckBoxButton(optionValueForm, isSelected)
				}}
				key={`${optionValueForm.id}-${optionValueForm.optionId}`}
				style={[
					styles.OptionValue_Touchable,
					isSelected ? { backgroundColor: theme.colors.primary } : { backgroundColor: "#fff" }
				]}
			>
				<ThemedOptionValueCell optionValueForm={optionValueForm} isSelected={isSelected} />
			</TouchableOpacity>
		);
	}

	return options.map((option, index) => {
		const hasPicture = option.optionValues.find((ov) => ov.pictureURL);
		return (
			<View key={`${option.title}-${index}`} style={styles.Option_Type_Container}>
				<View style={styles.Option_Type_Header}>
					<View style={styles.Option_Title_Text_Container}>
						<Text
							style={[
								styles.Option_Title_Text,
								theme.typography.headline1,
								{
									color: theme.colors.strong
								}
							]}
						>
							{option.title}
						</Text>
					</View>
					{
						option.required ?
						<View style={styles.Option_Required_Text_Container}>
							<Text
								style={[
									styles.Option_Required_Text,
									theme.typography.headline4
								]}
							>
								Required
							</Text>
						</View> :
						<View style={styles.Option_Optional_Text_Container}>
							<Text
								style={[
									styles.Option_Optional_Text,
									theme.typography.headline4,
									{
										color: theme.colors.medium
									}
								]}
							>
								Optional
							</Text>
						</View>
					}
					{
						option.maxSelections > 1 ?
						<View style={styles.Option_Optional_Text_Container}>
							<Text
								style={[
									styles.Option_Optional_Text,
									theme.typography.headline4,
									{
										color: theme.colors.light
									}
								]}
							>
								{`Choose up to ${option.maxSelections > option.optionValues.length ? option.optionValues.length : option.maxSelections}`}
							</Text>
						</View> : null
					}
				</View>
				<View
					style={styles.Option_List}
				>
					{
						option.optionValues ? option.optionValues.map(
							(optionValue) => {
								const optionValueForm = {
									...optionValue,
									optionId: option.id
								};
								if(option.maxSelections === 1) {
									return this.renderRadioButton(optionValueForm, option)
								}

								return this.renderCheckBoxButton(optionValueForm, option);
							}
						) : []
					}
				</View>
			</View>
		);
	});
}

const styles = StyleSheet.create({
	Option_Title_Text_Container: {
		display: "flex",
		justifyContent: "center"
	},
  Option_Title_Text: {},
  Option_Type_Container: {
    width: "100%",
		display: "flex",
		alignItems: "center"
  },
  Option_Type_Header: {
    width: "100%",
    backgroundColor: "#eee",
		display: "flex",
		flexDirection: "row",
    paddingHorizontal: 48,
		paddingVertical: 32
  },
	Option_Required_Text_Container: {
		paddingLeft: 24,
		display: "flex",
		justifyContent: "center"
	},
	Option_Required_Text: {
		color: "#2a909c"
	},
	Option_Optional_Text_Container: {
		paddingLeft: 24,
		display: "flex",
		justifyContent: "center"
	},
	Option_Optional_Text: {},
  Option_List: {
    width: 1170,
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		paddingVertical: 48
  },
	OptionValue_Text_View: {
		display: "flex",
		alignItems: "center",
		paddingVertical: 16
	},
	OptionValue_Touchable: {
		flexBasis: 350,
		display: "flex",
		height: 350,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.00,
		marginBottom: 40,
		borderRadius: 10,
		marginHorizontal: 20
	},
	OptionValue_Touchable_Selected: {
		backgroundColor: "#DDD"
	},
	OptionValue_Image: {
		width: 250,
		height: 250
	},
	OptionValue_Cell: {
		width: 250
	}
})

export default withTheme(MenuItemOptions)
