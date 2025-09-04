// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";

// User pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import CarList from "./pages/CarList";
import Profile from "./pages/Profile";
import CarDetails from "./pages/CarDetails";
import AvailableCars from "./pages/AvailableCars";
import AboutUs from "./pages/AboutUs";

// User Navbar
import Navbar from "./components/Navbar";

// Admin pages
import AdminHome from "./pages/admin/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Cars from "./pages/admin/Cars";

import Bookings from "./pages/admin/Bookings";
import Registermodels from "./pages/admin/Registermodels";

// Admin Navbar
import AdminNavbar from "./components/AdminNavbar";
import RequireAdmin from "./components/RequireAdmin";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminLogin = location.pathname === "/admin/login";
  const isUserLogin = location.pathname === "/login";
  const isUserRegister = location.pathname === "/register";

  return (
    <>
      {/* Show Navbar for users only (not for login/register pages) */}
      {!isAdminRoute && !isUserLogin && !isUserRegister && <Navbar />}

      {/* Show Admin Navbar for admin routes except login */}
      {isAdminRoute && !isAdminLogin && <AdminNavbar />}

      {/* ✅ Place ScrollToTop here */}
      <ScrollToTop />

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/available-cars" element={<AvailableCars />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/home"
          element={
            <RequireAdmin>
              <AdminHome />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/cars"
          element={
            <RequireAdmin>
              <Cars />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <RequireAdmin>
              <Bookings />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/registermodels"
          element={
            <RequireAdmin>
              <Registermodels />
            </RequireAdmin>
          }
        />
      </Routes>
    </>
  );
}


export default App;
