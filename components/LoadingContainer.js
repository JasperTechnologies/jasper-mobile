import React from "react";
import { StyleSheet, Text } from "react-native";
import { yummy as screenTheme } from "../config/Themes"
import * as Progress from 'react-native-progress';
import {
  View
} from "@draftbit/ui";

export default function LoadingContainer() {
  const theme = Object.assign({}, screenTheme);
  // <Progress.Circle size={100} indeterminate={true} />
  return (
    <View style={styles.Loading_Container}>
      <Text style={theme.typography.bigfont}>
        {`Loading`}
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
