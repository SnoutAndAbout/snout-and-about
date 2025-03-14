import { React, useEffect, useState} from "react";
import { Link } from "react-router-dom"
import '../css/Home.css';
import Registration from "./Registration";

const Home = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async() => {
      const response = await fetch('https://snout-and-about.onrender.com/api/cities');
      const jsonObj = await response.json();
      setCities(jsonObj);
    }
    getCities();
  }, [])

  return (
   
      <main>
        <h2>Home Page</h2>
        <div className="registration">
          <Registration/>
        </div>
        
        <div>

          <div>
            <>
            {
              cities[0]?
              <div id="cities">
                <h3>Cities:</h3>
                <ul id='city-list'>
                  {
                    cities.map((city)=>{
                      return (
                        <div key={city.id}>
                          <li>
                            <Link to={`/city/${city.id}`}>{city.name}, {city.state}</Link>
                          </li>
                        </div>
                      )
                    })
                  }
                </ul>
              </div>
              :
              <>
              </>
            }
            
              
            </>

          </div>
        </div>

       
        <button>Post an Event</button>
      </main>
    
  );
};

export default Home;
