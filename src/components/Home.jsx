import React from "react";
import { Link } from "react-router-dom";
import '../css/Home.css';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav>
        <h1>Snout And About</h1>
        <ul>
          <li><Link to="/map">Map</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/forum">Forum</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/login">Signup / Sign in</Link></li>
        </ul>
      </nav>

      {/* Home Page Content */}
      <main>
        <h2>Home Page</h2>
        
        {/* Map Placeholder */}
        <div>
          <h3>Map</h3>
          <p>[Map will be displayed here]</p>
        </div>

        {/* Make Post Button */}
        <button>Make Post</button>
      </main>
    </div>
  );
};

export default Home;
