import React, { useEffect } from "react"
import { StatusBar, StyleSheet, Text } from "react-native"
import { draftbit as theme } from "../config/Themes"
import { ScreenContainer, Container, Button } from "@draftbit/ui"
import FooterNavButton from "../components/FooterNavButton";

function ThankYouScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("LandingScreen");
    }, 30000);
  }, []);
  return (
    <ScreenContainer scrollable={false}>
      <Container style={styles.ThankYouScreen_Container} elevation={0} useThemeGutterPadding={true}>
        <Text
          style={[
            theme.typography.headline1,
            {
              color: theme.colors.strong
            }
          ]}
        >
          Thank you!
        </Text>
        <Text
          style={[
            theme.typography.headline3,
            {
              color: theme.colors.strong
            }
          ]}
        >
          Please Take Your Receipt
        </Text>
      </Container>
      <FooterNavButton
        text={'Finish'}
        onPress={() => {
          navigation.navigate("LandingScreen");
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  ThankYouScreen_Container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  Icon_nkx: {
    width: 300,
    height: 300
  }
})

export default ThankYouScreen;
