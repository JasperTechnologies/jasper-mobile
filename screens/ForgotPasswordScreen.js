import React from "react"
import { StatusBar, StyleSheet, KeyboardAvoidingView, Text } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import { withTheme, ScreenContainer, Container, TextField, Button, Touchable } from "@draftbit/ui"

class ForgotPasswordScreen extends React.Component {
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
      <ScreenContainer hasSafeArea={true} scrollable={true} style={styles.Root_n6o}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoidingView_nml}
          enabled={true}
          behavior="padding"
          keyboardVerticalOffset={60}
        >
          <Container style={styles.Container_n8y} elevation={0} useThemeGutterPadding={true}>
            <Text
              style={[
                styles.Text_n4c,
                theme.typography.headline4,
                {
                  color: theme.colors.strong
                }
              ]}
            >
              Forgot Password?
            </Text>
            <Text
              style={[
                styles.Text_n26,
                theme.typography.body1,
                {
                  color: theme.colors.strong
                }
              ]}
            >
              Enter your email address and we'll send you a magic link to reset your password.
            </Text>
            <TextField
              style={styles.TextField_nz7}
              type="underline"
              label="Enter your email..."
              keyboardType="email-address"
              leftIconMode="inset"
            />
          </Container>
          <Container style={styles.Container_ne3}>
            <Button style={styles.Button_nly} type="solid">
              Submit
            </Button>
            <Touchable
              style={styles.Touchable_nze}
              onPress={() => {
                this.props.navigation.navigate("EmailPasswordLoginScreen")
              }}
            >
              <Text
                style={[
                  styles.Text_ncr,
                  theme.typography.button,
                  {
                    color: theme.colors.primary
                  }
                ]}
              >
                Back
              </Text>
            </Touchable>
          </Container>
        </KeyboardAvoidingView>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Button_nly: {
    width: 343,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: 0,
    borderBottomWidth: 0
  },
  Container_n8y: {
    marginTop: 32
  },
  Container_ne3: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "space-around",
    paddingBottom: 30,
    borderTopWidth: 0
  },
  KeyboardAvoidingView_nml: {
    justifyContent: "space-between",
    flexGrow: 1
  },
  TextField_nz7: {
    height: 82,
    marginTop: 20
  },
  Text_n26: {
    textAlign: "center",
    marginTop: 20
  },
  Text_n4c: {
    textAlign: "center"
  },
  Text_ncr: {
    textAlign: "center"
  },
  Touchable_nze: {
    width: "100%",
    marginTop: 24
  }
})

export default withTheme(ForgotPasswordScreen)
