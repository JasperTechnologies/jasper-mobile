import React from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import MenuHeaderItem from "./MenuHeaderItem"
import {
  withTheme,
  Touchable,
  Icon,
} from "@draftbit/ui"

class MenuHeader extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
			theme: Object.assign(props.theme, screenTheme),
			selected: 0
    }
	}
	
	selectMenuHeaderItem(index) {
		this.setState({selected: index})
	}

  render() {
    const { theme } = this.state

    return (
			<View style={styles.MenuHeaderContainer}>
				<View style={styles.MenuHeaderContainer}>
          {["Boba Tea", "Snacks", "Sandwiches"].map((name, index) => <MenuHeaderItem 
            key={index}
						name={name}
						selected={this.state.selected === index}
						onPress={this.selectMenuHeaderItem.bind(this, index)}
						/>
					)}
				</View>
				<Touchable
					style={styles.Touchable_nnl}
					onPress={() => {
						this.props.navigateToCheckout()
					}}
				>
					<Icon
						style={styles.Icon_n49}
						name="Entypo/shopping-cart"
						size={48}
						color={theme.colors.strong}
					/>
				</Touchable>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  MenuHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginTop: 20
  },
  Button_nqn: {
    marginTop: 40
  },
  CardContainer_ntj: {
    width: 300
  },
  Icon_n49: {
    width: 48,
    height: 48,
    alignSelf: "flex-end",
    marginTop: 40,
    marginRight: 40
  },
  ScrollView_na3: {
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 200,
    marginTop: 60,
    flexWrap: "wrap"
  }
})

export default withTheme(MenuHeader)
