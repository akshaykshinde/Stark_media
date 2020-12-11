import { ADD_TO_CART } from './../reducer/types';

export const addtocart = cart => (
    {
        type: ADD_TO_CART,
        data: cart
    }
)