import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Navigate, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { AiFillDashboard } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { MdPersonOff } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { TbNotes } from "react-icons/tb";
import { Link } from "react-router-dom";
import { usercontext } from "../context/Usercontext";

function SideNavigation() {
  const navigate = useNavigate();
  const { dispatch } = useContext(usercontext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="Sidebar--container" style={{ minHeight: "100vh" }}>
      <Sidebar backgroundColor="transparent" width="300px" height="100vh">
        <Menu>
          <MenuItem component={<Link to="Home" />} icon={<AiFillDashboard />}>
            Dashboard
          </MenuItem>
          <SubMenu icon={<MdPeopleAlt />} label="employee">
            <MenuItem component={<Link to="AddEmployee" />}>
              AddEmployee
            </MenuItem>
            <MenuItem component={<Link to="ManageEmployee" />}>
              ManageEmployee
            </MenuItem>
          </SubMenu>
          <SubMenu icon={<FcDepartment />} label="Department">
            <MenuItem component={<Link to="AddDepartment" />}>
              AddDepartment
            </MenuItem>
            <MenuItem component={<Link to="ManageDepartment" />}>
              ManageDepartments
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<MdPersonOff />}>Leave</MenuItem>
          <MenuItem icon={<TbNotes />}>Attendance</MenuItem>
          <MenuItem icon={<CgLogOut />} onClick={handleLogout}>
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideNavigation;
