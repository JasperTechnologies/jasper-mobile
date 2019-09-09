import React from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  Touchable,
  Icon,
} from "@draftbit/ui"

class MenuHeaderItem extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { theme } = this.state
		const selectedMenuHeaderText = this.props.selected ? styles.SelectedMenuHeaderText : {}
    return (
			<Touchable onPress={() => this.props.onPress()}>
				<Text
					style={[
						styles.MenuHeaderText,
						selectedMenuHeaderText,
						theme.typography.headline1,
						{
							color: theme.colors.strong
						}
					]}
				>
					{this.props.name}
				</Text>
			</Touchable>)
	}
}

const styles = StyleSheet.create({
  MenuHeaderText: {
    paddingRight: 20,
	},
	SelectedMenuHeaderText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
	}
})

export default withTheme(MenuHeaderItem)
