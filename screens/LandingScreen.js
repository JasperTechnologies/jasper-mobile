import React from "react"
import { StatusBar, StyleSheet, Text, Animated, Easing } from "react-native"
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { yummy as screenTheme } from "../config/Themes"
import {
  GET_USER
} from '../constants/graphql-query';
import {
  withTheme,
  ScreenContainer,
  Container,
  Button,
  View,
  Touchable,
  Image
} from "@draftbit/ui"


const startAnimation = (scaleValue) => {
  Animated.loop(
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    })).start();
}

function LandingContainer() {
  const { data: userData, loading, error } = useQuery(GET_USER);
  if (loading || error) {
    return null;
  }
  const {
    user: {
      name,
      pictureURL
    }
  } = userData;
  let scaleValue = new Animated.Value(0)
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.25, .5, .75, 1],
    outputRange: [1, 1.2, 1.4, 1.2, 1]
  });
  startAnimation(scaleValue)
  return (
    <Container
      style={styles.Landing_Container}
    >
      <View style={styles.Logo_View}>
        <Image style={styles.Logo_Image} source={pictureURL} resizeMode="cover" />
      </View>
      <View style={styles.Welcome_Text_View}>
        <Text style={styles.Welcome_Text}>
          {`Welcome to ${name}`}
        </Text>
      </View>
      <Animated.View style={{...styles.TabTo_Text_View, transform: [{ scale: cardScale }] }}>
        <Animated.Text style={styles.TabTo_Text_Text}>
          Tap To Order
        </Animated.Text>
      </Animated.View>
    </Container>
  );
}

class LandingScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScreenContainer hasSafeArea={false} scrollable={false}>
        <Touchable
          onPress={() => {
            navigation.navigate("MenuScreen")
          }}
        >
          <LandingContainer />
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
    fontWeight: 'bold',
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
