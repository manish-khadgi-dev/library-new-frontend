import {
  getTransactionsSuccess,
  requestFailed,
  requestPending,
} from "./TransactionSlice"
import { getAllTransactions } from "../../helpers/axiosHelper"

export const getTransactionsAction = () => async (dispatch) => {
  try {
    dispatch(requestPending())
    const transactions = await getAllTransactions()
    transactions
      ? dispatch(getTransactionsSuccess(transactions))
      : dispatch(
          requestFailed({
            status: "error",
            message: "Unable to fetch transactions",
          })
        )
  } catch (error) {
    dispatch(requestFailed(error))
  }
}
