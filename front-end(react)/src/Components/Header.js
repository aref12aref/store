import "./headerStyle.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handleLogOut() {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cookie.remove("Bearer");
      window.location.pathname = "/register";
    } catch (err) {
      console.log(err);
    }
  }

  //component return
  return (
    <nav className="navbar">
      {/* left side navbar */}
      <div className="navbar1">
        <h4>
          <Link to="/home" className="nav1l">
            Home
          </Link>
        </h4>
        <h4>
          <Link to="/about" className="nav1l">
            About
          </Link>
        </h4>
      </div>
      {/* right side navbar -> if there is an email show logout, else show register and login */}
      {!token ? (
        <div className="navbar2">
          <button className="nav2but">
            <Link to="/register" className="nav2buta">
              Register
            </Link>
          </button>
          <button className="nav2but">
            <Link to="/login" className="nav2buta">
              Login
            </Link>
          </button>
        </div>
      ) : (
        <div className="navbar2" style={{ justifyContent: "space-between" }}>
          <button className="nav2but">
            <Link to="/dashboard" className="nav2buta">
              DashBoard
            </Link>
          </button>
          <button className="nav2but" onClick={handleLogOut}>
            <Link to="/register" className="nav2buta">
              Logout
            </Link>
          </button>
        </div>
      )}
    </nav>
  );
}
