import { Routes, Route, useLocation } from "react-router-dom"; // ✅ Don't forget useLocation!
import Home from "./pages/Home";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import CarList from "./pages/CarList";
import Profile from "./pages/Profile";
import CarDetails from "./pages/CarDetails";
import Navbar from "./components/Navbar";
import AvailableCars from "./pages/AvailableCars";
import AboutUs from "./pages/AboutUs";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
       <Route path="/cars/:id" element={<CarDetails />} />

         <Route path="/available-cars" element={<AvailableCars />} />
         <Route path="/about" element={<AboutUs />} />
         
      </Routes>
    </>
  );
}

export default App;
