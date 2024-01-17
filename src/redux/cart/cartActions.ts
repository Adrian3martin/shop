import IProduct from '../../interfaces/Product';
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// cartActions.ts
export const addToCart = (item: IProduct) => ({
    type: ADD_TO_CART,
    payload: item,
});
  
export const removeFromCart = (itemId: number) => ({
    type: REMOVE_FROM_CART,
    payload: itemId,
});
