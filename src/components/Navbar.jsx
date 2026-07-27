import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
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
        MERN Auth
      </h1>

      
      <div className="flex gap-4">

        {/* Show Signup button only if not on Signup page */}
        <Link>Home</Link>
        <Link>about</Link>
        <Link>contact</Link>

        {/* Show Login button only if not on Login page */}


        {/* Show Logout button only on Dashboard */}
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