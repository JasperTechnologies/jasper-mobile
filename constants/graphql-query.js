import gql from 'graphql-tag';

export const GET_MENU_ITEMS = gql`
query MenuItems{
  menuItems{
    id
    title
    description
    calories
    pictureURL
    price
    categories{
      id
      name
    }
  }
}
`;

export const GET_MENU_CATEGORIES = gql`
query GetUserCategories{
  user{
    menuCategories{
      id
      name
    }
  }
}
`;

export const GET_CURRENT_MENU_CATEGORY = gql`
query GetCurrentMenuCategory{
  currentMenuCategory @client{
    id
    name
  }
}
`;

export const GET_CURRENT_MENU_ITEMS = gql`
query GetCurrentMenuItems{
  currentMenuItems @client{
    id
    title
    description
    calories
    pictureURL
    price
    categories{
      id
      name
    }
  }
}
`;
