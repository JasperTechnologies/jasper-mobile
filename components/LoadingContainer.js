import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  View
} from "@draftbit/ui";

export default function LoadingContainer() {
  return (
    <View style={styles.Loading_Container}>
      <Text style={styles.Jasper_Text}>
        {`JASPER`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Loading_Container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    zIndex: 5
  },
  Jasper_Text: {
    fontFamily: "LilitaOne",
    fontSize: 30
  },
});
