import React, { useState, useEffect, useRef } from "react"
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing
} from "react-native"
import { useQuery, useMutation } from '@apollo/react-hooks';
import CheckoutBody from '../components/CheckoutBody';
import CancelingSaleView from '../components/payment-processors/canceling-sale-view';
import ProcessorOrderDisplayView from '../components/payment-processors/order-display-view';
import ProcessorPaymentView from '../components/payment-processors/payment-view';
import * as Progress from 'react-native-progress';
import {
  GET_CHECKOUT_STATE
} from '../constants/graphql-query';
import {
  SET_CHECKOUT_READY,
  SET_CHECKOUT_CANCELING
} from '../constants/graphql-mutation';
import {
  withTheme,
  ScreenContainer,
  IconButton,
  Container,
  Image,
} from "@draftbit/ui";

const startFontAnimation = (scaleValue) => {
  Animated.loop(
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    })).start();
};

const fontScaleValue = new Animated.Value(0);
const fontCardScale = fontScaleValue.interpolate({
  inputRange: [0, 0.25, .5, .75, 1],
  outputRange: [1, 1.3, 1.6, 1.3, 1]
});

startFontAnimation(fontScaleValue);

function CheckoutModal({theme}) {
  const checkoutModalAnimatedValue = useRef(new Animated.Value(0)).current;
  const { data: { checkoutState }} = useQuery(GET_CHECKOUT_STATE);
  const [ setCheckoutReady ] = useMutation(SET_CHECKOUT_READY);
  const [ setCheckoutCanceling ] = useMutation(SET_CHECKOUT_CANCELING);
  useEffect(() => {
    if (checkoutState === "IN_PROGRESS") {
      Animated.timing(checkoutModalAnimatedValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease
      }).start();
    } else {
      Animated.timing(checkoutModalAnimatedValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease
      }).start();
    }
  }, [checkoutState]);
  return (
    <Animated.View
      style={[
        styles.Checkout_Modal_Container,
        {
          top: checkoutModalAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1000, 0]
          })
        }
      ]}
    >
      <TouchableOpacity
        style={styles.Cancel_Button}
        onPress={() => {
          setCheckoutCanceling({
            refetchQueries: ["GetCheckoutState"]
          }).then(() => {
            setTimeout(() => {
              setCheckoutReady({
                refetchQueries: ["GetCheckoutState"]
              });
            }, 2000);
          });
        }}
      >
        <Text
          style={[
            theme.typography.headline1,
            {
              color: "#FFFFFF"
            }
          ]}
        >
          Cancel
        </Text>
      </TouchableOpacity>
      <View style={styles.Checkout_Modal_Content}>
        <Image
          style={styles.Jasper_Experience}
          source={require('../assets/images/payment.png')}
        />
        <Animated.View style={{ paddingVertical: 24, transform: [{ scale: fontCardScale }] }}>
          <Animated.Text style={{
            fontSize: 40,
            fontWeight: 'bold'
          }}>
            Tap or Swipe to Complete Payment
          </Animated.Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

function CheckoutScreen({ theme, navigation }) {
  StatusBar.setBarStyle("light-content");
  const [, forceUpdate ] = useState();
  const { data: { checkoutState }} = useQuery(GET_CHECKOUT_STATE);
  const [ setCheckoutReady ] = useMutation(SET_CHECKOUT_READY);
  useEffect(() => {
    if (checkoutState === "SUCCESS") {
      setCheckoutReady();
      navigation.navigate("ThankYouScreen");
    }
  }, [checkoutState]);
  return (
    <ScreenContainer scrollable={false}>
      <CheckoutModal theme={theme}/>
      { checkoutState === "CANCELING" && <CancelingSaleView /> }
      { checkoutState === "READY" && <ProcessorOrderDisplayView /> }
      { checkoutState === "IN_PROGRESS" && <ProcessorPaymentView /> }
      <Container style={styles.Checkout_Container}>
        <Container style={styles.Container_MenuItemNav}>
          <IconButton
            style={styles.Touchable_Back}
            icon="MaterialIcons/arrow-back"
            size={50}
            color={theme.colors.primary}
            onPress={() => {
              navigation.navigate("MenuScreen")
            }}
          />
        </Container>
        <CheckoutBody
          theme={theme}
          navigateToMenuItem={() => navigation.navigate("MenuItemViewScreen")}
        />
      </Container>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  Checkout_Container: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  Container_MenuItemNav: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  Touchable_Back: {
    alignSelf: "flex-start",
    margin: 24
  },
  Checkout_Modal_Container: {
    position: "absolute",
    zIndex: 10,
    height: "100%",
    width: "100%",
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  Checkout_Modal_Content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  ModalHeader: {
    marginTop: 50,
    paddingRight: 50,
    paddingLeft: 50,
    textAlign: 'center',
    marginBottom: 50
  },
  Cancel_Button: {
    position: "absolute",
    top: 24,
    right: 24,
    padding: 24,
    backgroundColor: "#cf502d"
  }
})


export default withTheme(CheckoutScreen);
