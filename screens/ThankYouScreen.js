import React from "react"
import { StatusBar, StyleSheet, Text } from "react-native"
import { draftbit as theme } from "../config/Themes"
import { ScreenContainer, Container, Icon, Button } from "@draftbit/ui"

function ThankYouScreen({ navigation }) {
  return (
    <ScreenContainer scrollable={false}>
      <Container style={styles.Container_ns6} elevation={0} useThemeGutterPadding={true}>
        <Icon
          style={styles.Icon_nkx}
          name="MaterialIcons/sentiment-very-satisfied"
          size={300}
          color={theme.colors.strong}
        />
        <Text
          style={[
            styles.Text_naj,
            theme.typography.headline1,
            {
              color: theme.colors.strong
            }
          ]}
        >
          Thank you! Please Remember to Take Receipt!
        </Text>
      </Container>
      <Container style={styles.Container_neb} elevation={0} useThemeGutterPadding={true}>
        <Button
          style={styles.Button_nyv}
          type="solid"
          onPress={() => {
            navigation.navigate("LandingScreen");
          }}
        >
          Finish
        </Button>
      </Container>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  Button_nyv: {
    width: "100%",
    height: 48
  },
  Container_neb: {
    marginBottom: 24
  },
  Container_ns6: {
    minHeight: 0,
    alignItems: "center",
    paddingBottom: 0
  },
  Icon_nkx: {
    width: 300,
    height: 300
  },
  Text_naj: {
    textAlign: "center",
    width: "90%",
    height: 300,
    paddingBottom: 120,
    marginBottom: 0,
    borderBottomWidth: 0
  }
})

export default ThankYouScreen;
