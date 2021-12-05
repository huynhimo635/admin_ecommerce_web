import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import categoryApi from "../../api/categoryApi"

export const getCate = createAsyncThunk("categories/getCate", async () => {
  const categories = await categoryApi.getAll()
  return categories
})

const getCateSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    loading: false,
    error: false
  },
  reducers: {},
  extraReducers: {
    [getCate.pending]: state => {
      state.loading = true
    },

    [getCate.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },

    [getCate.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
    }
  }
})

const { reducer: getCateReducer } = getCateSlice
export default getCateReducer
