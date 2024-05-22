import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Simulate existing users
const existingUsers = [{ email: "existinguser@example.com" }];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (!email.includes("@")) {
      alert('Email must have "@"');
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 6 characters long, include a lowercase letter, an uppercase letter, and a symbol (@#$%^&*()_)"
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if user exists
    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      alert("The User already exists");
      return;
    }

    // Prepare the payload for the API request
    const payload = {
      name,
      email,
      password,
      appType: "bookingportals",
    };

    try {
      // Make the API request using fetch
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            projectID: "f06ayebgsdfx5", // Replace with your actual project ID
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the token is returned in the response

        // Store the token in localStorage
        localStorage.setItem("token", token);
        console.log(data);

        alert("Registered successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("There was an error registering the user!", error);
      alert("There was an error registering the user!");
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
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 shadow-md rounded"
      >
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Email id*"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Choose new Password *"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Confirm Password *"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          Register
        </button>
        <p className="mt-4">
          Already a Customer?{" "}
          <Link to="/login" className="text-orange-500">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
