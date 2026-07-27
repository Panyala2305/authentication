import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  // State to store logged-in user
  const [user, setUser] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error message
  const [message, setMessage] = useState("");

  // Fetch logged-in user details
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          {
            method: "GET",
            credentials: "include", // Send HttpOnly Cookie
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.log(error);
        setMessage("Server Error");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white shadow-md rounded p-6 w-96">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Dashboard
        </h2>

        {message && (
          <p className="text-red-500 text-center mb-3">
            {message}
          </p>
        )}

        {user && (
          <>
            <p className="mb-2">
              <strong>Username :</strong> {user.username}
            </p>

            <p>
              <strong>Email :</strong> {user.email}
            </p>
          </>
        )}

      </div>

    </div>
    </>
  );
}

export default Dashboard;