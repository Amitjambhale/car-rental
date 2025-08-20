// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";

// User pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import CarList from "./pages/CarList";
import Profile from "./pages/Profile";
import CarDetails from "./pages/CarDetails";
import AvailableCars from "./pages/AvailableCars";
import AboutUs from "./pages/AboutUs";


// User Navbar
import Navbar from "./components/Navbar";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCars from "./pages/admin/ManageCars";
import ManageBookings from "./pages/admin/ManageBookings";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import Register from "./pages/Register";
// Admin Navbar
import AdminNavbar from "./components/AdminNavbar";

function App() {
  const location = useLocation();

  // Paths check
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminLogin = location.pathname === "/admin/login";
  const isUserLogin = location.pathname === "/login";
   const isUserRegister = location.pathname === "/register";

  return (
    <>
      {/* Show user navbar only for non-admin and not on user login */}
      {!isAdminRoute && !isUserLogin && <Navbar />}

      {/* Show admin navbar only for admin routes except admin login */}
      {isAdminRoute && !isAdminLogin && <AdminNavbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
       
        <Route path="/cars" element={<CarList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/available-cars" element={<AvailableCars />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-cars" element={<ManageCars />} />
        <Route path="/admin/manage-bookings" element={<ManageBookings />} />
      </Routes>
    </>
  );
}

export default App;




