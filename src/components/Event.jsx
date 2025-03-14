import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Event = () => {
  let { eventId } = useParams();
  const [ event, setEvent] = useState({});
  const [ cityName , setCityName ] = useState({})

  useEffect(() => {
    const getEvent = async(id) => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/events/${id}`);
      const jsonObj = await response.json();
      setEvent(jsonObj);
    }
    const getCityName = async(cityId) => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/city/${cityId}`)
      const jsonObj = await response.json();
      setCityName(jsonObj);
    }
    getEvent(eventId);
    getCityName(event.location);
  },eventId)


  return (
    <>
    {
      (event.id && cityName)?
      <div id='event'>
        <h1>{event.name}</h1>
        <h2>in {cityName.name} at {event.date}</h2>
        {
          event.picture?
          <img src={event.picture}></img>
          :
          <></>
        }
        <p>{event.description}</p>
      </div>
      :
      <p>Loading event details...</p>
    }
    
    </>
  )
}

export default Event