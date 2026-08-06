import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";


function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        
      </Routes>
    </>
  );
}

export default App;