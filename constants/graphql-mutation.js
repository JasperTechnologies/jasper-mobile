import gql from 'graphql-tag';

export const SET_CURRENT_MENU_CATEGORY = gql`
  mutation setCurrentMenuCategory($menuCategory: MenuCategory!) {
    setCurrentMenuCategory(menuCategory: $menuCategory) @client
  }
`;
