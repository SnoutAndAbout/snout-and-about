import React, { useState } from "react";

const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      const response = await fetch("https://snout-and-about.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          username: user.username,
          password: user.password,
        }),
      });
  
      const text = await response.text();
  
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text);
      }
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Registration complete!");
        setUser({ username: "", password: "", name: "" });
      } else {
      }
    } catch (error) {
      if (error.message.includes("duplicate key value violates unique constraint \"users_username_key\"")) {
        setError("Username already exists. Please choose a different one.");
      } else {
        setError(error.message || "User registration failed.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <label>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <button>Register</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateUser;
