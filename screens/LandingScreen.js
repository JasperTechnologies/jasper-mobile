import React, { useEffect } from "react"
import { StatusBar, StyleSheet, Text, Animated, Easing } from "react-native"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { yummy as screenTheme } from "../config/Themes"
import {
  GET_LOCATION
} from '../constants/graphql-query';
import {
  CLEAR_CART,
  SET_TIP_PERCENTAGE
} from '../constants/graphql-mutation';
import {
  withTheme,
  ScreenContainer,
  Container,
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
  const { data: locationData, loading, error } = useQuery(GET_LOCATION);
  const [ clearCart ] = useMutation(CLEAR_CART);
  const [ setTipPercentage ] = useMutation(SET_TIP_PERCENTAGE);
  useEffect(() => {
    // clean up
    clearCart();
    setTipPercentage({
      variables: {
        tipPercentage: 0
      }
    });
  }, []);
  if (loading || error) {
    return null;
  }
  const {
    location: {
      pictureURL,
      name,
      taxes
    }
  } = locationData;
  let scaleValue = new Animated.Value(0)
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.25, .5, .75, 1],
    outputRange: [1, 1.3, 1.6, 1.3, 1]
  });
  startAnimation(scaleValue);
  return (
    <Container
      style={styles.Landing_Container}
    >
      <View style={styles.Jasper_Powered_Container}>
        <Text style={styles.Jasper_Powered_Text}>
          {`Experience By `}
        </Text>
        <Text style={styles.Jasper_Text}>
          {` JASPER`}
        </Text>
      </View>
      <View style={styles.Welcome_Text_View}>
        <Text style={styles.Welcome_Text}>
          {`Welcome To`}
        </Text>
      </View>
      <View style={styles.Logo_View}>
        <Image style={styles.Logo_Image} source={pictureURL} resizeMode="contain" />
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
    display: 'flex',
    justifyContent: 'center',
    width: "50%",
    height: "30%"
  },
  Logo_Image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  Welcome_Text_View: {
    paddingTop: "5%",
    paddingBottom: 20
  },
  Welcome_Text: {
    fontWeight: 'bold',
    fontSize: 100
  },
  Jasper_Powered_Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: "3%",
    right: "3%",
    position: 'absolute'
  },
  Jasper_Powered_Text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  Jasper_Text: {
    fontFamily: "LilitaOne",
    fontSize: 30
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
