import React from "react"
import { StatusBar, StyleSheet, Text, FlatList, ScrollView } from "react-native"
import { useQuery } from '@apollo/react-hooks';
import CheckoutBody from '../components/CheckoutBody';
import ModalContainer from '../components/ModalContainer';
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

function CheckoutModal() {
  const { data: { checkout }, loading, error } = useQuery(GET_CHECKOUT_STATE);
  if (loading || checkout.status === "READY") {
    return null;
  }
  return (
    <ModalContainer>
      <Container>
        <Text>Hi</Text>
      </Container>
    </ModalContainer>
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
        <CheckoutModal />
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
})


export default withTheme(CheckoutScreen);
