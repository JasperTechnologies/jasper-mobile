import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing
} from "react-native"
import {
  withTheme
} from "@draftbit/ui"
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  GET_CURRENT_MENU_ITEM
} from '../constants/graphql-query';
import {
  CLEAR_MENU_ITEM_STATE
} from '../constants/graphql-mutation';
import {
  Image,
} from "@draftbit/ui";
import { centsToDollar } from '../utilities/money';

function UpsellModal({ showModal, setShowModal, theme, navigation }) {
  const upsellModalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [ clearMenuItemState ] = useMutation(CLEAR_MENU_ITEM_STATE);
  const {
    data: {
      currentMenuItem
    }
  } = useQuery(GET_CURRENT_MENU_ITEM);
  useEffect(() => {
    if (showModal) {
      Animated.timing(upsellModalAnimatedValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease
      }).start();
    } else {
      Animated.timing(upsellModalAnimatedValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease
      }).start();
    }
  }, [showModal]);
  return (
    <Animated.View
      style={[
        styles.Upsell_Modal_Container,
        {
          top: upsellModalAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1000, 0]
          })
        }
      ]}
    >
      <View style={styles.Upsell_Experience_Container}>
        <Image
          style={styles.Upsell_Experience}
          source={require('../assets/images/pick-by-jasper.png')}
        />
      </View>
      <View style={styles.Upsell_Modal_Content}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "800",
            paddingVertical: 24
          }}
        >
          Would you like to add
        </Text>
        <Image style={styles.Upsell_Item_Image} source={currentMenuItem.pictureURL} resizeMode="cover" />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            paddingVertical: 24
          }}
        >
          {currentMenuItem.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800"
          }}
        >
          ${centsToDollar(currentMenuItem.price)}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 24
          }}
        >
          <TouchableOpacity
            style={{
              padding: 24,
              width: "35%"
            }}
          >
            <Text
              style={{
                color: "#20BF6C",
                fontSize: 40,
                fontWeight: "800",
                textAlign: "center"
              }}
              onPress={() => {
                setShowModal(false);
              }}
            >
              Yes!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 24,
              width: "35%"
            }}
          >
            <Text
              style={{
                color: "#cf502d",
                fontSize: 40,
                fontWeight: "800",
                textAlign: "center"
              }}
              onPress={() => {
                clearMenuItemState().then(() => navigation.navigate("MenuScreen"));
              }}
            >
              No, Next Time!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  Checkout_Container: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  Container_MenuItemNav: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  Touchable_Back: {
    alignSelf: "flex-start",
    margin: 24
  },
  Upsell_Modal_Container: {
    position: "absolute",
    zIndex: 10,
    height: "100%",
    width: "100%",
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  Upsell_Modal_Content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  Upsell_Experience_Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: "3%",
    right: "3%",
    position: 'absolute'
  },
  Upsell_Experience: {
    width: 170,
    height: 100
  },
  Upsell_Item_Image: {
    width: 400,
    height: 300,
  },
})

export default withTheme(UpsellModal);
