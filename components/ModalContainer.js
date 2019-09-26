import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, TouchableWithoutFeedback } from "react-native"
import {
  withTheme,
  Icon,
  Container,
  View
} from "@draftbit/ui";

export default function ModalContainer({ children }) {
  return (
    <View style={styles.Modal_Background}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  Modal_Background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 5
  }
});
