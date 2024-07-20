import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import "./products.css";

export default function NewProduct() {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });

  //email error state
  const [existError, setExistError] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;

  const nav = useNavigate();

  //submit function
  async function submit(e) {
    e.preventDefault(); //prevent default form action
    setExistError(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("image", data.image);

      let res = await axios.post(
        "http://127.0.0.1:8000/api/product/create",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/products");
    } catch (err) {
      setExistError(true);
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="editProductContainer">
        <h1>Create Product</h1>
        <form className="createProductContainer" onSubmit={submit}>
          {/* title input */}
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="title..."
            id="title"
            className="productInput"
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
              setExistError(false);
            }}
            value={data.title}
          />
          {/* input title error handel */}
          {data.title.length < 1 && existError && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              title is required
            </p>
          )}
          <br />

          {/* input description */}
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="description..."
            id="description"
            className="productInput"
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
              setExistError(false);
            }}
            value={data.description}
          />
          {/* input description error handel */}
          {/* {emailError && existError && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              email is already been taken
            </p>
          )} */}
          <br />

          {/* image input */}
          <label htmlFor="image">image</label>
          <input
            type="file"
            placeholder="image..."
            id="image"
            className="productInput"
            style={{ border: "1px solid black" }}
            onChange={(e) => {
              setData({ ...data, image: e.target.files.item(0) });
              setExistError(false);
            }}
          />
          {/* input name error handel */}
          {/* {data.password.length < 8 && existError && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              password must be at least 8 chars
            </p>
          )} */}
          <br />

          {/* submit button */}
          <button type="submit" className="productBut">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
