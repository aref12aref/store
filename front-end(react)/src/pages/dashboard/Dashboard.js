import DashboardTop from "../../Components/DashboardTop";
import DashboardSidebar from "../../Components/DashboardSidebar";
import "./dashboardStyle.css";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      {/* dashboard top bar */}
      <DashboardTop />
      <div className="maindash">
        {/* dashboard side bar */}
        <DashboardSidebar />
        {/* dashboard main */}
        <Outlet />
      </div>
    </div>
  );
}
