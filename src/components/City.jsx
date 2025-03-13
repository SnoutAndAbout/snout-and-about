import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const City = () => {
  let { cityName } = useParams();
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    const getEvents = async() => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/events/${cityName}`);
      const jsonObj = await response.json();
    }
  }, [cityName])

  return (
    <>
    
    </>
  )
}

export default City