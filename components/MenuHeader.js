import React from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { connect } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { yummy as screenTheme } from "../config/Themes"
import MenuHeaderItem from "./MenuHeaderItem"
import {
  GET_MENU_CATEGORIES,
  GET_CURRENT_MENU_CATEGORY,
  GET_CURRENT_MENU_ITEMS
} from '../constants/graphql-query';
import { SET_CURRENT_MENU_CATEGORY } from '../constants/graphql-mutation';
import {
  withTheme,
  Touchable,
  Icon,
} from "@draftbit/ui";
function HeaderItems() {
  const [ setCurrentMenuCategory ] = useMutation(SET_CURRENT_MENU_CATEGORY);
  const { data: menuCategoriesData, loading, error } = useQuery(
    GET_MENU_CATEGORIES,
    {
      onCompleted: (res) => {
        const { user: { menuCategories } } = res;
        if (menuCategories.length) {
          setCurrentMenuCategory({
            variables: {
              menuCategory: menuCategories[0]
            }
          });
        }
      }
    }

  );
  const { data: currentMenuCategoryData } = useQuery(GET_CURRENT_MENU_CATEGORY);
  if (loading || error) {
    return null;
  }

  const currentMenuCategory = 0;
  const { user: { menuCategories } } = menuCategoriesData;
  return menuCategories.map((category, index) => <MenuHeaderItem
    key={index}
    name={category.name}
    selected={currentMenuCategoryData.currentMenuCategory && currentMenuCategoryData.currentMenuCategory.id === category.id}
    onPress={() => {
      setCurrentMenuCategory({
        variables: {
          menuCategory: category
        }
      });
    }}
    />
  );
}

class MenuHeader extends React.Component {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle("light-content")

    this.state = {
			theme: Object.assign(props.theme, screenTheme),
			selected: 0
    }
	}

  render() {
    const { theme } = this.state;
    return (
			<View style={styles.Menu_Header_Container}>
				<View style={styles.Menu_Category_Container}>
          <HeaderItems />
				</View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  Menu_Header_Container: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
  },
  Menu_Category_Container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20
  },
  ScrollView_na3: {
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 150,
    paddingBottom: 200,
    flexWrap: "wrap"
  }
})

export default withTheme(MenuHeader);
