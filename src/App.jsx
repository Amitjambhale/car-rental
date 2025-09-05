import { Routes, Route, useLocation } from "react-router-dom";

// User pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Booking from "./pages/Booking.jsx";
import CarList from "./pages/CarList.jsx";
import Profile from "./pages/Profile.jsx";
import CarDetails from "./pages/CarDetails.jsx";
import AvailableCars from "./pages/AvailableCars.jsx";
import AboutUs from "./pages/AboutUs.jsx";


// User Navbar
import Navbar from "./components/Navbar";

// Admin pages
import AdminHome from "./pages/admin/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Cars from "./pages/admin/Cars";
import Bookings from "./pages/admin/Bookings";
import RegisterModels from "./pages/admin/RegisterModels";

// Admin Layout + Auth
import RequireAdmin from "./components/RequireAdmin";
import AdminLayout from "./components/AdminLayout";

// Utility
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  const isUserLogin = location.pathname === "/login";
  const isUserRegister = location.pathname === "/register";

  return (
    <>
      {/* ✅ Show Navbar for users only (not login/register) */}
      {!isUserLogin && !isUserRegister && !location.pathname.startsWith("/admin") && (
        <Navbar />
      )}

      {/* ✅ ScrollToTop always */}
      <ScrollToTop />

      <Routes>
        {/* ===== User Routes ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/available-cars" element={<AvailableCars />} />
        <Route path="/about" element={<AboutUs />} />

        {/* ===== Admin Routes ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="cars" element={<Cars />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="registermodels" element={<RegisterModels />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<h2 style={{ textAlign: "center"  }}>Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
