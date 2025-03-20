import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      const response = await fetch("https://snout-and-about.onrender.com/api/cities");
      const jsonObj = await response.json();
      setCities(jsonObj);
    };
    getCities();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <main className="home-container">
      <section className="intro">
        <h1>🐾 Welcome to Snout & About! 🏙️</h1>
        <p>
          Your ultimate guide to pet-friendly adventures! Explore dog parks,  
          pet-friendly cafés, and exciting pet events happening near you.  
          Whether you want to meet fellow pet lovers or plan an outing for  
          your furry friend, we've got you covered!  
        </p>
        <p>
          Browse cities below or post your own pet-friendly event! 🐶🎉
        </p>
      </section>

      <section className="cities-section">
        {cities.length > 0 ? (
          <div className="cities-container">
            <h2>📍 Explore Cities:</h2>
            <ul className="city-list">
              {cities.map((city) => (
                <li key={city.id}>
                  <Link to={`/city/${city.id}`}>
                    {city.name}, {city.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading cities...</p>
        )}
      </section>

      
      <div className="buttons">
        <Link to="/post">
          <button className="post-btn">📢 Post an Event</button>
        </Link>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>
    </main>
  );
};

export default Home;
