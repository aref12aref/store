import "./loginStyle.css";
import Header from "../../../Components/Header.js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";

export default function Login() {
  //login data state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  //error state
  const [existError, setExistError] = useState(false);
  //email error state
  const [err, setErr] = useState(false);

  const userNow = useContext(User);
  const nav = useNavigate();

  //cookie
  const cookie = new Cookies();

  //submit function
  async function submit(e) {
    e.preventDefault(); //prevent default form action
    setExistError(true); //show errors
    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", loginData);
      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const userDetails = res.data.data.user;
      userNow.setAuth({ token, userDetails });
      nav("/home");
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
      }
      setExistError(true);
    }
  }

  //component return
  return (
    <div>
      <Header />
      <div className="contain">
        {/* form */}
        <form className="loginform" onSubmit={submit}>
          {/* input email */}
          <label htmlFor="email" style={{ fontSize: "30px" }}>
            email
          </label>
          <input
            type="email"
            placeholder="email..."
            id="email"
            className="inpt"
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
              setExistError(false);
              setErr(false);
            }}
            value={loginData.email}
          />
          <br />

          {/* password input */}
          <label htmlFor="password" style={{ fontSize: "30px" }}>
            password
          </label>
          <input
            type="password"
            placeholder="password..."
            id="password"
            className="inpt"
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
              setErr(false);
            }}
            value={loginData.password}
          />
          {/* input password error handel */}
          {err && existError && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              the creditions isnt valid
            </p>
          )}
          <br />

          {/* login button */}
          <button type="submit" className="butt">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
