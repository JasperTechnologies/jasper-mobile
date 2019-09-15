import React, { useState, useEffect } from "react"
import { StatusBar, StyleSheet, View, ScrollView, Text, FlatList } from "react-native"
import v4 from 'uuid/v4';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_CURRENT_MENU_ITEM
} from '../constants/graphql-query';
import {
  addItemToCart,
  addEditedMenuItem,
  clearEditingMenuItem
} from '../reducers/reducer';
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

const getDefaultOptions = (options) => {
  if (!options) {
    return [];
  }
  return options.reduce((list, option) => {
    if (option.default && !list.find(o => o.type === option.type)) {
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
    options: []
  });
  const { data: { currentMenuItem }, loading: loadingCurrentMenuItem } = useQuery(
    GET_CURRENT_MENU_ITEM,
    {
      onCompleted: ({ currentMenuItem }) => {
        setForm({
          ...form,
          options: getDefaultOptions(currentMenuItem.options)
        });
      }
    }
  );

  if (loadingCurrentMenuItem || !currentMenuItem) {
    return null;
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
                optionValue: optionValue,
                color: "medium",
                title: `${optionValue.title} ${optionValue.price ? `($${centsToDollar(optionValue.price)})` : ''}`
              })
            ) : []}
            renderItem={({ item }) => {
              const isSelected = Boolean(form.options.find(o => o.id === item.option.id));
              return (
                <RowBodySwitch
                  title={item.title}
                  color={item.color}
                  style={{ marginBottom: theme.spacing.small }} value={isSelected}
                  onValueChange={() => {this.handleSwitchOption(item.optionValue, isSelected)}}
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
              {`Add ${form.quantity} To Cart $${centsToDollar(calculateTotalPrice(currentMenuItem.price, form.quantity, form.options))}`}
            </Button>
          </View>
        </Container>
      </InactiveDetector>
    </ScreenContainer>
  );
}

class MenuItemViewScreen1 extends React.Component {
  constructor(props) {
    super(props);

    const { isEditingMenuItem } = props;
    const DEFAULT_FORM = {
      quantity: 1,
      options: getDefaultOptions(props.currentMenuItem.options)
    };
    this.state = {
      theme: Object.assign(props.theme, screenTheme),
      form: isEditingMenuItem ? props.editingMenuItemForm : DEFAULT_FORM
    }
  }

  updateQuantity = (newQuantity) => {
    if (newQuantity && newQuantity < 20) {
      this.setState({
        form: {
          ...this.state.form,
          quantity: newQuantity
        }
      });
    }
  }

  handleBack = () => {
    const { isEditingMenuItem } = this.props;
    if (isEditingMenuItem) {
      this.props.clearEditingMenuItem();
      this.props.navigation.navigate("CheckoutScreen");
    } else {
      this.props.navigation.navigate("MenuScreen");
    }
  }

  handleSubmit = () => {
    const { isEditingMenuItem } = this.props;
    if (isEditingMenuItem) {
      this.addEditedMenuItem();
      this.props.navigation.navigate("CheckoutScreen");
    } else {
      this.handleAddItemToCart();
      this.props.navigation.navigate("MenuScreen");
    }
  }

  addEditedMenuItem = () => {
    const { currentMenuItem } = this.props;
    const { form } = this.state;
    this.props.addEditedMenuItem({
      ...currentMenuItem,
      form
    });
  }

  handleAddItemToCart = () => {
    const { currentMenuItem } = this.props;
    const { form } = this.state;
    this.props.addItemToCart({
      ...currentMenuItem,
      form: {
        ...form,
        formId: v4()
      }
    });
  }

  handleSwitchOption = (option, isSelected) => {
    const { form } = this.state;
    if (isSelected) {
      const filteredOptions = form.options.filter(o => o.id !== option.id);
      this.setState({
        form: {
          ...this.state.form,
          options: filteredOptions
        }
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          options: [...form.options, option]
        }
      });
    }
  }

  renderOptionsView = () => {
    const { theme, form } = this.state;
    const { currentMenuItem } = this.props;
    const optionsByType = getOptionsByType(currentMenuItem.options);
    const types = Object.keys(optionsByType);
    return types.map((type, index) => {
      const options = optionsByType[type];
      return (
        <View key={`${type}-${index}`} style={styles.Option_Type_Container}>
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
              {type}
            </Text>
          </View>
          <FlatList
            style={styles.Option_List}
            data={options ? options.map(
              (option) => ({
                option,
                color: "medium",
                title: `${option.name} ${option.price ? `($${centsToDollar(option.price)})` : ''}`
              })
            ) : []}
            renderItem={({ item }) => {
              const isSelected = Boolean(form.options.find(o => o.id === item.option.id));
              return (
                <RowBodySwitch
                  title={item.title}
                  color={item.color}
                  style={{ marginBottom: theme.spacing.small }} value={isSelected}
                  onValueChange={() => {this.handleSwitchOption(item.option, isSelected)}}
                />
              );
            }}
            keyExtractor={(_item, idx) => idx.toString()}
          />
        </View>
      );
    });
  }

  render() {
    const { theme, form } = this.state;
    const { currentMenuItem } = this.props;
    return (
      <ScreenContainer hasSafeArea={false} scrollable={false} style={styles.Root_npc}>
        <InactiveDetector navigation={this.props.navigation}>
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
            <Image style={styles.MenuItem_Image} source={currentMenuItem.imageURL} resizeMode="cover" />
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
                {`Add ${form.quantity} To Cart $${centsToDollar(calculateTotalPrice(currentMenuItem.price, form.quantity, form.options))}`}
              </Button>
            </View>
          </Container>
        </InactiveDetector>
      </ScreenContainer>
    )
  }
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

// const mapStateToProps = state => {
//   return {
//     currentMenuItem: state.currentMenuItem,
//     isEditingMenuItem: state.isEditingMenuItem,
//     editingMenuItemForm: state.editingMenuItemForm
//   };
// };
//
// const mapDispatchToProps = {
//   addItemToCart,
//   addEditedMenuItem,
//   clearEditingMenuItem
// };

export default withTheme(MenuItemViewScreen);
