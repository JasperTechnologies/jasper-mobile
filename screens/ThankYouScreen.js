import React, { useEffect } from "react"
import { StatusBar, StyleSheet, Text, Animated, Easing } from "react-native"
import { draftbit as theme } from "../config/Themes"
import { ScreenContainer, Container, Button, Image, Touchable } from "@draftbit/ui"
import FooterNavButton from "../components/FooterNavButton";

const startAnimation = (scaleValue) => {
  Animated.loop(
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    })).start();
};

function ThankYouScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("LandingScreen");
    }, 30000);
  }, []);

  let scaleValue = new Animated.Value(0)
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.25, .5, .75, 1],
    outputRange: [1, 1.3, 1.6, 1.3, 1]
  });
  startAnimation(scaleValue);

  return (
    <ScreenContainer scrollable={false}>
      <Touchable
        onPress={() => {
          navigation.navigate("LandingScreen");
        }}
      >
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
          <Animated.View style={{transform: [{ scale: cardScale }] }}>
            <Animated.Text
              style={[
                theme.typography.headline3,
                {
                  color: theme.colors.strong,
                  paddingVertical: 48
                }
              ]}
            >
              Please Take Your Order Number
            </Animated.Text>
          </Animated.View>
          <Text
            style={[
              theme.typography.headline3,
              {
                color: theme.colors.strong
              }
            ]}
          >
            And Tap To Finish
          </Text>
          <Image
            style={styles.Receipt_Printer_Image}
            source={require('../assets/images/receipt-printer.png')}
          />
        </Container>
      </Touchable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  ThankYouScreen_Container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  Icon_nkx: {
    width: 300,
    height: 300
  },
  Receipt_Printer_Image: {
    marginTop: 100,
    height: 270
  }
})

export default ThankYouScreen;
