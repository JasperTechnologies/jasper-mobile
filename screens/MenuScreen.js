import React, { useEffect } from "react"
import { StatusBar, StyleSheet, ScrollView, Text } from "react-native"
import { useQuery } from '@apollo/react-hooks';
import {
  GET_NEWLY_ADDED_ITEMS,
  GET_CURRENT_MENU_ITEMS,
  GET_CART
} from '../constants/graphql-query';
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
export default function MenuScreen({ navigation }) {
  StatusBar.setBarStyle("light-content");
  const { data: { newlyAddedItems } } = useQuery(GET_NEWLY_ADDED_ITEMS);
  useEffect(() => {
    if (newlyAddedItems.length > 0) {
      setTimeout(() => {
        console.log(" some stuff ")
      }, 2000);
    }
  }, [newlyAddedItems]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_npc}>
      <Container style={styles.Menu_Page_Container}>
        <MenuHeader />
        <ScrollView
          contentContainerStyle={styles.Menu_Scrollview}
          bounces={true}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
        >
          <MenuItems navigation={navigation} />
        </ScrollView>
        <ViewCartButton navigation={navigation} />
      </Container>
    </ScreenContainer>
  );
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
