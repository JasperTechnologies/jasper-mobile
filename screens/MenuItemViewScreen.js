import React from "react"
import { StatusBar, StyleSheet, View, ScrollView, Text, FlatList } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  ScreenContainer,
  Image,
  Container,
  RowBodySwitch,
  Stepper,
  Button,
  Touchable
} from "@draftbit/ui"
import Images from "../config/Images.js"

class MenuItemViewScreen extends React.Component {
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
        <Image style={styles.Image_ne5} source={Images.Ramen} resizeMode="cover" />
        <Container style={styles.Container_nqd} elevation={0} useThemeGutterPadding={true}>
          <Text
            style={[
              styles.Text_nwi,
              theme.typography.headline4,
              {
                color: theme.colors.strong
              }
            ]}
          >
            Spicy Miso Ramen
          </Text>
          <Text
            style={[
              styles.Text_nn7,
              theme.typography.subtitle2,
              {
                color: theme.colors.medium
              }
            ]}
          >
            Ground pork, kung pao chilies, and napa cabbage. All ramen are served with tokyo wavy
            noodles from sun noodle.
          </Text>
          <Text
            style={[
              styles.Text_n2d,
              theme.typography.caption,
              {
                color: theme.colors.light
              }
            ]}
          >
            840 Cal.
          </Text>
          <Text
            style={[
              styles.Text_ngd,
              theme.typography.headline5,
              {
                color: theme.colors.primary
              }
            ]}
          >
            $ 12.99
          </Text>
        </Container>
        <Container style={styles.Container_nqy} elevation={0} useThemeGutterPadding={true}>
          <Text
            style={[
              styles.Text_n14,
              theme.typography.headline1,
              {
                color: theme.colors.medium
              }
            ]}
          >
            Ingredients
          </Text>
          <View style={styles.View_nzi}>
            <ScrollView
              contentContainerStyle={styles.ScrollView_nrz}
              showsVerticalScrollIndicator={true}
            >
              <FlatList
                style={styles.FlatList_nqo}
                data={[
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" },
                  { color: "medium", title: "Beef ($2.69)", fieldName: "switchValue" }
                ]}
                renderItem={({ item }) => (
                  <RowBodySwitch {...item} style={{ marginBottom: theme.spacing.small }} />
                )}
                keyExtractor={(_item, idx) => idx.toString()}
              />
            </ScrollView>
          </View>
        </Container>
        <Container
          style={styles.Container_n2x}
          elevation={0}
          backgroundColor={theme.colors.divider}
          useThemeGutterPadding={true}
        >
          <Stepper style={styles.Stepper_nrj} />
          <Button
            style={styles.Button_n5x}
            type="solid"
            color={theme.colors.primary}
            onPress={() => {
              this.props.navigation.navigate("MenuScreen")
            }}
          >
            Add To Cart
          </Button>
          <Touchable
            style={styles.Touchable_n3w}
            onPress={() => {
              this.props.navigation.navigate("MenuScreen")
            }}
          >
            <Text
              style={[
                styles.Text_n54,
                theme.typography.button,
                {
                  color: theme.colors.primary
                }
              ]}
            >
              Back
            </Text>
          </Touchable>
        </Container>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  Button_n5x: {
    width: "100%",
    height: 48
  },
  Container_n2x: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
    flexGrow: 1
  },
  Container_nqd: {
    paddingVertical: 16
  },
  Container_nqy: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  Image_ne5: {
    width: "100%",
    height: "35%"
  },
  ScrollView_nrz: {
    minWidth: "100%",
    minHeight: 0,
    paddingBottom: 100
  },
  Stepper_nrj: {
    width: 126,
    height: 42,
    marginBottom: 16
  },
  Text_n14: {
    paddingBottom: 40
  },
  Text_n2d: {
    textAlign: "auto",
    width: "100%",
    marginTop: 8
  },
  Text_n54: {
    textAlign: "center"
  },
  Text_ngd: {
    textAlign: "left",
    marginTop: 16
  },
  Text_nn7: {
    textAlign: "auto",
    width: "100%",
    marginTop: 8
  },
  Text_nwi: {
    textAlign: "auto",
    width: "100%"
  },
  Touchable_n3w: {
    width: "100%",
    marginTop: 24
  },
  View_nzi: {
    maxHeight: 250,
    alignSelf: "center",
    alignContent: "center"
  }
})

export default withTheme(MenuItemViewScreen)
