import { systemWeights } from "react-native-typography"

export const yummy = {
  disabledOpacity: 0.5,
  spacing: {
    gutters: 16,
    text: 8,
    small: 16,
    medium: 16,
    large: 18
  },
  borderRadius: {
    global: 6,
    button: 6
  },
  typography: {
    body1: {
      fontWeight: null,
      fontSize: 15,
      lineHeight: 18,
      fontFamily: "PoppinsBold"
    },
    body2: {
      fontWeight: null,
      fontSize: 14,
      lineHeight: 17,
      fontFamily: "PoppinsBold"
    },
    button: {
      fontWeight: null,
      fontSize: 15,
      lineHeight: 16,
      fontFamily: "PoppinsSemiBold"
    },
    caption: {
      fontWeight: null,
      fontSize: 15,
      lineHeight: 20,
      fontFamily: "PoppinsBold"
    },
    headline1: {
      fontWeight: null,
      fontSize: 28,
      lineHeight: 34,
      fontFamily: "PoppinsBold"
    },
    headline2: {
      fontWeight: null,
      fontSize: 24,
      lineHeight: 28,
      fontFamily: "PoppinsBold"
    },
    headline3: {
      fontWeight: null,
      fontSize: 18,
      lineHeight: 22,
      fontFamily: "PoppinsBold"
    },
    headline4: {
      fontWeight: null,
      fontSize: 18,
      lineHeight: 22,
      fontFamily: "PoppinsSemiBold"
    },
    headline5: {
      fontWeight: null,
      fontSize: 20,
      lineHeight: 26,
      fontFamily: "PoppinsSemiBold"
    },
    headline6: {
      fontWeight: null,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "PoppinsSemiBold"
    },
    overline: {
      fontWeight: null,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 2,
      fontFamily: "PoppinsMedium"
    },
    subtitle1: {
      fontWeight: null,
      fontSize: 15,
      lineHeight: 18,
      fontFamily: "PoppinsRegular"
    },
    subtitle2: {
      fontWeight: null,
      fontSize: 14,
      lineHeight: 17,
      fontFamily: "PoppinsRegular"
    }
  },
  colors: {
    background: "rgba(247, 247, 244, 1)",
    divider: "rgba(228, 228, 223, 1)",
    error: "rgba(247, 74, 39, 1)",
    light: "rgba(167, 167, 159, 1)",
    lightInverse: "rgba(255, 255, 255, 0.68)",
    medium: "rgba(102, 102, 95, 1)",
    mediumInverse: "rgba(255, 255, 255, 0.87)",
    primary: "rgba(255, 144, 0, 1)",
    secondary: "rgba(50, 173, 163, 1)",
    strong: "rgba(33, 9, 63, 1)",
    strongInverse: "rgba(255, 255, 255, 1)",
    surface: "rgba(255, 255, 255, 1)"
  },
  elevation: {
    "0": {
      shadowColor: "rgba(33, 9, 63, 1)",
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 0,
      shadowOpacity: 0,
      borderWidth: 0,
      borderColor: "rgba(33, 9, 63, 1)",
      borderOpacity: 0
    },
    "1": {
      shadowColor: "rgba(33, 9, 63, 1)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 0.16,
      borderWidth: 0,
      borderColor: "rgba(33, 9, 63, 1)",
      borderOpacity: 0
    },
    "2": {
      shadowColor: "rgba(33, 9, 63, 1)",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 3,
      shadowOpacity: 0.1,
      borderWidth: 1,
      borderColor: "rgba(33, 9, 63, 1)",
      borderOpacity: 0.1
    },
    "3": {
      shadowColor: "rgba(33, 9, 63, 1)",
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowRadius: 6,
      shadowOpacity: 0.16,
      borderWidth: 0,
      borderColor: "rgba(33, 9, 63, 1)",
      borderOpacity: 0
    }
  }
}
export const draftbit = {
  disabledOpacity: 0.5,
  spacing: {
    gutters: 16,
    text: 4,
    small: 8,
    medium: 12,
    large: 16
  },
  borderRadius: {
    global: 6,
    button: 24
  },
  typography: {
    body1: {
      ...systemWeights.regular,
      fontSize: 16,
      lineHeight: 26
    },
    body2: {
      ...systemWeights.regular,
      fontSize: 14,
      lineHeight: 22
    },
    button: {
      ...systemWeights.bold,
      fontSize: 14,
      lineHeight: 16
    },
    caption: {
      ...systemWeights.regular,
      fontSize: 12,
      lineHeight: 16
    },
    headline1: {
      ...systemWeights.bold,
      fontSize: 60,
      lineHeight: 71
    },
    headline2: {
      ...systemWeights.bold,
      fontSize: 48,
      lineHeight: 58
    },
    headline3: {
      ...systemWeights.bold,
      fontSize: 34,
      lineHeight: 40
    },
    headline4: {
      ...systemWeights.bold,
      fontSize: 24,
      lineHeight: 34
    },
    headline5: {
      ...systemWeights.bold,
      fontSize: 20,
      lineHeight: 26
    },
    headline6: {
      ...systemWeights.bold,
      fontSize: 16,
      lineHeight: 24
    },
    overline: {
      ...systemWeights.regular,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 2
    },
    subtitle1: {
      ...systemWeights.regular,
      fontSize: 16,
      lineHeight: 26
    },
    subtitle2: {
      ...systemWeights.regular,
      fontSize: 14,
      lineHeight: 22
    }
  },
  colors: {
    background: "rgba(251, 252, 253, 1)",
    divider: "rgba(234, 237, 242, 1)",
    error: "rgba(255, 69, 100, 1)",
    light: "rgba(165, 173, 183, 1)",
    lightInverse: "rgba(255, 255, 255, 0.68)",
    medium: "rgba(70, 78, 88, 1)",
    mediumInverse: "rgba(255, 255, 255, 0.87)",
    primary: "rgba(90, 69, 255, 1)",
    secondary: "rgba(59, 201, 234, 1)",
    strong: "rgba(18, 20, 44, 1)",
    strongInverse: "rgba(255, 255, 255, 1)",
    surface: "rgba(255, 255, 255, 1)"
  },
  elevation: {
    "0": {
      shadowColor: "rgba(18, 20, 44, 1)",
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 0,
      shadowOpacity: 0,
      borderWidth: 0,
      borderColor: "rgba(18, 20, 44, 1)",
      borderOpacity: 0
    },
    "1": {
      shadowColor: "rgba(18, 20, 44, 1)",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.06,
      borderWidth: 1,
      borderColor: "rgba(18, 20, 44, 1)",
      borderOpacity: 0.06
    },
    "2": {
      shadowColor: "rgba(18, 20, 44, 1)",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.08,
      borderWidth: 0,
      borderColor: "rgba(18, 20, 44, 1)",
      borderOpacity: 0
    },
    "3": {
      shadowColor: "rgba(18, 20, 44, 1)",
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowRadius: 6,
      shadowOpacity: 0.12,
      borderWidth: 0,
      borderColor: "rgba(18, 20, 44, 1)",
      borderOpacity: 0
    }
  }
}
