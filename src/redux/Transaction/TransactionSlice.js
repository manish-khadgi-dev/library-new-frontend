import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  response: {},
  transactions: [],
}

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    getTransactionsSuccess: (state, action) => {
      state.isLoading = false
      state.transactions = action.payload
    },
    requestFailed: (state, action) => {
      state.isLoading = false
      state.response = action.payload
    },
  },
})

const { reducer, actions } = transactionSlice

export const { requestPending, getTransactionsSuccess, requestFailed } = actions

export default reducer
