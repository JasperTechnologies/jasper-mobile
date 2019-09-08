import React from "react"
import { StatusBar, StyleSheet, ScrollView, Text } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  Touchable,
  Image,
  Container,
} from "@draftbit/ui"
import Images from "../config/Images.js"

class MenuItem extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { theme } = this.state

    return (
			<Touchable
				style={styles.Touchable_n6x}
				onPress={() => {
					this.props.navigation.navigate("MenuItemViewScreen")
				}}
			>
				<Image style={styles.Image_ngw} source={Images.Ramen} resizeMode="cover" />
				<Container style={styles.Container_ntc} elevation={0} useThemeGutterPadding={true}>
					<Text
						style={[
							styles.Text_ng0,
							theme.typography.headline4,
							{
								color: theme.colors.strong
							}
						]}
					>
						{this.props.title}
					</Text>
					<Text
						style={[
							styles.Text_njp,
							theme.typography.subtitle2,
							{
								color: theme.colors.medium
							}
						]}
					>
						{this.props.description}
					</Text>
					<Text
						style={[
							styles.Text_nus,
							theme.typography.caption,
							{
								color: theme.colors.light
							}
						]}
					>
						{this.props.calories} Cal.
					</Text>
					<Text
						style={[
							styles.Text_nm6,
							theme.typography.headline5,
							{
								color: theme.colors.primary
							}
						]}
					>
						{this.props.price}
					</Text>
				</Container>
			</Touchable>
    )
  }
}

const styles = StyleSheet.create({
  Container_ntc: {
    paddingVertical: 16
  },
  Image_ngw: {
    width: "100%",
    height: "30%",
    minHeight: 0,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
    margin: 0
  },
  Text_ng0: {
    textAlign: "auto",
    width: "100%"
  },
  Text_njp: {
    textAlign: "auto",
    width: "100%",
    marginTop: 8
  },
  Text_nm6: {
    textAlign: "left",
    marginTop: 16
  },
  Text_nus: {
    textAlign: "auto",
    width: "100%",
    marginTop: 8
  },
  Touchable_n6x: {
    width: 300,
    marginHorizontal: 20,
  },
})

export default withTheme(MenuItem)
