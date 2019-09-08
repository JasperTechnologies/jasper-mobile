import React from "react"
import { StatusBar, StyleSheet, ScrollView, Text } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Touchable,
  Icon,
  CardContainer,
  Image,
  Container,
  Button
} from "@draftbit/ui"
import Images from "../config/Images.js"
import MenuItem from "../components/MenuItem"

class MenuScreen extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
      theme: Object.assign(props.theme, screenTheme)
    }
  }

  render() {
    const { theme } = this.state

    return (
      <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_npc}>
        <Touchable
          style={styles.Touchable_nnl}
          onPress={() => {
            this.props.navigation.navigate("CheckoutScreen")
          }}
        >
          <Icon
            style={styles.Icon_n49}
            name="Entypo/shopping-cart"
            size={48}
            color={theme.colors.strong}
          />
        </Touchable>
        <ScrollView
          contentContainerStyle={styles.ScrollView_na3}
          bounces={true}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
        >
          <Touchable>
            <CardContainer
              style={styles.CardContainer_ntj}
              icon="MaterialIcons/cloud"
              title="Beautiful West Coast Villa"
              elevation={2}
              numColumns={3}
              aspectRatio={1.5}
              leftDescription="San Diego"
              rightDescription="$100"
            />
          </Touchable>
          {[1,1,1,1,1,1,1,1,1,1,1,1,1].map(num => <MenuItem 
            description={`Ground pork, kung pao chilies, and napa cabbage. All ramen are served with tokyo wavy noodles from sun noodle.`}
            title={`Spicy Miso Ramen`}
            price={`$9.99`}
            calories={`840`}
          />)}
        </ScrollView>
        <Button
          style={styles.Button_nqn}
          icon="MaterialIcons/add"
          type="solid"
          onPress={() => {
            this.props.navigation.navigate("CheckoutScreen")
          }}
        >
          Checkout
        </Button>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Button_nqn: {
    marginTop: 40
  },
  CardContainer_ntj: {
    width: 300
  },
  Icon_n49: {
    width: 48,
    height: 48,
    alignSelf: "flex-end",
    marginTop: 40,
    marginRight: 40
  },
  ScrollView_na3: {
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 200,
    marginTop: 60,
    flexWrap: "wrap"
  }
})

export default withTheme(MenuScreen)
