import { useEffect, useState } from "react"
import Calendars from "./Calendars";

const Account = ()=>{
  const [ myEvents, setMyEvents ] = useState([]);
  const [ user, setUser] = useState({})
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getData = async() => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/me`, {
        method: "GET",
        headers: {"token":token}
      });
      const jsonObj = await response.json();
      setUser(jsonObj);
      console.log('id',user.id);
      const eventResponse = await fetch(`https://snout-and-about.onrender.com/api/calendar/${user.id}`);
      const events = await eventResponse.json();
      setMyEvents(events);
    }
    getData();    
  }, [])


  return (
    <>
      {
        user.name?
        <div id='user-details'>
          <h1>Hello {user.name}!</h1>
        </div>
        :
        <>
        </>
      }
      {
        myEvents[0]?
        <Calendars events={myEvents} />
        :
        <>
        </>
      }
    </>
  )
}

export default Account
