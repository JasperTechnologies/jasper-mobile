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
  }

  extend type Mutation {
    setCurrentMenuCategory(menuCategory: MenuCategory): Boolean
    setCurrentMenuItem(menuItem: MenuItem): Boolean
    addItemToCart(menuItemForm: MenuItemForm): Boolean
    removeItemFrom(index: Int): Boolean
    clearCart: Boolean
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
    addItemToCart: async (_, { menuItemForm }, { cache }) => {
      const { cart } = await cache.readQuery({ query: GET_CART });
      const newCart = [...cart, menuItemForm];
      await cache.writeQuery({
        query: GET_CART,
        data: {
          cart: newCart
        }
      });
      return null;
    },
    removeItemFromCart: async (_, { index }, { cache }) => {
      const { cart } = await cache.readQuery({ query: GET_CART });
      let newCart = [...cart]
      newCart.splice(index, 1);
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
