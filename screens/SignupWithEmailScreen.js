import React from "react"
import { StatusBar, StyleSheet, KeyboardAvoidingView, Text } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Container,
  Image,
  TextField,
  Button,
  Touchable
} from "@draftbit/ui"
import Images from "../config/Images.js"

class SignupWithEmailScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("dark-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { theme } = this.state

    return (
      <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_ng1}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoidingView_n2y}
          enabled={true}
          behavior="position"
          keyboardVerticalOffset={20}
        >
          <Container style={styles.Container_nw0} elevation={0} useThemeGutterPadding={true}>
            <Image style={styles.Image_nya} source={Images.DraftbitMark} resizeMode="contain" />
            <TextField
              style={styles.TextField_nj1}
              type="underline"
              label="Email"
              keyboardType="email-address"
              leftIconMode="inset"
            />
            <TextField
              style={styles.TextField_nkc}
              type="underline"
              label="Password"
              keyboardType="default"
              leftIconMode="inset"
              secureTextEntry={true}
            />
            <TextField
              style={styles.TextField_nkc}
              type="underline"
              label="Confirm Password"
              keyboardType="default"
              leftIconMode="inset"
              secureTextEntry={true}
            />
            <Button style={styles.Button_nag} type="solid" color={theme.colors.primary}>
              Create Account
            </Button>
            <Touchable
              style={styles.Touchable_nei}
              onPress={() => {
                this.props.navigation.navigate("EmailPasswordLoginScreen")
              }}
            >
              <Text
                style={[
                  styles.Text_nf0,
                  theme.typography.button,
                  {
                    color: theme.colors.primary
                  }
                ]}
              >
                Already Registered? Sign In
              </Text>
            </Touchable>
            <Text
              style={[
                styles.Text_nk6,
                theme.typography.caption,
                {
                  color: theme.colors.light
                }
              ]}
            >
              By creating an account, you agree to our Terms of Service, Privacy Policy and Cookie
              Policy.
            </Text>
          </Container>
        </KeyboardAvoidingView>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Button_nag: {
    height: 48,
    marginBottom: 8
  },
  Container_nw0: {
    height: "100%",
    justifyContent: "space-evenly",
    flexGrow: 1
  },
  Image_nya: {
    width: 125,
    height: 125,
    alignSelf: "center"
  },
  KeyboardAvoidingView_n2y: {
    flexGrow: 1
  },
  TextField_nj1: {
    height: 82,
  },
  TextField_nkc: {
    height: 82,
  },
  Text_nf0: {
    textAlign: "center",
    width: "100%"
  },
  Text_nk6: {
    textAlign: "center",
    width: "100%"
  },
  Touchable_nei: {
  }
})

export default withTheme(SignupWithEmailScreen)
