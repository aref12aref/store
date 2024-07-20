import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { User } from "../../website/Context/UserContext";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import LoadingScreen from "../../../Components/LoadingScreen";

export default function PresistLogin() {
  //get current token
  const context = useContext(User);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);

  //cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  //refresh token

  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((data) => {
            cookie.set("Bearer", data.data.token);
            context.setAuth((prev) => {
              return {
                userDetails: data.data.user,
                token: data.data.token,
              };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <LoadingScreen /> : <Outlet />;
}
