import { useState } from "react";

const Post =()=>{
  const [date, setDate] = useState (Date.now())
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [picture, setPicture] = useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const token=localStorage.getItem("token")
    // const response = await fetch(`http://localhost:3000/api/events`,{
    const response = await fetch(`https://snout-and-about.onrender.com/api/events`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "token": token
      },
      body:JSON.stringify({"date":date,"name":name, "description":description, "location":location, "picture":picture})
    })
    console.log(response)
    const result=await response.json()
    console.log(result)
  }

  return (
    <>
    <form onSubmit={handleSubmit}>

      <input 
      type="date"
      value={date}
      onChange={(e)=>setDate(e.target.value)}/>

      <input 
      type="text"
      value={name} 
      placeholder="Event Name"
      onChange={(e)=>setName(e.target.value)}/>

      <input 
      type = "text"
      placeholder="Event Description"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}/> 

      <input 
      type="text"
      placeholder="Location"
      value={location}
      onChange={(e)=>setLocation(e.target.value)}/>   

      <input 
      type="text"
      placeholder="Image URL"
      value={picture}
      onChange={(e)=>setPicture(e.target.value)}/>
      <button>Submit Event</button>

    </form>
    </>
  )
}

export default Post