//dashboard users table component

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../dashboardStyle.css";
import "../../../fontawesome-free-6.5.2-web/css/all.css";
import { User } from "../../website/Context/UserContext";

export default function Users() {
  //users data state
  const [users, setUsers] = useState([]);
  //getting data from database state
  const [runEffect, setRunEffect] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;

  //get data from database
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUsers(data.data));
  }, [runEffect]);

  //delete user handeler
  async function deleteUser(id) {
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRunEffect((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //show users in table
  let usersShow = users.map((user, index) => {
    return (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <Link to={`${user.id}`}>
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "#74afb9", fontSize: "20px", cursor: "pointer" }}
            ></i>
          </Link>
          <i
            className="fa-solid fa-trash"
            onClick={() => deleteUser(user.id)}
            style={{
              marginLeft: "20px",
              color: "red",
              fontSize: "20px",
              cursor: "pointer",
            }}
          ></i>
        </td>
      </tr>
    );
  });

  //component return
  return (
    <div className="tablediv">
      {/* dashboard main users table */}
      <table>
        <thead>
          <tr>
            <th className="thitems">ID</th>
            <th className="thitems">UserName</th>
            <th className="thitems">Email</th>
            <th className="thitems">actions</th>
          </tr>
        </thead>
        <tbody>{usersShow}</tbody>
      </table>
    </div>
  );
}
