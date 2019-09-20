import React from "react"
import { StatusBar, StyleSheet, Text, FlatList, ScrollView } from "react-native"
import { useQuery, useMutation } from '@apollo/react-hooks';
import CheckoutBody from '../components/CheckoutBody';
import ModalContainer from '../components/ModalContainer';
import * as Progress from 'react-native-progress';
import {
  GET_CHECKOUT_STATE
} from '../constants/graphql-query';
import {
  withTheme,
  ScreenContainer,
  Icon,
  IconButton,
  Container,
} from "@draftbit/ui";

function CheckoutModal({theme}) {
  const { data: { checkout }} = useQuery(GET_CHECKOUT_STATE);
  if (checkout.status === "IN_PROGRESS") {
    return <ModalContainer>
    <Container style={[styles.Checkout_Container, styles.Container_MenuItemNav, styles.Modal_Container]}>
      <Text style={[styles.ModalHeader, theme.typography.headline1]}>
        Please Complete Payment With Card Reader
      </Text>
      <Progress.Circle size={100} indeterminate={true} />
    </Container>
  </ModalContainer>
  }
  return (
    null
  );
}

class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")
  }

  render() {
    const { theme } = this.props;
    return (
      <ScreenContainer hasSafeArea={true} scrollable={false} style={styles.Root_n9y}>
        <CheckoutModal theme={theme}/>
        <Container style={styles.Checkout_Container}>
          <Container style={styles.Container_MenuItemNav} elevation={0}>
            <IconButton
              style={styles.Touchable_Back}
              icon="MaterialIcons/arrow-back"
              size={50}
              color={theme.colors.primary}
              onPress={() => {
                this.props.navigation.navigate("MenuScreen")
              }}
            />
          </Container>
          <CheckoutBody
            theme={theme}
            navigateToMenuItem={() => this.props.navigation.navigate("MenuItemViewScreen")}
            />
        </Container>
      </ScreenContainer>
    )
  }
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
  Root_n9y: {
    justifyContent: "space-between"
  },
  Modal_Container: {
    height: "40%", 
    width: "30%", 
    backgroundColor: 'white', 
    borderRadius: 10
  },
  ModalHeader: {
    marginTop: 50,
    paddingRight: 50,
    paddingLeft: 50,
    textAlign: 'center',
    marginBottom: 50
  }
})


export default withTheme(CheckoutScreen);
