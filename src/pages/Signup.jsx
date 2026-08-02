import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  // Signup Function
  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup Successful!");

        // Clear input fields
        setUsername("");
        setEmail("");
        setPassword("");

        // Redirect after 1 second
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-80"
      >

        <h2 className="text-2xl font-bold text-center mb-4">
          Signup
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Signup
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-3 text-blue-500">
            {message}
          </p>
        )}

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;