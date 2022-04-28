import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { createPost, destroyPost, fetchPosts, updatePost } from "./postAPI";

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

export interface PostUpdateData {
  post_id: number;
  post: PostState;
}

export interface PostDeleteData {
  post: {
    post_id: number;
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

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async (payload: PostUpdateData) => {
    const response = await updatePost(payload);
    return response;
  }
);

export const destroyPostAsync = createAsyncThunk(
  "posts/destroyPost",
  async (payload: PostDeleteData) => {
    const response = await destroyPost(payload);
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

      // Create a new Post
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
      })

      // Update Post
      .addCase(updatePostAsync.pending, (state) => {
        return produce(state, (draftState: any) => {
          draftState.status = Status.Loading;
        });
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState: any) => {
          const index = draftState.posts.findIndex(
            (post: PostState) => post.id === action.payload.id
          );
          draftState.posts[index] = action.payload;
          draftState.status = Status.UpToDate;
        });
      })
      .addCase(updatePostAsync.rejected, (state) => {
        return produce(state, (draftState: any) => {
          draftState.status = Status.Error;
        });
      })

      // Delete Post
      .addCase(destroyPostAsync.pending, (state) => {
        return produce(state, (draftState: any) => {
          draftState.status = Status.Loading;
        });
      })
      .addCase(destroyPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState: any) => {
          draftState.posts = action.payload;
          draftState.status = Status.UpToDate;
        });
      })
      .addCase(destroyPostAsync.rejected, (state) => {
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
