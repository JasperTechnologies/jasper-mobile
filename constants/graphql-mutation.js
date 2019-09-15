import gql from 'graphql-tag';

export const SET_CURRENT_MENU_CATEGORY = gql`
  mutation SetCurrentMenuCategory($menuCategory: MenuCategory) {
    setCurrentMenuCategory(menuCategory: $menuCategory) @client
  }
`;

export const SET_CURRENT_MENU_ITEM = gql`
  mutation SetCurrentMenuItem($menuItem: MenuItem) {
    setCurrentMenuItem(menuItem: $menuItem) @client
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($menuItemForm: MenuItemForm) {
    addItemToCart(menuItemForm: $menuItemForm) @client
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart @client
  }
`;
