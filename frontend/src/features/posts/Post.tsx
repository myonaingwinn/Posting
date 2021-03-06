import { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup";

function Post(props: any) {
  const [title, setTitle] = useState(props.post.title);
  const [body, setBody] = useState(props.post.body);
  const [isEditing, setIsEditing] = useState(
    props.postToEdit === props.post.id
  );

  useEffect(() => {
    setIsEditing(props.postToEdit === props.post.id);
  }, [props.postToEdit, props.post.id]);

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      post: {
        id: props.post.id,
        title: title,
        body: body,
      },
    };
    props.submitEdit(formData);
    resetState();
  }

  function resetState() {
    setTitle(props.post.title);
    setBody(props.post.body);
  }

  const titleElem = <h2 className="title text-start">{props.post.title}</h2>;
  const bodyElem = <p className="card-text text-start">{props.post.body}</p>;

  const editableTitle = (
    <input
      type="text"
      value={title}
      placeholder="Enter title"
      onChange={(e) => setTitle(e.target.value)}
      className="form-control text-start"
    />
  );

  const editableBody = (
    <textarea
      className="form-control text-start"
      value={body}
      placeholder="Enter body text"
      onChange={(e) => setBody(e.target.value)}
    ></textarea>
  );

  const submitButton = (
    <button
      type="submit"
      className="btn btn-primary"
      onClick={(e) => submitHandler(e)}
    >
      Update
    </button>
  );

  return (
    <div className="card shadow-sm p-1 mb-2 bg-body rounded">
      <div className="card-body">
        <div className="row">
          <div className="col-8 mb-2">
            {isEditing ? editableTitle : titleElem}
          </div>
          <div className="col-4">
            <ButtonGroup
              post_id={props.post.id}
              dispatch={props.dispatch}
              toggleEditForm={props.toggleEditForm}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-8 mb-2">
            {isEditing ? editableBody : bodyElem}
          </div>
        </div>
        <div className="row">
          <div className="col-8">{isEditing ? submitButton : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
