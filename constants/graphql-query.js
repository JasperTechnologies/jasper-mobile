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
    options{
      id
      title
      priority
      required
      optionValues{
        price
        title
        priority
      }
    }
    categories{
      id
      name
    }
  }
}
`;

export const GET_USER = gql`
query GetUser{
  user{
    name
    pictureURL
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

export const GET_CART = gql`
query GetCart{
  cart @client{
    id
    title
    description
    calories
    pictureURL
    price
    options{
      id
      name
      type
      default
      price
    }
    categories{
      id
      name
    }
    form{
      formId
      quantity
      options{
        id

      }
    }
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
    options{
      id
      title
      priority
      required
      optionValues{
        price
        title
        priority
      }
    }
  }
}
`;

export const GET_CURRENT_MENU_ITEM = gql`
query GetCurrentMenuItem{
  currentMenuItem @client{
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
    options{
      id
      title
      priority
      required
      optionValues{
        price
        title
        priority
      }
    }
  }
}
`;
