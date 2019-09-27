import React from "react"
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native"
import { useQuery, useMutation } from '@apollo/react-hooks';
import CheckoutBody from '../components/CheckoutBody';
import ModalContainer from '../components/ModalContainer';
import CancellingSaleView from '../components/payment-processors/cancelling-sale-view';
import ProcessorOrderDisplayView from '../components/payment-processors/order-display-view';
import ProcessorPaymentView from '../components/payment-processors/payment-view';
import * as Progress from 'react-native-progress';
import {
  GET_CHECKOUT_STATE
} from '../constants/graphql-query';
import {
  SET_CHECKOUT_READY,
  SET_CHECKOUT_CANCELLING
} from '../constants/graphql-mutation';
import {
  withTheme,
  ScreenContainer,
  IconButton,
  Container,
} from "@draftbit/ui";

function CheckoutModal({theme}) {
  const { data: { checkoutState }} = useQuery(GET_CHECKOUT_STATE);
  const [ setCheckoutReady ] = useMutation(SET_CHECKOUT_READY);
  const [ setCheckoutCancelling ] = useMutation(SET_CHECKOUT_CANCELLING);
  if (checkoutState === "IN_PROGRESS") {
    return (
      <ModalContainer>
        <TouchableOpacity
          style={styles.Cancel_Button}
          onPress={() => {
            setCheckoutCancelling({
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
        <Container style={[styles.Checkout_Modal_Container]}>
          <Text style={[styles.ModalHeader, theme.typography.headline1]}>
            Please Complete Payment With Card Reader
          </Text>
          <Progress.Circle size={100} indeterminate={true} />
        </Container>
      </ModalContainer>
    );
  }
  return (
    null
  );
}

function CheckoutScreen({ theme, navigation }) {
  StatusBar.setBarStyle("light-content");
  const { data: { checkoutState }} = useQuery(GET_CHECKOUT_STATE);
  return (
    <ScreenContainer scrollable={false}>
      <CheckoutModal theme={theme}/>
      { checkoutState === "CANCELLING" && <CancellingSaleView /> }
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
          navigateToThankYouScreen={() => navigation.navigate("ThankYouScreen")}
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
  CartItem_Cell: {
    display: "flex",
    flexDirection: "row",
		marginBottom: 24,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    minHeight: 150
  },
  Checkout_Modal_Container: {
    height: "40%",
    width: "30%",
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
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
