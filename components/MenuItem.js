import React from "react"
import { StatusBar, StyleSheet, View, Text } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  Touchable,
  Image,
  Container,
} from "@draftbit/ui"

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
					this.props.onPress()
				}}
			>
				<View style={styles.ViewStyle}>
					<Image style={styles.Image_ngw} source={this.props.imageURL} />
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
							${this.props.price}
						</Text>
					</Container>
				</View>
			</Touchable>
    )
  }
}

const styles = StyleSheet.create({
	ViewStyle: {
		overflow: "hidden",
		borderRadius: 10
	},
  Container_ntc: {
		paddingVertical: 16,
		display: "flex",
		flexDirection: 'column',
		justifyContent: "flex-end",
  },
  Image_ngw: {
    width: "100%",
    height: 170,
    minHeight: 0,
    paddingHorizontal: 20,
		paddingBottom: 20,
  },
  Text_ng0: {
    width: "100%"
  },
  Text_njp: {
    width: "100%",
    marginTop: 8
  },
  Text_nm6: {
    marginTop: 16
  },
  Text_nus: {
    width: "100%",
    marginTop: 8
  },
  Touchable_n6x: {
		width: 300,
		height: "100%",
		maxHeight: 400,
		marginHorizontal: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.00,
		backgroundColor: "white",
		marginBottom: 100,
		borderRadius: 10
  },
})

export default withTheme(MenuItem)
