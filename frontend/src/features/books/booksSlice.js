import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import booksService from "./booksService";

const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  reload: 1,
  message: "",
};

//Get Books
export const getBooks = createAsyncThunk(
  "books/getbooks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksService.getBooks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Archive Books
export const getArchiveBooks = createAsyncThunk(
  "books/getarchivebooks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksService.getArchiveBooks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//set Books
export const setBooks = createAsyncThunk(
  "books/setbooks",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksService.setBooks(book, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete Books
export const deleteBooks = createAsyncThunk(
  "books/deletebooks",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksService.deleteBooks(book, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete Books
export const updateBooks = createAsyncThunk(
  "books/updatebooks",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await booksService.updateBooks(book, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetBooks: (state) => {
      state.books = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
        state.isError = false;
        state.message = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      })
      .addCase(getArchiveBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArchiveBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
        state.isError = false;
        state.message = null;
      })
      .addCase(getArchiveBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      })
      .addCase(setBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(action.payload);
      })
      .addCase(setBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      })
      .addCase(deleteBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = state.books.filter(
          (book) => book._id !== action.payload._id
        );
        state.isError = false;
        state.message = null;
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      })
      .addCase(updateBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = state.books.filter(
          (book) => book._id !== action.payload._id
        );
        state.isError = false;
        state.message = null;
      })
      .addCase(updateBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      });
  },
});

export const { resetBooks } = booksSlice.actions;
export default booksSlice.reducer;
