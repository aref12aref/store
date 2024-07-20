import { useState, useContext } from "react";
import "../dashboardStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../website/Context/UserContext";

export default function CreateUser() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  //email error state
  const [emailError, setEmailError] = useState(false);
  const [existError, setExistError] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;

  const nav = useNavigate();

  //submit function
  async function submit(e) {
    e.preventDefault(); //prevent default form action
    setExistError(true);

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/create`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setExistError(true);
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="editContainer">
        <h1>Create User</h1>
        <form className="createformcontainer" onSubmit={submit}>
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
              setEmailError(false);
              setExistError(false);
            }}
            value={data.email}
          />
          {/* input email error handel */}
          {emailError && existError && (
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
          <button type="submit" className="but">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
