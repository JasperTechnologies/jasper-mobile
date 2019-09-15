import React from "react"
import { StatusBar, StyleSheet, ScrollView, Text } from "react-native"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { updateCurrentMenuItem } from '../reducers/reducer';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import {
  GET_CURRENT_MENU_ITEMS,
  GET_CART
} from '../constants/graphql-query';
// test
import { ADD_ITEM_TO_CART } from '../constants/graphql-mutation';
import InactiveDetector from '../components/InactiveDetector';
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Button,
  Container,
  View
} from "@draftbit/ui"
import MenuItem from "../components/MenuItem"
import MenuHeader from "../components/MenuHeader"

function MenuItems() {
  const [ addItemToCart ] = useMutation(ADD_ITEM_TO_CART);
  const { data, loading, error } = useQuery(
    GET_CURRENT_MENU_ITEMS,
    {
      onCompleted: (res) => {
        if (res) {
          addItemToCart({
            variables: {
              menuItemForm: {
                "__typename": "MenuItem",
                "calories": 620,
                "options": [

                ],
                "categories": [
                  {
                    "__typename": "MenuCategory",
                    "id": "ck0hl7gza3goz0b405z44489a",
                    "name": "Boba",
                  },
                ],
                "description": "Served ice cold with chewy tapioca balls and an organic base of green and black tea",
                "form": {
                  "__typename": "Form",
                  "formId": "1",
                  "options": [],
                  "quantity": 1,
                },
                "id": "ck0hln7concp00b09fy7b50bw",
                "pictureURL": "https://danielfooddiary.com/wp-content/uploads/2018/07/taiwanbubbletea3.jpg",
                "price": 699,
                "title": "Green Macha"
              }
            }
          })
        }

      }
    }
  );
  if (loading || error) {
    return null;
  }


  const { currentMenuItems } = data;

  return currentMenuItems.map((item, i) => <MenuItem
    key={i}
    description={item.description}
    title={item.title}
    price={item.price}
    calories={item.calories}
    imageURL={item.pictureURL}
    onPress={() => {
      this.onPressMenuItem(item);
    }}
  />)
}

function ViewCartButton({navigation}) {
  const { data: cartData, loading, error } = useQuery(GET_CART);
  if (loading || error) {
    return null;
  }

  const { cart } = cartData;
  if (!cart.length) {
    return null;
  }
  return (
    <Button
      style={styles.Button_nqn}
      type="solid"
      onPress={() => {
        navigation.navigate("CheckoutScreen")
      }}
    >
      <Text>{`View Cart ${cart.length} items`}</Text>
    </Button>
  )
}
class MenuScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  onPressMenuItem = (item) => {
    this.props.updateCurrentMenuItem(item)
    this.props.navigation.navigate("MenuItemViewScreen")
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
              <MenuItems />
            </ScrollView>
              <View style={styles.Footer_Container}>
                <ViewCartButton navigation={this.props.navigation} />
              </View>
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
  Button_nqn: {
  },
  CardContainer_ntj: {
    width: 300
  },
  Menu_Scrollview: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  Footer_Container: {
  }
})
export default withTheme(MenuScreen);
