import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import orderApi from "../../api/orderApi"

export const getAll = createAsyncThunk("order/getAll", async () => {
  const orders = await orderApi.getAll()
  return orders
})

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    loading: false,
    error: false
  },
  reducers: {},
  extraReducers: {
    [getAll.pending]: state => {
      state.loading = true
    },

    [getAll.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },

    [getAll.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
    }
  }
})

const { reducer: orderReducer } = orderSlice

export default orderReducer
