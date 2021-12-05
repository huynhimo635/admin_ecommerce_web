import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productApi from "../../api/productApi"

export const getAll = createAsyncThunk(
  "product/getAll",
  async (params, thunkAPI) => {
    //thunkAPI.dispatch(...)
    const products = await productApi.getAll()
    return products
  }
)

const productSlice = createSlice({
  name: "product",
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

const { reducer: productReducer } = productSlice
export default productReducer
