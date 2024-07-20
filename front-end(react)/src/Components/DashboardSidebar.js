import "../pages/dashboard/dashboardStyle.css";
import { NavLink } from "react-router-dom";

export default function DashboardSidebar() {
  return (
    <nav className="sideContainer">
      <div className="sidesection">
        <i className="fa-solid fa-users"></i>
        <NavLink
          activeclassname="active"
          to="/dashboard/users"
          className="sideItem"
        >
          Users
        </NavLink>
      </div>
      <div className="sidesection">
        <i className="fa-solid fa-user-plus"></i>
        <NavLink
          activeclassname="active"
          to="/dashboard/user/create"
          className="sideItem"
        >
          New User
        </NavLink>
      </div>
      <div className="sidesection">
        <i className="fa-brands fa-product-hunt"></i>
        <NavLink
          activeclassname="active"
          to="/dashboard/products"
          className="sideItem"
        >
          Products
        </NavLink>
      </div>
      <div className="sidesection">
        <i className="fa-solid fa-plus"></i>
        <NavLink
          activeclassname="active"
          to="/dashboard/product/create"
          className="sideItem"
        >
          New Product
        </NavLink>
      </div>
    </nav>
  );
}
