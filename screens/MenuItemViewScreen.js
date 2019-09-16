import React, { useState, useEffect } from "react"
import { StatusBar, StyleSheet, View, ScrollView, Text, FlatList } from "react-native"
import v4 from 'uuid/v4';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_CURRENT_MENU_ITEM
} from '../constants/graphql-query';
import {
  ADD_OR_REPLACE_ITEM_TO_CART,
  CLEAR_EDITING_MENU_ITEM_STATE
} from '../constants/graphql-mutation';

import InactiveDetector from '../components/InactiveDetector';
import { yummy as screenTheme } from '../config/Themes';
import {
  centsToDollar,
  calculateTotalPrice
} from '../utilities/money';
import {
  getOptionsByType
} from '../utilities/menu';

import { connect } from 'react-redux';
import {
  withTheme,
  ScreenContainer,
  Image,
  Container,
  RowBodySwitch,
  IconButton,
  Stepper,
  Button,
  Touchable
} from "@draftbit/ui"

const getDefaultOptionValues = (options) => {
  if (!options) {
    return [];
  }
  return options.reduce((allOptionValues, option) => {
    return [...allOptionValues, ...option.optionValues];
  }, []).reduce((list, optionValue) => {
    if (optionValue.default) {
      list.push(option);
    }
    return list;
  }, []);
};

