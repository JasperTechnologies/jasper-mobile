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
        pictureURL
        price
        title
        priority
        isDefault
        paymentProcessorId
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

export const GET_PAYMENT_PROCESSOR = gql`
query GetPaymentProcessor{
  location{
    cloverMetaData{
      merchantId
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
        pictureURL
        price
        title
        priority
        isDefault
        paymentProcessorId
      }
    }
    form{
      formId
      quantity
      optionValues{
        id
        pictureURL
        optionId
        price
        title
        priority
        paymentProcessorId
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
        pictureURL
        price
        title
        priority
        isDefault
        paymentProcessorId
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
      pictureURL
      optionId
      price
      title
      priority
      paymentProcessorId
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
        pictureURL
        price
        title
        priority
        isDefault
        paymentProcessorId
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
      pictureURL
      formId
      price
      title
      priority
      paymentProcessorId
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
