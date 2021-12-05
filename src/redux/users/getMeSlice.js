import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from "../../api/userApi"

export const getMe = createAsyncThunk("product/getMe", async email => {
  const users = await userApi.getAll()
  const res = users.find(item => item.email === email)
  return res
})

const getMeSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
    error: false
  },
  reducers: {},
  extraReducers: {
    [getMe.pending]: state => {
      state.loading = true
    },

    [getMe.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },

    [getMe.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
    }
  }
})

const { reducer: getMeReducer } = getMeSlice
export default getMeReducer
