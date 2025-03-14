import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const City = () => {
  let { cityId } = useParams();
  const [ cityName , setCityName ] = useState({})
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    const getEvents = async() => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/events/${cityId}`);
      const jsonObj = await response.json();
      setEvents(jsonObj);
    }
    const getCityName = async() => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/city/${cityId}`)
      const jsonObj = await response.json();
      setCityName(jsonObj);
    }
    getCityName();
    getEvents();
  }, cityId)

  return (
    <>
      {
        cityName.name?
        <h1>{cityName.name}</h1>
        :
        <>
          <p>Finding your city....</p>
        </>
      }
      {
        events[0]?
        <div id='event-calendar'>
          <ul>
            {
              events.map((event) => {
                return (
                  <div key={event.id}>
                    <li>{event.name}</li>
                  </div>
                )
              })
            }
          </ul>
        </div>
        :
        <>
          <p>No events here yet....</p>
        </>
      }
    
    </>
  )
}

export default City