import gql from 'graphql-tag';

export const SET_CURRENT_MENU_CATEGORY = gql`
  mutation SetCurrentMenuCategory($menuCategory: MenuCategory!) {
    setCurrentMenuCategory(menuCategory: $menuCategory) @client
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart @client
  }
`;
