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

export const REMOVE_ITEM_FROM_CART = gql`
mutation RemoveItemFromCart($index: Int) {
  removeItemFromCart(index: Int) @client
}
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart @client
  }
`;
