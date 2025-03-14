import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Event = () => {
  let { eventId } = useParams();
  const [ event, setEvent] = useState({});
  const [ cityName , setCityName ] = useState({})

  useEffect(() => {
    const getEvent = async(id) => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/event/${id}`);
      const event = await response.json();
      const response2 = await fetch(`https://snout-and-about.onrender.com/api/city/${jsonObj.location}`)
      const name = await response2.json();
      setCityName(name);
      setEvent(event);
    }
    getEvent(eventId);
  },eventId)


  return (
    <>
    {
      (event.id && cityName.name)?
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