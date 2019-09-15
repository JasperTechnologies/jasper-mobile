import React from "react"
import { StatusBar, StyleSheet, ScrollView, Text } from "react-native"
import { useQuery } from '@apollo/react-hooks';
import { updateCurrentMenuItem } from '../reducers/reducer';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { GET_MENU_ITEMS } from '../constants/graphql-query';
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
  const { data, loading, error } = useQuery(GET_MENU_ITEMS);
    console.log(data)
  if (loading) {
    return null;
  }

  // {this.props.currentMenuItems.map((item, i) => <MenuItem
  //   key={i}
  //   description={item.description}
  //   title={item.title}
  //   price={item.price}
  //   calories={item.calories}
  //   imageURL={item.imageURL}
  //   onPress={() => {
  //     this.onPressMenuItem(item);
  //   }}
  // />)}
  return null;
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
    const { cart } = this.props;
    return (
      <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_npc}>
        <InactiveDetector navigation={this.props.navigation}>
          <Container style={styles.Menu_Page_Container}>
            <MenuHeader />
            <CheckQuery />
            <ScrollView
              contentContainerStyle={styles.Menu_Scrollview}
              bounces={true}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={true}
            >
              <MenuItems />
            </ScrollView>
            {
              cart.length ?
              <View style={styles.Footer_Container}>
                <Button
                  style={styles.Button_nqn}
                  type="solid"
                  onPress={() => {
                    this.props.navigation.navigate("CheckoutScreen")
                  }}
                >
                  <Text>{`View Cart ${cart.length} items`}</Text>
                </Button>
              </View> : null
            }
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
// const mapStateToProps = state => {
//   return {
//     cart: state.cart,
//     currentMenuItems: state.currentMenuItems
//   };
// };
//
// const mapDispatchToProps = {
//   updateCurrentMenuItem
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MenuScreen));
