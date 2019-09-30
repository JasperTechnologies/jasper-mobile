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

function MenuItemOptions({options, theme, form}) {

	this.renderRadioButton = (item, option) => {
		const isSelected = Boolean(form.optionValues.find(o => o.id === item.optionValueForm.id && option.id === item.optionValueForm.optionId));
		return (
			<TouchableOpacity
				onPress={() => {
					this.handleRadioButton(item.optionValueForm, isSelected);
				}}
			>
				<View style={styles.Option_Value_Row_View}>
					<View style={styles.Option_Info_View}>
						<View style={styles.Option_Value_Value_View}>
							<TouchableOpacity
								style={[
									styles.Radio_Button,
									{
										borderColor: theme.colors.primary
									}
								]}
								onPress={() => {
									this.handleRadioButton(item.optionValueForm, isSelected);
								}}
							>
								{ isSelected ?
									<View style={[
										styles.Checked_Radio_Button,
										{
											backgroundColor: theme.colors.primary
										}
									]} /> : null
								}
							</TouchableOpacity>
						</View>
						<View style={styles.Option_Value_Title_View}>
							<Text
								style={[
									styles.Option_Value_Title_Text,
									isSelected && { color: theme.colors.primary }
								]}
							>
								{item.title}
							</Text>
						</View>
					</View>
					<View style={styles.Option_Value_Image_View}>
						<Image style={styles.Option_Value_Image} source={item.pictureURL} resizeMode="cover" />
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	this.renderCheckBoxButton = (item, option) => {
		const isSelected = Boolean(form.optionValues.find(o => o.id === item.optionValueForm.id && option.id === item.optionValueForm.optionId));
		return (
			<TouchableOpacity
				onPress={() => {
					this.handleCheckBoxButton(item.optionValueForm, isSelected)
				}}
			>
				<View style={styles.Option_Value_Row_View}>
					<View style={styles.Option_Info_View}>
						<View style={styles.Option_Value_Value_View}>
							<TouchableOpacity
								style={[
									styles.Checkbox_Button,
									{
										borderColor: theme.colors.primary
									}
								]}
								onPress={() => {
									this.handleCheckBoxButton(item.optionValueForm, isSelected)
								}}
							>
								{ isSelected ?
									<View style={[
										styles.Checked_Checkbox_Button,
										{
											backgroundColor: theme.colors.primary
										}
									]} /> : null
								}
							</TouchableOpacity>
						</View>
						<View style={styles.Option_Value_Title_View}>
							<Text
								style={[
									styles.Option_Value_Title_Text,
									isSelected && { color: theme.colors.primary }
								]}
							>
								{item.title}
							</Text>
						</View>
					</View>
					<View style={styles.Option_Value_Image_View}>
						<Image style={styles.Option_Value_Image} source={item.pictureURL} resizeMode="cover" />
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return options.map((option, index) => {
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
							pictureURL: optionValue.pictureURL,
							title: `${optionValue.title} ${optionValue.price ? `($${centsToDollar(optionValue.price)})` : ''}`
						})
					) : []}
					renderItem={({item}) => {
						// render radio button
						if(option.maxSelections === 1) {
							return this.renderRadioButton(item, option)
						}
						// render checkbox
						return this.renderCheckBoxButton(item, option)
					}}
					keyExtractor={(_item, idx) => idx.toString()}
				/>
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
    width: "100%"
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
    width: "100%"
  },
	Option_Value_Row_View: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		borderBottomWidth: 2,
		borderBottomColor: "#eee",
		borderTopWidth: 2,
		borderTopColor: "#eee"
	},
	Option_Info_View: {
		flex: 5,
		display: "flex",
		flexDirection: "row",
		paddingLeft: 48
	},
	Option_Value_Title_View: {
		height: 270,
		justifyContent: "center"
	},
	Option_Value_Value_View: {
		width: 56,
		height: 270,
		justifyContent: "center"
	},
	Option_Value_Image_View: {
		flex: 4
	},
	Option_Value_Image: {
		height: 270,
		width: "100%"
	},
	Radio_Button: {
		height: 32,
    width: 32,
    borderRadius: 50,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
	},
	Checked_Radio_Button: {
		width: 22,
    height: 22,
    borderRadius: 50,
	},
	Checkbox_Button: {
		height: 32,
    width: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
	},
	Checked_Checkbox_Button: {
		width: 22,
    height: 22,
	},
	Option_Value_Title_Text: {
		fontSize: 18,
		fontWeight: "500"
	}
})

export default withTheme(MenuItemOptions)
