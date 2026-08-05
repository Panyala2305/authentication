import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUser(null);
        navigate("/login");
      } else {
        alert("Logout Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        {user ? `Welcome, ${user.username}` : "MERN Auth"}
      </h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {location.pathname === "/dashboard" && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
