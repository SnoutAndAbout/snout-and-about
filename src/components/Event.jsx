import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const Event = () => {
  let { eventId } = useParams();
  const [ event, setEvent] = useState({});
  const [ cityName , setCityName ] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getEvent = async(id) => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/event/${id}`);
      const event = await response.json();
      const response2 = await fetch(`https://snout-and-about.onrender.com/api/city/${event.location}`)
      const name = await response2.json();
      setCityName(name);
      setEvent(event);
    }
    getEvent(eventId);
  },[eventId])


  const book = async() => {
    try {
      const response = await fetch(`https://snout-and-about.onrender.com/api/calendar`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "token": token
        },
        body:JSON.stringify({"eventId": event.id})
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {
      (event.id && cityName.name)?
      <div id='event'>
        <h1>{event.name}</h1>
        <h2>{(new Date(event.date)).toDateString()}</h2>
        <h2>in {cityName.name}</h2>
        {
          event.picture?
          <img src={event.picture}></img>
          :
          <></>
        }
        <p>{event.description}</p>
        {token ? <button onClick={book}>Add to your calendar!</button>:<></>}
      </div>
      :
      <p>Loading event details...</p>
    }
    
    </>
  )
}

export default Event
