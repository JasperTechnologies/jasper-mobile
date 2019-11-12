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
  withTheme,
  Button
} from "@draftbit/ui"
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  GET_CURRENT_MENU_ITEM
} from '../constants/graphql-query';
import {
  CLEAR_MENU_ITEM_STATE
} from '../constants/graphql-mutation';
import MenuItem from "./MenuItem"


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
      // Animated.timing(upsellModalAnimatedValue, {
      //     toValue: -1,
      //     duration: 500,
      //     easing: Easing.ease
      // }).start();
    }
  }, [showModal]);
  return (
    <Animated.View
      style={[
        styles.Upsell_Modal_Container,
        showModal ? {} : { display: 'none' },
        {
          top: upsellModalAnimatedValue.interpolate({
            inputRange: [0, 1.1],
            outputRange: [1000, 0]
          })
        }
      ]}
    >
      <View style={styles.Upsell_Modal_Content}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "800",
            paddingVertical: 48
          }}
        >
          Would You Like To Add
        </Text>
        <MenuItem
            key={0}
            item={currentMenuItem}
            navigation={navigation}
            isUpselling={true}
            onPress={() => {setShowModal(false)}}
          />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 24
          }}
        >
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
            <Button style={styles.Button_nxi} type="outline" color={theme.colors.primary}               onPress={() => {
                clearMenuItemState().then(() => navigation.navigate("MenuScreen"));
              }}>
              Maybe Next Time!
            </Button>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
    left: "30%",
    height: "80%",
    width: "40%",
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.5,
		shadowRadius: 1.00,
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
