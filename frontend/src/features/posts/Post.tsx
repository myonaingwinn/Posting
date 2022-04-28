function Post(props: any) {
  const titleElem = <h2 className="title text-start">{props.post.title}</h2>;
  const bodyElem = <p className="card-text text-start">{props.post.body}</p>;
  return (
    <div>
      <div className="row">
        <div className="col-8">{titleElem}</div>
        <div className="col-4"></div>
      </div>
      <div className="row">
        <div className="col-8">{bodyElem}</div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default Post;
