import { REMOVE_FROM_CART } from './../reducer/types';

export const removefromcart = data => (
    {
        type: REMOVE_FROM_CART,
        data: data
    }
)