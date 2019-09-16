import React from "react"
import { Text, View } from "react-native"
import { Button, withTheme} from "@draftbit/ui"

function FooterNavButton({onPress, text}) {
  return (
		<View>
			<Button
				type="solid"
				onPress={onPress}
			>
				<Text>{text}</Text>
			</Button>
		</View>
  )
}

export default withTheme(FooterNavButton);
