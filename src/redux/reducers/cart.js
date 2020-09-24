const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => sum + obj.price, 0);

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART': {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [ action.payload ]
        : [ ...state.items[action.payload.id].items, action.payload ];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        }
      };

      const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
      const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'CLEAR_CART': {
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    }

    case 'REMOVE_CART_ITEM': {
      const { [action.payload]: itemToDelete, ...rest } = state.items;

      return {
        ...state,
        items: rest,
        totalPrice: state.totalPrice - itemToDelete.totalPrice,
        totalCount: state.totalCount - itemToDelete.items.length,
      };
    }

    case 'PLUS_CART_ITEM': {
      const newItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0]
      ];
      const newState = {
        ...state.items,
        [action.payload]: {
          items: newItems,
          totalPrice: getTotalPrice(newItems),
        }
      };

      const totalPrice = Object.keys(newState).reduce((sum, key) => newState[key].totalPrice + sum, 0);
      const totalCount = Object.keys(newState).reduce((sum, key) => newState[key].items.length + sum, 0);

      return {
        ...state,
        items: newState,
        totalPrice,
        totalCount,
      }
    }

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newItems = oldItems.length > 1 ? state.items[action.payload].items.slice(0, state.items[action.payload].items.length - 1) : oldItems;
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          }
        }
      };
    }
    default:
      return state;
  }
};

export default cart;