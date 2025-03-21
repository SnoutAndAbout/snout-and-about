import { useEffect, useState } from "react"
import Calendars from "./Calendars";

const Account = ()=>{
  const [ myEvents, setMyEvents ] = useState([]);
  const [ user, setUser] = useState({'key':'yep'})
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getData = async() => {
      const response = await fetch(`https://snout-and-about.onrender.com/api/me`, {
        method: "GET",
        headers: {"token":token}
      });
      console.log(response);
      const jsonObj = await response.json();
      console.log(jsonObj);
      setUser(jsonObj);
      console.log('id',jsonObj.id);
      const eventResponse = await fetch(`https://snout-and-about.onrender.com/api/calendar/${jsonObj.id}`);
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
        <p>You currently have no events.</p>
        </>
      }
    </>
  )
}

export default Account
