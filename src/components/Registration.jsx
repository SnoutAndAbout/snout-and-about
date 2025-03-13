import React, { useState } from "react";

const createUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://snout-and-about.onrender.com/api/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        username: user.username,
        password: user.password,
      }),
    });

    const data = await response.json();
    console.log("User Registered:", data);

    setUser({
      username: "",
      password: "",
      name: "",
    });
  };

  return (
    <div>
      <h2>Register</h2>
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
    </div>
  );
};

export default createUser;