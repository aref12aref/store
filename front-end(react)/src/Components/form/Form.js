import "./formStyle.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Form(props) {
  //data state
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  //error state
  const [existError, setExistError] = useState(false);
  //email error state
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setData({ ...data, name: props.username, email: props.useremail });
  }, [props.username, props.useremail]);

  //submit function
  async function submit(e) {
    let flag = true; //send data flag
    e.preventDefault(); //prevent default form action
    setExistError(true); //show errors
    //send data if there is not any errors
    if (
      data.name.length < 1 ||
      data.password.length < 8 ||
      data.password_confirmation !== data.password
    ) {
      flag = false;
    } else {
      flag = true;
    }
    try {
      if (flag) {
        let res = await axios.post(
          `http://127.0.0.1:8000/api/${props.endPoint}`,
          data
        );
        if (res.status === 200) {
          props.hasLocalStorage &&
            window.localStorage.setItem("email", data.email);
          window.location.pathname = `/${props.navigate}`;
        }
      }
    } catch (err) {
      setEmailError(err.response.status);
    }
  }

  return (
    <form style={props.styleForm} className="fcontainer" onSubmit={submit}>
      {/* name input */}
      <label htmlFor="name">name</label>
      <input
        type="text"
        placeholder="name..."
        id="name"
        className="inp"
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
          setExistError(false);
        }}
        value={data.name}
      />
      {/* input name error handel */}
      {data.name.length < 1 && existError && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
          username is required
        </p>
      )}
      <br />

      {/* input email */}
      <label htmlFor="email">email</label>
      <input
        type="email"
        placeholder="email..."
        id="email"
        className="inp"
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
          setExistError(false);
          setEmailError(0);
        }}
        value={data.email}
      />
      {/* input email error handel */}
      {emailError === 422 && existError && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
          email is already been taken
        </p>
      )}
      <br />

      {/* password input */}
      <label htmlFor="password">password</label>
      <input
        type="password"
        placeholder="password..."
        id="password"
        className="inp"
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
          setExistError(false);
        }}
        value={data.password}
      />
      {/* input name error handel */}
      {data.password.length < 8 && existError && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
          password must be at least 8 chars
        </p>
      )}
      <br />

      {/* repeat password input */}
      <label htmlFor="repeat_password">Repeat Password</label>
      <input
        type="password"
        placeholder="repeat password..."
        id="repeat_password"
        className="inp"
        onChange={(e) => {
          setData({ ...data, password_confirmation: e.target.value });
          setExistError(false);
        }}
        value={data.password_confirmation}
      />
      {/* input repeat password error handel */}
      {data.password_confirmation !== data.password && existError && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
          password does not match
        </p>
      )}
      <br />

      {/* submit button */}
      <button type="submit" className="but" style={props.styleButton}>
        {props.buttonname}
      </button>
    </form>
  );
}