function MenuItemViewScreen({
  theme,
  navigation
}) {
  StatusBar.setBarStyle("light-content");
  const [form, setForm] = useState({
    quantity: 1,
    optionValues: []
  });
  const [ addOrReplaceItemToCart ] = useMutation(ADD_OR_REPLACE_ITEM_TO_CART);
  const [ clearEditingMenuItemState ] = useMutation(CLEAR_EDITING_MENU_ITEM_STATE);
  const {
    data: {
      currentMenuItem,
      isEditingMenuItem,
      editingMenuItemForm
    },
    loading: loadingCurrentMenuItem
  } = useQuery(
    GET_CURRENT_MENU_ITEM,
    {
      onCompleted: ({
        currentMenuItem,
        isEditingMenuItem,
        editingMenuItemForm
      }) => {
        if (isEditingMenuItem) {
          setForm(editingMenuItemForm);
        } else {
          setForm({
            ...form,
            optionValues: getDefaultOptionValues(currentMenuItem.options)
          });
        }

      }
    }
  );

  if (loadingCurrentMenuItem || !currentMenuItem) {
    return null;
  }

  this.updateQuantity = (newQuantity) => {
    if (newQuantity && newQuantity < 20) {
      setForm({
        ...form,
        quantity: newQuantity
      });
    }
  }

  this.handleSwitchOption = (optionValue, isSelected) => {
    if (isSelected) {
      const filteredOptions = form.optionValues.filter(o =>
        !(o.id === optionValue.id && o.optionId === optionValue.optionId)
      );
      setForm({
        ...form,
        optionValues: filteredOptions
      });
    } else {
      setForm({
        ...form,
        optionValues: [...form.optionValues, optionValue]
      });
    }
  }

  this.handleBack = () => {
    clearEditingMenuItemState();
    if (isEditingMenuItem) {
      navigation.navigate("CheckoutScreen");
    } else {
      navigation.navigate("MenuScreen");
    }
  }

  this.handleSubmit = () => {
    addOrReplaceItemToCart({
      variables: {
        menuItemForm: {
          ...currentMenuItem,
          form: {
            ...form,
            __typename: 'EditingMenuItemForm',
            formId: form.formId ? form.formId : v4()
          }
        }
      }
    });
    clearEditingMenuItemState();
    if (isEditingMenuItem) {
      navigation.navigate("CheckoutScreen");
    } else {
      navigation.navigate("MenuScreen");
    }
  }

  this.renderOptionsView = () => {
    const { options } = currentMenuItem;
    return options.map((option, index) => {
      return (
        <View key={`${option.title}-${index}`} style={styles.Option_Type_Container}>
          <View style={styles.Option_Type_Header}>
            <Text
              style={[
                styles.Text_nwi,
                theme.typography.headline4,
                {
                  color: theme.colors.strong
                }
              ]}
            >
              {option.title}
            </Text>
          </View>
          <FlatList
            style={styles.Option_List}
            data={option.optionValues ? option.optionValues.map(
              (optionValue) => ({
                optionValueForm: {
                  ...optionValue,
                  optionId: option.id,
                },
                color: "medium",
                title: `${optionValue.title} ${optionValue.price ? `($${centsToDollar(optionValue.price)})` : ''}`
              })
            ) : []}
            renderItem={({ item }) => {
              const isSelected = Boolean(form.optionValues.find(o => o.id === item.optionValueForm.id && option.id === item.optionValueForm.optionId));
              return (
                <RowBodySwitch
                  title={item.title}
                  color={item.color}
                  style={{ marginBottom: theme.spacing.small }} value={isSelected}
                  onValueChange={() => {
                    this.handleSwitchOption(item.optionValueForm, isSelected)
                  }}
                />
              );
            }}
            keyExtractor={(_item, idx) => idx.toString()}
          />
        </View>
      );
    });
  }

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_npc}>
      <InactiveDetector navigation={navigation}>
        <Container style={styles.MainItemView_Container}>
          <Container style={styles.MenuItemNav_Container} elevation={0}>
            <IconButton
              style={styles.Touchable_Back}
              icon="MaterialIcons/arrow-back"
              size={32}
              color={theme.colors.primary}
              onPress={() => {
                this.handleBack();
              }}
            />
          </Container>
          <Image style={styles.MenuItem_Image} source={currentMenuItem.pictureURL} resizeMode="cover" />
          <Container style={styles.MenuItemName_Container} useThemeGutterPadding={true}>
            <Text
              style={[
                styles.Text_nwi,
                theme.typography.headline4,
                {
                  color: theme.colors.strong
                }
              ]}
            >
              {currentMenuItem.title}
            </Text>
          </Container>
          <ScrollView
            contentContainerStyle={styles.ScrollView_Main}
            showsVerticalScrollIndicator={true}
          >
            <Container style={styles.Description_Container} useThemeGutterPadding={true}>
                <Text
                  style={[
                    styles.Text_nn7,
                    theme.typography.subtitle2,
                    {
                      color: theme.colors.medium
                    }
                  ]}
                >
                  {currentMenuItem.description}
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
                  {currentMenuItem.calories} Cal.
                </Text>
            </Container>
            {this.renderOptionsView()}
            <Container style={styles.Stepper_Container}>
              <Stepper onChange={this.updateQuantity} value={form.quantity} style={styles.Stepper_nrj} />
            </Container>
          </ScrollView>
          <View
            style={styles.Container_Footer}
            elevation={0}
            useThemeGutterPadding={true}
          >
            <Button
              style={styles.Button_n5x}
              type="solid"
              color={theme.colors.primary}
              onPress={() => {
                this.handleSubmit();
              }}
            >
              {`Add ${form.quantity} To Cart $${centsToDollar(calculateTotalPrice(currentMenuItem.price, form.quantity, form.optionValues))}`}
            </Button>
          </View>
        </Container>
      </InactiveDetector>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  Button_n5x: {
    width: "100%",
    height: 48
  },
  MainItemView_Container: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  MenuItemNav_Container: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  Container_n2x: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
    flexGrow: 1
  },
  MenuItemName_Container: {
    paddingVertical: 16
  },
  MenuItem_Image: {
    width: "100%",
    height: "35%"
  },
  ScrollView_Main: {},
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
    textAlign: "auto",
    width: "100%",
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
  Touchable_Back: {
    alignSelf: "flex-start",
    margin: 24
  },
  Option_Type_Container: {
    width: "100%"
  },
  Option_Type_Header: {
    width: "100%",
    backgroundColor: "#eee",
    padding: 16
  },
  Option_List: {
    width: "100%"
  },
  Container_Footer: {
    width: "100%",
    padding: 10
  },
  Description_Container: {
    paddingBottom: 16
  },
  Stepper_Container: {
    alignItems: "center"
  }
})

export default withTheme(MenuItemViewScreen);
