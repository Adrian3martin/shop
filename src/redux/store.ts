// store.ts
import { createStore, combineReducers } from 'redux';
import cartReducer from './cart/cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers if needed
});

const store = createStore(rootReducer);

export default store;