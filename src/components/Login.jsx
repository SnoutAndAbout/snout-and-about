import React, { useState } from "react";
import Registration from "./Registration";
import '../css/Home.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
     
    try {
      const response = await fetch("https://snout-and-about.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      console.log("User Logged In:", data);

      localStorage.setItem("token", data.token); 

      setMessage("Login successful!");
      setCredentials({ username: "", password: "" });
      window.location.href = "/home"; 

    } catch (err) {
      setError(err.message || "An error occurred, please try again.");
    }
  };

  return (
    <div class="home">
      <h2>Register New User</h2>
       <div className="registration">
                <Registration/>
              </div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button classtype="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
