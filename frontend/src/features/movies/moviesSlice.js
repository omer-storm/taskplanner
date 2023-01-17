import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moviesService from "./moviesService";

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Movies
export const getMovies = createAsyncThunk(
  "movies/getmovies",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moviesService.getMovies(token);
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

//Get Movies
export const getArchiveMovies = createAsyncThunk(
  "movies/getarchivemovies",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moviesService.getArchiveMovies(token);
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
//set Movies
export const setMovies = createAsyncThunk(
  "movies/setmovies",
  async (movie, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moviesService.setMovies(movie, token);
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

//delete Movies
export const deleteMovies = createAsyncThunk(
  "movies/deletemovies",
  async (movie, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moviesService.deleteMovies(movie, token);
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

//update Movies
export const updateMovies = createAsyncThunk(
  "movies/updatemovies",
  async (movie, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moviesService.updateMovies(movie, token);
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

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetMovies: (state) => {
      state.movies = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.movies = null;
      })
      .addCase(getArchiveMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArchiveMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getArchiveMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.movies = null;
      })
      .addCase(setMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies.push(action.payload);
      })
      .addCase(setMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.movies = null;
      })
      .addCase(deleteMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload._id
        );
        state.isError = false;
        state.message = null;
      })
      .addCase(deleteMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.movies = null;
      })
      .addCase(updateMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload._id
        );
        state.isError = false;
        state.message = null;
      })
      .addCase(updateMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.movies = null;
      });
  },
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
