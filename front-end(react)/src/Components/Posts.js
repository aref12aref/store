import "./postsStyle.css";

export default function Posts({ title, description, image }) {
  return (
    <div className="post">
      <div className="postimage" style={{backgroundImage: `url(${image})`}}></div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
}
