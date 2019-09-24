import React, { useEffect, useState } from "react";
import ProessorLandingView from "./landing-view";

function shouldShowLandingView(screenName) {
  if (screenName !== "CheckoutScreen") {
    return true;
  }
  return false;
}
export default function NavigationDetector({ navigation }) {
  const screenName = navigation.state.routes[navigation.state.index].key;

  if (shouldShowLandingView(screenName)) {
    return <ProessorLandingView />;
  }
  return (
    null
  );
};
