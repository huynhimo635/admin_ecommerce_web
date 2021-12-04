import { configureStore } from "@reduxjs/toolkit"

import loadingSlice from "./loadingSlice"
import productReducer from "./products/productSlice"
import getCateReducer from "./categories/getCateSlice"
import orderReducer from "./orders/orderSlice"

import getMeReducer from "./users/getMeSlice"
import customerReducer from "./users/customerSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    getCate: getCateReducer,
    order: orderReducer,

    customer: customerReducer,
    getMe: getMeReducer,

    loading: loadingSlice
  }
})
