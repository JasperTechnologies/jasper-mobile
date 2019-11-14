import React, { useState, useEffect } from "react"
import { StatusBar, StyleSheet, ScrollView, Text, View } from "react-native"
import v4 from 'uuid/v4';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { GET_CURRENT_MENU_ITEM } from '../constants/graphql-query';
import {
  ADD_OR_REPLACE_ITEM_TO_CART,
  CLEAR_MENU_ITEM_STATE,
  SET_UPSELLING_MENU_ITEM
} from '../constants/graphql-mutation';

import MenuItemOptions from '../components/MenuItemOptions';
import UpsellModal from '../components/UpsellModal';
import {
  centsToDollar,
  calculateTotalPrice
} from '../utilities/money';
import { isMenuItemReadyToAdd } from '../utilities/menu';

import {
  withTheme,
  ScreenContainer,
  Image,
  Container,
  IconButton,
  Stepper
} from "@draftbit/ui"
import FooterNavButton from "../components/FooterNavButton";

const getDefaultOptionValues = (options) => {
  if (!options) {
    return [];
  }
  return options.reduce((allOptionValues, option) => {
    return [...allOptionValues, ...option.optionValues.map(o => ({ ...o, optionId: option.id }))];
  }, []).reduce((list, optionValue) => {
    if (optionValue.isDefault) {
      list.push(optionValue);
    }
    return list;
  }, []);
};

const insertSelectedOptionValue = (options, selectedOptionValues, newOptionValue) => {
  // insert newOptionValue in correct order
  return options.reduce((list, option) => {
    const newList = [...list, ...selectedOptionValues.filter((ov => ov.optionId === option.id))];
    if (newOptionValue.optionId === option.id) {
      newList.push(newOptionValue);
    }
    return newList;
  }, []);
}

