import { toast } from "react-toastify"
import {
  addBook,
  borrowBook,
  deleteBook,
  getBooks,
  getBorrowedBooks,
  returnBook,
} from "../../helpers/axiosHelper"
import {
  getBookSuccess,
  getBorrowedBooksSuccess,
  requestFailed,
  requestPending,
  requestSuccess,
} from "./BookSlice"

export const getBooksAction = () => async (dispatch) => {
  try {
    dispatch(requestPending())

    const response = await getBooks()

    response.books
      ? dispatch(getBookSuccess(response.books))
      : dispatch(requestFailed({ message: "No books found!" }))
  } catch (error) {
    dispatch(requestFailed(error))
  }
}

export const getBorrowedBooksAction = () => async (dispatch) => {
  try {
    dispatch(requestPending())

    const res = await getBorrowedBooks()

    res
      ? dispatch(getBorrowedBooksSuccess(res))
      : dispatch(requestFailed({ message: "No books borrowed!" }))
  } catch (error) {
    dispatch(requestFailed(error))
  }
}

export const borrowBookAction = (bookId) => async (dispatch) => {
  dispatch(requestPending())

  const { status, message } = await borrowBook(bookId)

  status === "success"
    ? dispatch(requestSuccess({ status, message })) && toast[status](message)
    : dispatch(requestFailed({ status, message })) && toast[status](message)
}

export const returnBookAction = (bookId) => async (dispatch) => {
  try {
    dispatch(requestPending())

    const { status, message } = await returnBook(bookId)

    status === "success"
      ? dispatch(requestSuccess({ status, message })) &&
        toast[status](message) &&
        dispatch(getBorrowedBooksAction())
      : dispatch(requestFailed({ status, message })) && toast[status](message)
  } catch (error) {
    dispatch(requestFailed(error))
  }
}

export const deleteBookAction = (bookId) => async (dispatch) => {
  try {
    dispatch(requestPending())

    const { status, message } = await deleteBook(bookId)

    status === "success"
      ? dispatch(requestSuccess({ status, message })) &&
        toast[status](message) &&
        dispatch(getBooksAction())
      : dispatch(requestFailed({ status, message })) && toast[status](message)
  } catch (error) {
    dispatch(requestFailed(error))
  }
}

export const addBookAction = (form) => async (dispatch) => {
  try {
    dispatch(requestPending())

    const { status, message } = await addBook(form)

    status === "success"
      ? dispatch(requestSuccess({ status, message })) && toast[status](message)
      : dispatch(requestFailed({ status, message })) && toast[status](message)
  } catch (error) {
    dispatch(requestFailed(error))
  }
}
