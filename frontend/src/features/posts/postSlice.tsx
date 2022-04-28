import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { createPost, fetchPosts } from "./postAPI";

export enum Status {
  Initial = "Not fetched",
  Loading = "Loading",
  UpToDate = "Up to Date",
  Deleted = "Deleted",
  Error = "Error",
}

export interface PostState {
  id?: number;
  title?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PostsState {
  posts: PostState[];
  status: string;
}

const initialState: PostsState = {
  posts: [
    {
      id: 0,
      title: "",
      body: "",
      created_at: "",
      updated_at: "",
    },
  ],
  status: Status.Initial,
};

export interface PostFormData {
  post: {
    title?: string;
    body?: string;
  };
}

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await fetchPosts();
    return response;
  }
);

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (payload: PostFormData) => {
    const response = await createPost(payload);
    return response;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,

  /**
   * Synchronus actions
   */
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        return produce(state, (draftState: any) => {
          draftState.status = Status.Loading;
        });
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState: any) => {
          draftState.posts = action.payload;
          draftState.status = Status.UpToDate;
        });
      })
      .addCase(fetchPostsAsync.rejected, (state) => {
        return produce(state, (draftState: any) => {
          draftState.status = Status.Error;
        });
      })

      // Update Post
      .addCase(createPostAsync.pending, (state) => {
        return produce(state, (draftState: any) => {
          draftState.status = Status.Loading;
        });
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState: any) => {
          draftState.posts.push(action.payload);
          draftState.status = Status.UpToDate;
        });
      })
      .addCase(createPostAsync.rejected, (state) => {
        return produce(state, (draftState: any) => {
          draftState.status = Status.Error;
        });
      });
  },
});

// export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
