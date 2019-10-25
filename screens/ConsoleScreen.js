import React from "react"
import { AsyncStorage, StatusBar, StyleSheet, Text } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Container,
  Button,
  Touchable,
  View
} from "@draftbit/ui"

class ConsoleScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  logout = () => {
    AsyncStorage.removeItem("userToken", () => {
      this.props.navigation.navigate("EmailPasswordLoginScreen");
    });
  }

  render() {
    const { theme } = this.state

    return (
      <ScreenContainer scrollable={false}>
        <Touchable
          onPress={() => {
            this.props.navigation.navigate("LandingScreen")
          }}
        >
          <Container
            style={styles.MainContainer}
            backgroundImageResizeMode="cover"
          >
            <Text
              style={styles.TabTo_Text_Text}
            >Tab to Landing View</Text>
          </Container>
        </Touchable>
        <View style={styles.Logout_Button_Container}>
          <Button
            style={styles.Logout_Button}
            type="outline"
            color={theme.colors.primary}
            onPress={this.logout}
          >
            Logout
          </Button>
        </View>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Logout_Button: {
  },
  MainContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  TabTo_Text_Text: {
    fontWeight: 'bold',
    fontSize: 40
  },
  Logout_Button_Container: {
    position: "absolute",
    bottom: 10,
    right: 10
  }
})

export default withTheme(ConsoleScreen)
