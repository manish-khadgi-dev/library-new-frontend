import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./redux/User/UserSlice"
import bookReducer from "./redux/Book/BookSlice"
import transactionReducer from "./redux/Transaction/TransactionSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    transaction: transactionReducer,
  },
})

export default store
