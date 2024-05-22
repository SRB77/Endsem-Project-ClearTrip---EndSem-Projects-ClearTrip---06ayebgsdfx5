import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    // Prepare the payload for the API request
    const payload = {
      email,
      password,
      appType: "bookingportals",
    };

    try {
      // Make the API request using fetch
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            projectID: "06ayebgsdfx5", // Replace with your actual project ID
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the token is returned in the response

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Update authentication state
        setIsAuthenticated(true);

        // Show success toast notification
        toast.success("Logged in successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect to home page or another protected route
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("There was an error logging in the user!", error);
      alert("There was an error logging in the user!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <nav className="flex justify-between mb-4">
        <div>
          <Link to="/login" className="mr-4 text-orange-500">
            Login
          </Link>
          <Link to="/register" className="text-orange-500">
            Register
          </Link>
        </div>
      </nav>
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Email id"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          Log In
        </button>
        <p className="mt-4">
          New User?{" "}
          <Link to="/register" className="text-orange-500">
            Create Account
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
