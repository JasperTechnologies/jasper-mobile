import gql from 'graphql-tag';
import {
  GET_MENU_ITEMS,
  GET_CURRENT_MENU_ITEMS,
  GET_CART,
  GET_CURRENT_MENU_ITEM,
  GET_CHECKOUT_STATE
} from '../constants/graphql-query';

export const typeDefs = gql`
  extend type Query {
    cart: [MenuItemForm!]
    currentMenuCategory: MenuCategory!
    currentMenuItems: [MenuItem!]
    currentMenuItem: MenuItem!
    editingMenuItemForm: EditingMenuItemForm!
    isEditingMenuItem: Boolean!
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
    purchase(deviceId: String, amountInCents: Int): String
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
    addOrReplaceItemToCart: async (_, { menuItemForm }, { client }) => {
      const { cart } = await client.readQuery({ query: GET_CART });
      const newCart = [
        ...cart.filter((item) => {
          return item.form.formId !== menuItemForm.form.formId;
        }),
        menuItemForm
      ];
      await client.writeQuery({
        query: GET_CART,
        data: {
          cart: newCart
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
    }
  }
};
