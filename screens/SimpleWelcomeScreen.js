import React from "react"
import { StatusBar, StyleSheet, Text } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import { withTheme, ScreenContainer, Container, Button } from "@draftbit/ui"

class SimpleWelcomeScreen extends React.Component {
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
      <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_noz}>
        <Container
          style={styles.Container_n6j}
          elevation={0}
          useThemeGutterPadding={true}
          backgroundImageResizeMode="cover"
        >
          <Container style={styles.Container_n6w} elevation={0} useThemeGutterPadding={true}>
            <Text
              style={[
                styles.Text_nml,
                theme.typography.bigfont,
                {
                  color: 'black'
                }
              ]}
            >
              Welcome
            </Text>
            <Text
              style={[
                styles.Text_nmh,
                theme.typography.headline3,
                {
                  color: 'black'
                }
              ]}
            >
              If you have NOT set up your menu or order management with Jasper, please contact Jasper.
            </Text>
          </Container>
          <Container style={styles.Container_np9} elevation={0}>
            <Button
              style={styles.Button_nuw}
              type="solid"
              color={theme.colors.primary}
              onPress={() => {
                this.props.navigation.navigate("LandingScreen")
              }}
            >
              Menu App
            </Button>
            <Button style={styles.Button_nxi} type="outline" color={theme.colors.primary}>
              Order Management App
            </Button>
          </Container>
        </Container>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Button_nuw: {
    height: 48,
    marginTop: 0
  },
  Button_nxi: {
    height: 48
  },
  Container_n6j: {
    minWidth: "100%",
    minHeight: "100%",
    justifyContent: "space-around",
    flexGrow: 1
  },
  Container_np9: {
    height: 150,
    justifyContent: "space-between"
  },
  Text_nmh: {
    textAlign: "center",
    paddingHorizontal: 0,
    marginVertical: 0
  },
  Text_nml: {
    textAlign: "center",
    paddingHorizontal: 0,
    marginVertical: 0
  }
})

export default withTheme(SimpleWelcomeScreen)
