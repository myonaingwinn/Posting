import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { createPostAsync } from "./postSlice";

function PostForm() {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      post: {
        title: title,
        body: body,
      },
    };
    dispatch(createPostAsync(formData));
    resetState();
  }

  function resetState() {
    setTitle("");
    setBody("");
  }

  return (
    <div>
      <h1>PostForm</h1>
      <form>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter title"
          className="form-control text-start mb-3"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="body"
          value={body}
          placeholder="Enter body text"
          className="form-control text-start mb-3"
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-lg btn-primary"
          onClick={(e) => submitHandler(e)}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