function MenuItemViewScreen({
  theme,
  navigation
}) {
  StatusBar.setBarStyle("light-content");
  const [form, setForm] = useState({
    quantity: 1,
    optionValues: []
  });
  const [ scrollView, setScrollView ] = useState(null);
  const [ showUpsellModal, setShowUpsellModal ] = useState(false);
  const [ setUpsellingMenuItem ] = useMutation(SET_UPSELLING_MENU_ITEM);
  const [ addOrReplaceItemToCart ] = useMutation(ADD_OR_REPLACE_ITEM_TO_CART);
  const [ clearMenuItemState ] = useMutation(CLEAR_MENU_ITEM_STATE);
  const [ getCurrentMenuItem, { called, loading, data: menuItemViewData = {} }] = useLazyQuery(GET_CURRENT_MENU_ITEM);

  const {
    currentMenuItem,
    isEditingMenuItem,
    isUpsellingMenuItem,
  } = menuItemViewData;

  useEffect(() => {
    getCurrentMenuItem();
  }, []);

  useEffect(() => {
    if (currentMenuItem) {
      if (isEditingMenuItem) {
        setForm(menuItemViewData.editingMenuItemForm);
      } else {
        setForm({
          ...form,
          optionValues: getDefaultOptionValues(currentMenuItem.options)
        });
      }
    }
  }, [currentMenuItem]);

  if (loading || !currentMenuItem) {
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

  this.handleCheckBoxButton = (optionValue, isSelected) => {
    if (isSelected) {
      const filteredOptions = form.optionValues.filter(o =>
        !(o.id === optionValue.id && o.optionId === optionValue.optionId)
      );
      setForm({
        ...form,
        optionValues: filteredOptions
      });
    } else {
      const { options } = currentMenuItem;
      setForm({
        ...form,
        optionValues: insertSelectedOptionValue(options, form.optionValues, optionValue)
      });
    }
  }

  this.handleRadioButton = (optionValue, isSelected) => {
    if (!isSelected) {
      const filteredOptions = form.optionValues.filter(o =>
        o.optionId !== optionValue.optionId
      );
      const { options } = currentMenuItem;
      setForm({
        ...form,
        optionValues: insertSelectedOptionValue(options, filteredOptions, optionValue)
      });
    }
  }


  this.handleBack = () => {
    clearMenuItemState().then(() => {
      if (isEditingMenuItem) {
        navigation.navigate("CheckoutScreen");
      } else {
        navigation.navigate("MenuScreen");
      }
    });
  }

  this.handleSubmit = () => {
    addOrReplaceItemToCart({
      variables: {
        menuItemForm: {
          ...currentMenuItem,
          __typename: 'MenuItemForm',
          form: {
            ...form,
            id: form.formId ? form.formId : v4(),
            __typename: 'EditingMenuItemForm',
            formId: form.formId ? form.formId : v4()
          }
        }
      },
      refetchQueries: ["GetCart"]
    }).then(() => {
      if (isEditingMenuItem) {
        clearMenuItemState().then(() => navigation.navigate("CheckoutScreen"));
      } else if (!isUpsellingMenuItem && currentMenuItem.menuItemToUpsell) {
        setUpsellingMenuItem({
          variables: {
            menuItem: currentMenuItem.menuItemToUpsell
          }
        }).then(() => {
          setShowUpsellModal(true);
          if (scrollView) {
            scrollView.scrollTo({ y: 0, animated: false });
          }
        });
      } else {
        clearMenuItemState().then(() => navigation.navigate("MenuScreen"));
      }
    });
  }

  this.renderOptionsView = () => {
    const { options, theme } = currentMenuItem;
    return <MenuItemOptions options={options} form={form} theme={theme}/>
  }

  return (
    <ScreenContainer scrollable={false}>
      <UpsellModal
        showModal={showUpsellModal}
        setShowModal={setShowUpsellModal}
        navigation={navigation}
      />
      <Container style={styles.MainItemView_Container}>
        <Container style={styles.MenuItemNav_Container} elevation={0}>
          <IconButton
            style={styles.Touchable_Back}
            icon="MaterialIcons/arrow-back"
            size={50}
            color={theme.colors.primary}
            onPress={() => {
              this.handleBack();
            }}
          />
        </Container>
        <Image style={styles.MenuItem_Image} source={currentMenuItem.pictureURL} resizeMode="cover" />
        <ScrollView
          contentContainerStyle={styles.ScrollView_Main}
          showsVerticalScrollIndicator={false}
          ref={ref => setScrollView(ref)}
        >
          <Container style={styles.Invisible_View} />
          <Container style={{
            backgroundColor: theme.colors.background,
            paddingBottom: 200
          }}>
            <Container style={styles.MenuItemName_Container}>
              <Text
                style={[
                  theme.typography.headline1,
                  {
                    color: theme.colors.strong
                  }
                ]}
              >
                {currentMenuItem.title}
              </Text>
            </Container>
            <Container style={styles.Description_Container}>
                <Text
                  style={[
                    theme.typography.headline4,
                    {
                      color: theme.colors.medium
                    }
                  ]}
                >
                  {currentMenuItem.description}
                </Text>
                {currentMenuItem.calories &&
                  <Text
                    style={[
                      theme.typography.headline4,
                      {
                        color: theme.colors.light
                      }
                    ]}
                  >
                    {currentMenuItem.calories} Cal.
                  </Text>
                }
            </Container>
            {this.renderOptionsView()}
            <Container style={styles.Stepper_Container}>
              <Stepper onChange={this.updateQuantity} value={form.quantity} style={styles.Stepper} />
            </Container>
          </Container>
        </ScrollView>
        <FooterNavButton
          text={`Add ${form.quantity} To Cart $${centsToDollar(calculateTotalPrice(currentMenuItem.price, form.quantity, form.optionValues))}`}
          onPress={this.handleSubmit}
          disabled={!isMenuItemReadyToAdd(currentMenuItem.options, form.optionValues)}
        />
      </Container>
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
    width: "100%",
    alignItems: "flex-start",
    height: 80
  },
  Touchable_Back: {
    padding: 18
  },
  Container_n2x: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
    flexGrow: 1
  },
  MenuItemName_Container: {
    paddingVertical: 32,
    paddingHorizontal: 48
  },
  Description_Container: {
    paddingHorizontal: 48,
    paddingBottom: 32
  },
  MenuItem_Image: {
    width: "100%",
    height: 300,
    top: 80,
    position: "absolute"
  },
  ScrollView_Main: {},
  Invisible_View: {
    height: 300
  },
  Stepper: {
    width: 126,
    height: 42
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
  Stepper_Container: {
    paddingTop: 48,
    alignItems: "center"
  }
})

export default withTheme(MenuItemViewScreen);
