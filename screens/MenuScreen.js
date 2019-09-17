import React from "react"
import { StatusBar, StyleSheet, ScrollView, Text } from "react-native"
import { useQuery } from '@apollo/react-hooks';
import {
  GET_CURRENT_MENU_ITEMS,
  GET_CART
} from '../constants/graphql-query';
import InactiveDetector from '../components/InactiveDetector';
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Container,
} from "@draftbit/ui"
import MenuItem from "../components/MenuItem"
import MenuHeader from "../components/MenuHeader"
import FooterNavButton from '../components/FooterNavButton'

function MenuItems({navigation}) {
  const { data, loading, error } = useQuery(GET_CURRENT_MENU_ITEMS);
  if (loading || error) {
    return null;
  }


  const { currentMenuItems } = data;

  return currentMenuItems.map((item, i) => <MenuItem
    key={i}
    item={item}
    navigation={navigation}
  />)
}

function ViewCartButton({navigation}) {
  const { data: { cart }, loading, error } = useQuery(GET_CART);
  if (loading || error) {
    return null;
  }
  if (!cart.length) {
    return null;
  }
  return <FooterNavButton
    onPress={() => navigation.navigate("CheckoutScreen")}
    text={`View Cart ${cart.length} items`}
    />
}
class MenuScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { cart = [] } = this.props;
    return (
      <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_npc}>
        <InactiveDetector navigation={this.props.navigation}>
          <Container style={styles.Menu_Page_Container}>
            <MenuHeader />
            <ScrollView
              contentContainerStyle={styles.Menu_Scrollview}
              bounces={true}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={true}
            >
              <MenuItems navigation={this.props.navigation} />
            </ScrollView>
            <ViewCartButton navigation={this.props.navigation} />
          </Container>
        </InactiveDetector>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Menu_Page_Container: {
    display: "flex",
    height: "100%"
  },
  CardContainer_ntj: {
    width: 300
  },
  Menu_Scrollview: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 100
  },
})
export default withTheme(MenuScreen);
