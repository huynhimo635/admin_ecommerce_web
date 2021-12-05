import { createSlice } from "@reduxjs/toolkit"

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: false
  },
  reducers: {
    set: state => {
      state.value = true
    },
    remove: state => {
      state.value = false
    }
  }
})

export const { set, remove } = loadingSlice.actions
export default loadingSlice.reducer
