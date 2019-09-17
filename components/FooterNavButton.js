import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button, withTheme} from "@draftbit/ui"
import { LinearGradient } from "expo-linear-gradient";

function FooterNavButton({onPress, text}) {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)']}
      style={styles.Footer_Nav_Button_Container}
    >
			<Button
				type="solid"
				onPress={onPress}
			>
				<Text>{text}</Text>
			</Button>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  Footer_Nav_Button_Container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    paddingHorizontal: 48,
    paddingTop: 36,
    paddingBottom: 24,
  },
});

export default withTheme(FooterNavButton);
