export const UPDATE_CART = 'UPDATE_CART';
export const UPDATE_CURRENT_MENU_ITEM_INDEX = 'UPDATE_CURRENT_MENU_ITEM_INDEX'

export default function reducer(state = { cart: [], menuItems: listOfBoba, currentMenuItemIndex: 0 }, action) {
  switch (action.type) {
    case UPDATE_CART:
			return { ...state, cart: action.newCart };
		case UPDATE_CURRENT_MENU_ITEM_INDEX:
			return { ...state, currentMenuItemIndex: action.index}
    default:
      return state;
  }
}

export function updateCart(newCart) {
  return {
    type: UPDATE_CART,
    newCart
  };
}

export function updateCurrentMenuItemIndex(index) {
  return {
    type: UPDATE_CURRENT_MENU_ITEM_INDEX,
    index
  };
}

const listOfBoba = [
  {
    title: "Bubble Tea",
    description: "Served ice cold with chewy tapioca balls and an organic base of green and black tea",
    price: 6.99,
    calories: 400,
    imageURL: "https://danielfooddiary.com/wp-content/uploads/2018/07/taiwanbubbletea3.jpg"
  },
  {
    title: "Avocado Matcha Boba Tea",
    description: "When the antioxidant power of matcha meets the creaminess of avocado, you’ve got a boba milk tea that you won’t want to refuse!",
    price: 9.99,
    calories: 620,
    imageURL: "https://i.pinimg.com/originals/45/e7/b1/45e7b1d5890326bcf1b53dba1828053f.jpg"
  },
  {
    title: "Thai Boba Tea",
    description: "Thai Iced Tea with Boba is simple to make and so much fun to drink, with just enough half and half to cool the burn so you can finish that bowl of spicy curry.",
    price: 7.99,
    calories: 320,
    imageURL: "https://i.pinimg.com/originals/8e/7d/18/8e7d180fc1d9085bcb91b1d262cef9fd.jpg"
  },
  {
    title: "Popcorn Tea",
    description: "This tea is made from green tea and toasted rice. The toasted rice gives it the popcorn-like flavor.",
    price: 7.99,
    calories: 510,
    imageURL: "https://adventuresincooking.com/wp-content/uploads/2011/03/Jasmine-Green-Milk-Tea-Boba-by-Eva-Kosmas-Flores-4-500x375.jpg"
  },
  {
    title: "Taro B",
    description: "This delicious purple tea is made with taro root and tastes creamy but not too sweet.  Many people swear it tastes just like cookies and cream.",
    price: 9.99,
    calories: 810,
    imageURL: "https://www.organicfacts.net/wp-content/uploads/tarobubbletea-1.jpg"
  },
  {
    title: "Honeydew Boba",
    description: "Honeydew flavor may be mixed with tea and cream to make a hot drink or blended with ice in a blender to make an ice drink.",
    price: 8.99,
    calories: 560,
    imageURL: "https://res.cloudinary.com/amoretti/image/upload/v1541013602/honeydew-boba_1350x758.jpg"
  },
  {
    title: "Coconut Bubble Tea",
    description: "Pure coconut water with a little fruit nectar added and some “toppings” can make a delicious, healthy drink.",
    price: 6.99,
    calories: 480,
    imageURL: "https://www.thelittlekitchen.net/wp-content/uploads/2015/05/coconut-almond-milk-tea-smoothies-the-little-kitchen-19950.jpg"
  },
  {
    title: "Mousse Boba Tea",
    description: "It contains different types of tea at the bottom with some sugar and is topped off with a savory mousse.",
    price: 9.99,
    calories: 780,
    imageURL: "https://cdn.vox-cdn.com/thumbor/VQTx2oXZRWTYMGtN-K-c4OHUBPo=/0x0:4223x3167/1200x800/filters:focal(1902x1200:2576x1874)/cdn.vox-cdn.com/uploads/chorus_image/image/61481407/cheesetea_shutterstock.0.jpg"
  },
]