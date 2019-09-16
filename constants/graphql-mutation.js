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

export const SET_EDITING_MENU_ITEM = gql`
  mutation SetEditingMenuItem($editingMenuItemForm: EditingMenuItemForm, $menuItem: MenuItem) {
    setEditingMenuItem(editingMenuItemForm: $editingMenuItemForm, menuItem: $menuItem) @client
  }
`;

export const ADD_OR_REPLACE_ITEM_TO_CART = gql`
  mutation AddOrReplaceItemToCart($menuItemForm: MenuItemForm) {
    addOrReplaceItemToCart(menuItemForm: $menuItemForm) @client
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
mutation RemoveItemFromCart($index: Int) {
  removeItemFromCart(index: $index) @client
}
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart @client
  }
`;
