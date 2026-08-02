import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  
  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Receive HttpOnly Cookie
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
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
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >

        <h2 className="text-2xl font-bold text-center mb-4">
          Login
        </h2>

        
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

       
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

       
        {message && (
          <p className="text-center text-red-500 mt-3">
            {message}
          </p>
        )}

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold"
          >
            Signup
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;