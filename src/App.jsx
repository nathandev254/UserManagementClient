import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {useContext} from 'react'
import { usercontext } from "./context/Usercontext"; 
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import ManageEmployee from "./components/ManageEmployee";
import AddDepartment from "./components/AddDepartment";
import ManageDepartment from "./components/ManageDepartment";
import Employeeform from "./components/Employeeform";

function App() {

  const {user} = useContext(usercontext)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ user ? <Dashboard /> : <Navigate to="/login" replace/>}>
            <Route path="Home" element={<Home />} />
            <Route path="AddEmployee" element={<AddEmployee />} />
            <Route path="ManageEmployee" element={<ManageEmployee />} />
            <Route path="Employeeform/:id" element={<Employeeform />} />
            <Route path="AddDepartment" element={<AddDepartment />} />
            <Route path="ManageDepartment" element={<ManageDepartment />} />
          </Route> 
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
