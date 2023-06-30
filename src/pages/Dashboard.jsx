import React from "react";
import "./Dashboard.css";
import SideNavigation from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="Dashboard">
      <SideNavigation />
      <Outlet />
    </div>
  );
}

export default Dashboard;
