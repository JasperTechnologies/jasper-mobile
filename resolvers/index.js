import gql from 'graphql-tag';
import {
  GET_MENU_ITEMS,
  GET_CURRENT_MENU_ITEMS,
  GET_CART,
  GET_CURRENT_MENU_ITEM
} from '../constants/graphql-query';

export const typeDefs = gql`
  extend type Query {
    cart: [MenuItemForm!]
    currentMenuCategory: MenuCategory!
    currentMenuItems: [MenuItem!]
    currentMenuItem: MenuItem!
    editingMenuItemForm: EditingMenuItemForm!
    isEditingMenuItem: Boolean!
  }

  extend type Mutation {
    setCurrentMenuCategory(menuCategory: MenuCategory): Boolean
    setCurrentMenuItem(menuItem: MenuItem): Boolean
    addOrReplaceItemToCart(menuItemForm: MenuItemForm): Boolean
    removeItemFromCart(index: Int): Boolean
    clearCart: Boolean
    clearEditingMenuItemState: Boolean
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
    addOrReplaceItemToCart: async (_, { menuItemForm }, { cache }) => {
      const { cart } = await cache.readQuery({ query: GET_CART });
      const newCart = [
        ...cart.filter((item) => {
          return item.form.formId !== menuItemForm.form.formId;
        }),
        menuItemForm
      ];
      await cache.writeQuery({
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
    removeItemFromCart: async (_, { index }, { cache }) => {
      const { cart } = await cache.readQuery({ query: GET_CART });
      const newCart = cart.filter((c, i) => {
        return i !== index;
      });
      console.log(index)
      await cache.writeQuery({
        query: GET_CART,
        data: {
          cart: newCart
        }
      });
      return null;
    }
  }
};
