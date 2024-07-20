import Header from "../../Components/Header.js";
import Posts from "../../Components/Posts.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./homeStyle.css";

export default function Home() {
  const [productsData, setProductsData] = useState([]);

  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  //get data from database
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setProductsData(data.data));
  }, []);

  let usersProducts = productsData.map((product, index) => {
    return (
      <Posts
        key={index}
        title={product.title}
        description={product.description}
        image={product.image}
      />
    );
  });

  return (
    <div>
      <Header />
      <div className="postsContainer">{usersProducts}</div>
    </div>
  );
}
