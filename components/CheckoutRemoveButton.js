import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { yummy as screenTheme } from "../config/Themes"
import {
  withTheme,
  Touchable,
  Image,
  Container,
  IconButton
} from "@draftbit/ui"

class CheckoutRemoveButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: Object.assign(props.theme, screenTheme),
      isConfirming: false
    };
  }

  render() {
    const { theme, isConfirming } = this.state
    if (isConfirming) {
      return (
        <View style={styles.Confirmation_Container}>
          <Touchable
            style={styles.Remove_Confirmantion_Button}
          >
            <Text
              style={[
                theme.typography.headline4,
                { color: "#ffffff" }
              ]}
              onPress={() => {
                this.setState({
                  isConfirming: false
                });
                this.props.removeItemFromCart(this.props.item);
              }}
            >
              Remove
            </Text>
          </Touchable>
          <Touchable
            style={styles.Remove_Cancel_Button}
            onPress={() => {
              this.setState({
                isConfirming: false
              });
            }}
          >
            <Text
              style={[
                theme.typography.headline4
              ]}
            >
              Cancel
            </Text>
          </Touchable>
        </View>
      );
    }
    return (
      <IconButton
        style={styles.Remove_Button}
        icon="MaterialIcons/delete"
        size={24}
        color="#ffffff"
        onPress={() => {
          this.setState({
            isConfirming: true
          });
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  Confirmation_Container: {
    display: "flex",
    flexDirection: "row"
  },
  Remove_Cancel_Button: {
    height: 50,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  Remove_Confirmantion_Button: {
    height: 50,
    paddingHorizontal: 24,
    backgroundColor: "#fc3903",
    alignItems: "center",
    justifyContent: "center"
  },
  Remove_Button: {
    backgroundColor: "#fc3903",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default withTheme(CheckoutRemoveButton);
