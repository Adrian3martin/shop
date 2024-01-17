import IProduct  from "../../interfaces/Product";
import { ADD_TO_CART, REMOVE_FROM_CART } from './cartActions'

interface CartState {
  items: IProduct[];
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
      case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.key !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
