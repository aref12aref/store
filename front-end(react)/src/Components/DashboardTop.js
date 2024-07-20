import "../pages/dashboard/dashboardStyle.css";
import { Link } from "react-router-dom";

export default function DashboardTop() {
  return (
    <nav className="dashboardnavbar">
      <div className="dashboardnavbar1">
        <h1>Store</h1>
      </div>
      <div className="dashboardnavbar2">
        <button className="nav2but">
          <Link to="/home" className="nav2buta">
            go to website
          </Link>
        </button>
      </div>
    </nav>
  );
}
