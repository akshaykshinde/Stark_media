import { PRODUCT_SELECTED } from './../reducer/types';

export const productselected = data => (
    {
        type: PRODUCT_SELECTED,
        data: data
    }
)