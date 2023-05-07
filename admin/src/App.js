import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Pages/SideBar";
import Dashboard from "./Pages/DashBoard";
import Login from "./auth/LoginPage";
import Signup from "./auth/SignupPage";
import TaxUser from "./Pages/TaxUser/TaxUser"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        {/* <Route path="/bus/AddBusPage" element={<AddBusPage />} /> */}
      </Routes>
    </Router>
  );
}

function DashboardRoutes() {
  // Conditionally render Sidebar and Navbar components only for the dashboard routes
  return (
    <>
      <Sidebar />

      <Routes>
        <Route path="/TaxUser" element={<TaxUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
      

        {/* Other dashboard routes */}
      </Routes>
    </>
  );
}

export default App;
















//   // {/* <Route path="/bus" element={<BusPage />} />
//         <Route path="/root" element={<BusRootPage />} />
//         <Route path="/staff" element={<StaffPage />} />
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/bus/AddBusPage" element={<AddBusPage />} />
//         <Route path="/root/AddRoot" element={<AddRoot />} />
//         <Route path="/staff/AddStaff" element={<Addstaff />} /> */}
// {/* 
//         <Route path="/bus/EditBusPage/:_id" element={<EditBusPage />} />
//         <Route path="/root/EditRoot/:_id" element={<EditRoot />} />
//         <Route path="/staff/EditStaff/:_id" element={<EditStaff />} /> */}