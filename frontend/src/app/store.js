import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import booksReducer from "../features/books/booksSlice";
import moviesReducer from "../features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    movies: moviesReducer,
  },
});
