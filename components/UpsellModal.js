import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {
  withTheme,
  Button,
  Image
} from "@draftbit/ui"
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  GET_CURRENT_MENU_ITEM
} from '../constants/graphql-query';
import {
  CLEAR_MENU_ITEM_STATE
} from '../constants/graphql-mutation';
import MenuItem from "./MenuItem";
import ModalContainer from './ModalContainer';


function UpsellModal({ showModal, setShowModal, theme, navigation }) {
  const [ clearMenuItemState ] = useMutation(CLEAR_MENU_ITEM_STATE);
  const {
    data: {
      currentMenuItem
    }
  } = useQuery(GET_CURRENT_MENU_ITEM);

  if (!showModal) {
    return null;
  }
  return (
    <ModalContainer>
      <View
        style={[
          styles.Upsell_Modal_Container
        ]}
      >
        <View style={styles.Upsell_Modal_Content}>
          <Image
            style={{ height: 40, width: 100 }}
            source={require('../assets/images/pick-by-jasper.png')}
          />
          <Text
            style={{
              fontSize: 40,
              fontWeight: "800",
              paddingBottom: 48,
              paddingTop: 24
            }}
          >
            Would You Like To Add
          </Text>
          <MenuItem
            key={0}
            item={currentMenuItem}
            navigation={navigation}
            onPress={() => {setShowModal(false)}}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 24
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                width: "100%",
                borderRadius: 10,
                padding: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                clearMenuItemState().then(() => navigation.navigate("MenuScreen"));
              }}
            >
              <Text style={{
                fontSize: 24,
                fontWeight: "800",
                color: '#ffffff'
              }}>No Thanks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalContainer>
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
    paddingTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
})

export default withTheme(UpsellModal);
