import { Routes, Route } from "react-router-dom";

//website
import Home from "./pages/website/Home";
import About from "./pages/website/About";
//auth
import SignUp from "./pages/website/auth/SignUp";
import Login from "./pages/website/auth/Login";
//dashboard
import Dashboard from "./pages/dashboard/Dashboard";
//users
import Users from "./pages/dashboard/users/Users";
import EditUser from "./pages/dashboard/users/EditUser";
import CreateUser from "./pages/dashboard/users/CreateUser";
//products
import Products from "./pages/dashboard/products/Products";
import NewProduct from "./pages/dashboard/products/NewProduct";
import UpdateProduct from "./pages/dashboard/products/UpdateProduct";

import RequireAuth from "./pages/website/auth/RequireAuth";

import PresistLogin from "./pages/website/auth/PresistLogin";

function App() {
  return (
    <div className="App">
      {/* pages loader */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PresistLogin />}>
          {/* protected auth */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              {/* in dashboard elements loader */}
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<EditUser />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
