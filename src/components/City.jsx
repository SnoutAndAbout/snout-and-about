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
      const response = await fetch(`https://snout-and-about.onrender.com/api/events/region/api/city/${cityId}`)
      const jsonObj = await response.json();
      setCityName(jsonObj);
    }
    getCityName();
    getEvents();
  }, [cityId])

  return (
    <>
      {
        cityName?
        <h1>{cityName}</h1>
        :
        <></>
      }
      {
        events?
        <div id='event-calendar'>
          <ul>
            {
              events.map((event) => {
                return (
                  <li>{event.name}</li>
                )
              })
            }
          </ul>
        </div>
        :
        <></>
      }
    
    </>
  )
}

export default City