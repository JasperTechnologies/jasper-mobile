import gql from 'graphql-tag';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      locations {
        cloverMetaData{
          merchantId
        }
      }
    }
  }
}
`;

export const ADD_ACCESS_TOKEN_TO_LOCATION = gql`
mutation addAccessTokenToLocation($merchantId: String!, $accessToken: String!) {
  addAccessTokenToLocation(merchantId: $merchantId, code: $accessToken) {
    id
    cloverMetaData {
      merchantId
    }
  }
}
`

// create order, mainly for logging purpose
export const CREATE_ORDER = gql`
mutation createOrder {
  createOrder {
    id
  }
}
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($orderId: ID!, $lineItems: [LineItemInput]!) {
    updateOrder(orderId: $orderId, lineItems: $lineItems) {
      code
    }
  }
`;

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

export const SET_TIP_PERCENTAGE = gql`
  mutation SetTipPercentage($tipPercentage: Int) {
    setTipPercentage(tipPercentage: $tipPercentage) @client
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

export const CLEAR_EDITING_MENU_ITEM_STATE = gql`
  mutation ClearEditingMenuItemState {
    clearEditingMenuItemState @client
  }
`;

export const SET_CHECKOUT_IN_PROGRESS = gql`
  mutation SetCheckoutInProgress {
    setCheckoutInProgress @client
  }
`;

export const SET_CHECKOUT_READY = gql`
  mutation SetCheckoutReady {
    setCheckoutReady @client
  }
`;

export const SET_CHECKOUT_CANCELING = gql`
  mutation SetCheckoutCanceling {
    setCheckoutCanceling @client
  }
`;

export const SET_CHECKOUT_SUCCESS = gql`
  mutation SetCheckoutSuccess {
    setCheckoutSuccess @client
  }
`;

export const CHECKOUT_COMPLETE = gql`
  mutation checkoutComplete {
    checkoutComplete @client
  }
`;

export const PURCHASE = gql`
  mutation purchase($deviceId: ID!, $amountInCents: Int!) {
    purchase(deviceId: $deviceId, amountInCents: $amountInCents)
  }
`;
