import React from "react";
import '../css/Home.css';
import Registration from "./Registration";

const Home = () => {
  return (
   
      <main>
        <h2>Home Page</h2>
        <div class="registration">
          <Registration/>
        </div>
        
        <div>
          <h3>Cities:</h3>
          <div>

          </div>
        </div>

       
        <button>Post an Event</button>
      </main>
    
  );
};

export default Home;
