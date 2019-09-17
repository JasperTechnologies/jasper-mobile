import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Button, withTheme} from "@draftbit/ui"
import { LinearGradient } from "expo-linear-gradient";

function FooterNavButton({onPress, text, theme}) {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)']}
      style={styles.Footer_Nav_Button_Container}
    >
			<TouchableOpacity
				onPress={onPress}
        style={[
          styles.Footer_Nav_Button,
          {
            backgroundColor: theme.colors.primary
          }
        ]}
			>
				<Text style={[
          styles.Footer_Nav_Button_Text
        ]}>
          {text}
        </Text>
			</TouchableOpacity>
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
  Footer_Nav_Button: {
    height: 70,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  Footer_Nav_Button_Text: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800"
  }
});

export default withTheme(FooterNavButton);
