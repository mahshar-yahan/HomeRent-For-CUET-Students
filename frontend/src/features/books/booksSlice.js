import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBookedPosts } from "./booksAPI";

const initialState = {
  isLoading: false,
  isError: false,
  posts: [],
  books: [],
  error: "",
};

export const fetchBookedPost = createAsyncThunk(
  "posts/fetchBookedPost",
  async () => {
    const books = await getBookedPosts();
    // console.log(books);
    return books;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    filters: (state, action) => {
      state.filterPosts = state.posts.filter(
        (post) => post.type === action.payload
      );
    },
    searched: (state, action) => {
      state.searchedPosts = state.posts.filter(
        (post) => post.location === action.payload
      );
    },
    related: (state, action) => {
      state.relatedPosts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBookedPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchBookedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchBookedPost.rejected, (state, action) => {
        state.isLoading = false;
        state.books = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default booksSlice.reducer;

export const { filters, searched, related } = booksSlice.actions;
