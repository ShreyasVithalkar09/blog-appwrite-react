import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import appwriteService from "../../appwrite/blog";

const initialState = {
  posts: [],
  singlePost: null,
  isLoading: false,
  cache: {},
};

export const cachePost = createAction("post/cachePost");

export const getSinglePost = createAsyncThunk(
  "posts/singlePost",
  async (slug, thunkAPI) => {
    const { cache } = thunkAPI.getState().post;

    if (cache[slug]) {
      return cache[slug];
    }

    try {
      const post = await appwriteService.getPost(slug);
      thunkAPI.dispatch(cachePost({ slug, post }));

      return post;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    clearCache: (state) => {
      state.posts = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singlePost = action.payload;
      })
      .addCase(cachePost, (state, action) => {
        const { slug, post } = action.payload;
        state.cache[slug] = post;
        state.singlePost = post;
      });
  },
});

export const { setPosts, clearCache } = postSlice.actions;

export default postSlice.reducer;
