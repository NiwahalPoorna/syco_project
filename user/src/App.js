import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/SideBar";
import Home from "./Pages/Home";
import Login from "./auth/LoginPage";
import Signup from "./auth/SignupPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home/*" element={<DashboardRoutes />} />
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
        {/* <Route path="/booking" element={<BookingPage />} /> */}
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

// {
  /* <Route path="/bus" element={<BusPage />} />
        <Route path="/root" element={<BusRootPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/bus/AddBusPage" element={<AddBusPage />} />
        <Route path="/root/AddRoot" element={<AddRoot />} />
        <Route path="/staff/AddStaff" element={<Addstaff />} />

        <Route path="/bus/EditBusPage/:_id" element={<EditBusPage />} />
        <Route path="/root/EditRoot/:_id" element={<EditRoot />} />
//         <Route path="/staff/EditStaff/:_id" element={<EditStaff />} /> */
// }

// {
//   /* Other dashboard routes */
// }
