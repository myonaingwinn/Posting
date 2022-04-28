import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import Post from "./Post";
import PostForm from "./PostForm";
import {
  fetchPostsAsync,
  selectPosts,
  selectStatus,
  Status,
  updatePostAsync,
} from "./postSlice";

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch: AppDispatch = useDispatch();
  const [postToEdit, setPostToEdit] = useState(0);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  function toggleEditForm(post_id?: number) {
    if (postToEdit === post_id) {
      setPostToEdit(0);
    } else {
      setPostToEdit(post_id as number);
    }
  }

  function submitEdit(formData: any) {
    dispatch(updatePostAsync(formData));
    toggleEditForm();
  }

  let contents;
  if (status !== Status.UpToDate) {
    contents = (
      <div>
        Status : <span className="text-danger">{status}</span>
      </div>
    );
  } else {
    contents = (
      <div className="container">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <div className="shadow-none p-2 mb-1 bg-light rounded">
              Status : <span className="text-success">{status}</span>
            </div>
            <PostForm />
            {posts &&
              posts.length > 0 &&
              posts.map((post) => {
                return (
                  <div key={post.id} style={{ margin: "1rem" }}>
                    <Post
                      dispatch={dispatch}
                      post={post}
                      toggleEditForm={() => toggleEditForm(post.id)}
                      postToEdit={postToEdit}
                      submitEdit={submitEdit}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
  return <div className="mt-4">{contents}</div>;
}

export default Posts;
