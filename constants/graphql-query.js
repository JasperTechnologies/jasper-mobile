import gql from 'graphql-tag';

export const GET_MENU_ITEMS = gql`
query MenuItems{
  menuItems{
    id
    paymentProcessorId
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
      maxSelections
      optionValues{
        id
        price
        title
        priority
        isDefault
      }
    }
    categories{
      id
      name
    }
  }
}
`;

export const GET_LOCATION = gql`
query GetLocation{
  location{
    name
    pictureURL
    taxes{
      paymentProcessorId
      taxType
      taxAmount
    }
  }
}
`;

export const GET_MENU_CATEGORIES = gql`
query GetUserCategories{
  location{
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
    paymentProcessorId
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
      maxSelections
      optionValues{
        id
        price
        title
        priority
        isDefault
      }
    }
    form{
      formId
      quantity
      optionValues{
        id
        optionId
        price
        title
        priority
      }
    }
  }
}
`;

export const GET_CURRENT_MENU_ITEMS = gql`
query GetCurrentMenuItems{
  currentMenuItems @client{
    id
    paymentProcessorId
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
      maxSelections
      optionValues{
        id
        price
        title
        priority
        isDefault
      }
    }
  }
}
`;

export const GET_CURRENT_MENU_ITEM = gql`
query GetCurrentMenuItem{
  isEditingMenuItem @client
  editingMenuItemForm @client{
    formId
    quantity
    optionValues{
      id
      optionId
      price
      title
      priority
    }
  }
  currentMenuItem @client{
    id
    paymentProcessorId
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
      maxSelections
      optionValues{
        id
        price
        title
        priority
        isDefault
      }
    }
  }
}
`;

export const GET_EDITING_MENU_ITEM = gql`
query GetEditingMenuItem{
  isEditingMenuItem @client
  editingMenuItemForm @client{
    quantity
    optionValues{
      id
      formId
      price
      title
      priority
    }
  }
}
`;

export const GET_TIP_PERCENTAGE = gql`
query GetTipPercentage{
  tipPercentage @client
}
`;

export const GET_CHECKOUT_STATE = gql`
query GetCheckoutState{
  checkoutState @client
}
`;
