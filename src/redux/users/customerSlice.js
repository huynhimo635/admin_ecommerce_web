import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from "../../api/userApi"

export const customer = createAsyncThunk("product/customer", async () => {
  const users = await userApi.getAll()
  return users
})

const customerSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
    error: false
  },
  reducers: {},
  extraReducers: {
    [customer.pending]: state => {
      state.loading = true
    },

    [customer.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },

    [customer.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
    }
  }
})

// export const { listCus } = customerSlice.actions
const { reducer: customerReducer } = customerSlice
export default customerReducer
