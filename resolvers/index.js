import gql from 'graphql-tag';
import {
  GET_MENU_ITEMS,
  GET_CURRENT_MENU_ITEMS,
  GET_CART,
  GET_CURRENT_MENU_ITEM,
  GET_CHECKOUT_STATE,
  GET_NEWLY_ADDED_ITEMS
} from '../constants/graphql-query';

export const typeDefs = gql`
  extend type Query {
    cart: [MenuItemForm!]
    currentMenuCategory: MenuCategory!
    currentMenuItems: [MenuItem!]
    newlyAddedItems: [MenuItemForm]
    currentMenuItem: MenuItem!
    editingMenuItemForm: EditingMenuItemForm!
    isEditingMenuItem: Boolean!
    isUpsellingMenuItem: Boolean!
    tipPercentage: Int!
    checkoutState: CheckoutState
  }

  extend type Mutation {
    setCurrentMenuCategory(menuCategory: MenuCategory): Boolean
    setCurrentMenuItem(menuItem: MenuItem): Boolean
    setTipPercentage(percentIndex: Int): Int
    addOrReplaceItemToCart(menuItemForm: MenuItemForm): Boolean
    removeItemFromCart(index: Int): Boolean
    clearCart: Boolean
    clearEditingMenuItemState: Boolean
    setCheckoutInProgress: Boolean
    setCheckoutReady: Boolean
    setCheckoutCanceling: Boolean
    setCheckoutSuccess: Boolean
    setEditingMenuItem: Boolean
    purchase(deviceId: String, amountInCents: Int): String
    clearUpsellingMenuItemState: Boolean
  }
`;


export const resolvers = {
  Mutation: {
    setCurrentMenuCategory: async (_, { menuCategory }, { cache }) => {
      await cache.writeData(
        {
          data: {
            currentMenuCategory: menuCategory
          }
        }
      );
      const { menuItems } = await cache.readQuery({ query: GET_MENU_ITEMS });
      const newCurrentMenuItems = menuItems.reduce((list, menu) => {
        if ((menu.categories || []).find(category => category.name === menuCategory.name)) {
          list.push(menu);
        }
        return list;
      }, []);

      await cache.writeQuery({
        query: GET_CURRENT_MENU_ITEMS,
        data: {
          currentMenuItems: newCurrentMenuItems
        }
      });
      return null;
    },
    setEditingMenuItem: async (_, { menuItem, editingMenuItemForm }, { cache }) => {
      await cache.writeData(
        {
          data: {
            isEditingMenuItem: true,
            currentMenuItem: menuItem,
            editingMenuItemForm: editingMenuItemForm
          }
        }
      );
      return true;
    },
    setUpsellingMenuItem: async (_, { menuItem }, { cache }) => {
      await cache.writeData(
        {
          data: {
            isUpsellingMenuItem: true,
            currentMenuItem: menuItem
          }
        }
      );
      return null;
    },
    clearMenuItemState: async (_, __, { cache }) => {
      // cleaning state
      await cache.writeData(
        {
          data: {
            isUpsellingMenuItem: false,
            isEditingMenuItem: false,
            currentMenuItem: null,
            editingMenuItemForm: null
          }
        }
      );
      return null;
    },
    setCurrentMenuItem: async (_, { menuItem }, { cache }) => {
      await cache.writeData(
        {
          data: {
            currentMenuItem: menuItem
          }
        }
      );
      return null;
    },
    clearCart: async (_, __, { cache }) => {
      await cache.writeData(
        {
          data: {
            cart: []
          }
        }
      );
      return null;
    },
    addOrReplaceItemToCart: async (_, { menuItemForm }, { cache }) => {
      const { cart } = await cache.readQuery({ query: GET_CART });
      const { newlyAddedItems } = await cache.readQuery({ query: GET_NEWLY_ADDED_ITEMS });
      const filteredCart = cart.filter((item) => {
        return item.form.formId !== menuItemForm.form.formId;
      });
      const newCart = [
        ...filteredCart,
        menuItemForm
      ];

      const isAdded = filteredCart.length < cart.length;
      const newlyAddedItemsList = [ ...newlyAddedItems ];
      if (isAdded) {
        newlyAddedItemsList.push(menuItemForm);
      }
      await cache.writeData({
        data: {
          cart: newCart,
          newlyAddedItems: newlyAddedItemsList
        }
      });
      return null;
    },
    clearEditingMenuItemState: async (_, __, { cache }) => {
      // cleaning state
      await cache.writeData(
        {
          data: {
            isEditingMenuItem: false,
            currentMenuItem: null,
            editingMenuItemForm: null
          }
        }
      );
      return null;
    },
    removeItemFromCart: async (__, { index }, { cache }) => {
      const { cart } = await cache.readQuery({ query: GET_CART });
      const newCart = cart.filter((c, i) => {
        return i !== index;
      });
      await cache.writeQuery({
        query: GET_CART,
        data: {
          cart: newCart
        }
      });
      return null;
    },
    setTipPercentage: async (_, { tipPercentage }, { cache }) => {
      await cache.writeData({
        data: {
          tipPercentage: tipPercentage
        }
      });
      return null;
    },
    setCheckoutInProgress: async (_, __, { cache }) => {
      const { checkout } = await cache.readQuery({ query: GET_CHECKOUT_STATE });
      await cache.writeData(
        {
          data: {
            checkoutState: "IN_PROGRESS"
          }
        }
      );
      return null;
    },
    setCheckoutReady: async (_, __, { cache }) => {
      const { checkout } = await cache.readQuery({ query: GET_CHECKOUT_STATE });
      await cache.writeData(
        {
          data: {
            checkoutState: "READY"
          }
        }
      );
      return null;
    },
    setCheckoutCanceling: async (_, __, { cache }) => {
      const { checkout } = await cache.readQuery({ query: GET_CHECKOUT_STATE });
      await cache.writeData(
        {
          data: {
            checkoutState: "CANCELING"
          }
        }
      );
      return null;
    },
    setCheckoutSuccess: async (_, __, { cache }) => {
      const { checkout } = await cache.readQuery({ query: GET_CHECKOUT_STATE });
      await cache.writeData(
        {
          data: {
            checkoutState: "SUCCESS"
          }
        }
      );
      return null;
    },
    checkoutComplete: async (_, __, { cache }) => {
      const { checkout } = await cache.readQuery({ query: GET_CHECKOUT_STATE });
      await cache.writeData(
        {
          data: {
            checkout: {
              ...checkout,
              status: ""
            },
            cart: []
          }
        }
      );
      return null;
    },
    setPaymentProcessorStatus: async (_, { status }, { cache }) => {
      await cache.writeData(
        {
          data: {
            paymentProcessorStatus: status
          }
        }
      );
      return null;
    },
    setOrderType: async (_, { orderType }, { cache }) => {
      await cache.writeData(
        {
          data: {
            orderType
          }
        }
      );
      return null;
    },
  }
};
