import React from "react"
import { StatusBar, StyleSheet, Text } from "react-native"
import { connect } from 'react-redux';
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Container,
  Button,
  View,
  Touchable,
  Image
} from "@draftbit/ui"

class LandingScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { theme } = this.state;
    const { logo, name, navigation } = this.props;
    return (
      <ScreenContainer hasSafeArea={false} scrollable={false}>
        <Touchable
          onPress={() => {
            navigation.navigate("MenuScreen")
          }}
        >
          <Container
            style={styles.Landing_Container}
          >
            <View style={styles.Logo_View}>
              <Image style={styles.Logo_Image} source={logo} resizeMode="cover" />
            </View>
            <View style={styles.Welcome_Text_View}>
              <Text style={styles.Welcome_Text}>
                {`Welcome to ${name}`}
              </Text>
            </View>
            <View style={styles.TabTo_Text_View}>
              <Text style={styles.TabTo_Text_Text}>
                Tab To Start Ordering
              </Text>
            </View>
          </Container>
        </Touchable>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Landing_Container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  Logo_View: {
    height: 150,
    width: 150
  },
  Logo_Image: {
    height: "100%",
    width: "100%"
  },
  Welcome_Text_View: {
    paddingVertical: 24
  },
  Welcome_Text: {
    fontSize: 40
  },
  TabTo_Text_View: {
    paddingVertical: 24
  },
  TabTo_Text_Text: {
    fontSize: 40
  }
})

export default withTheme(LandingScreen);
// const mapStateToProps = state => {
//   return {
//     logo: state.user.logo,
//     name: state.user.name
//   };
// };
//
// const mapDispatchToProps = {
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LandingScreen));
