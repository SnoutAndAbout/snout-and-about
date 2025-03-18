const { createUser, loginUser, validateUser, fetchUsers} = require('./db/users.js');
const { fetchEvents, localEvents, createEvent, deleteEvent, viewEvent, whereEvents } = require('./db/events.js');
const { updateCalendar, cancelEvent , myCalendar } = require('./db/calendar.js')
const { fetchCities, cityCheck, cityName } = require('./db/cities.js');


const client = require('./db/client.js');
client.connect();

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

//MIDDLEWARE

app.use(express.static(path.join(__dirname, `dist`)));
app.use(express.json());
app.use(cors());


//      GET REQUESTS      //
//GET ALL EVENTS//
app.get('/api/events', async(req,res) => {
  try {
    const events = await fetchEvents();
    res.send(events);
  } catch (error) {
    res.send(error.message)
  }
})
//GET A EVENT//
app.get('/api/event/:eventId', async(req,res) => {
  const { eventId } = req.params;
  try {
    const event = await viewEvent(eventId);
    res.send(event);
  } catch (error) {
    res.send(error.message)
  }
})
//GET EVENTS BY REGION USING CITY ID// 
app.get('/api/events/:cityId', async(req,res) => {
  const { cityId } = req.params;
  try {
    const events = await localEvents(cityId);
    res.send(events);
  } catch (error) {
    res.send(error.message);
  }
})
//GET CALENDAR EVENTS BY USER//
app.get('/api/calendar/:userId', async(req,res) => {
  const { userId } = req.params;
  try {
    const events = await fetchEvents();
    const calendar = await myCalendar(userId);
    calendar = calendar.map((entry)=> { return entry.event_id });
    events = events.filter((event) => calendar.includes(event.id));
    res.send(events);
  } catch (error) {
    res.send(error.message);
  }
})
//GET CITIES WITH EVENTS//
app.get('/api/cities', async(req,res) => {
  try {
    const cities = await fetchCities();
    res.send(cities);
  } catch (error) {
    throw new Error(error);
  }
})
//GET A CITIES NAME FROM ITS ID//
app.get('/api/city/:id', async(req,res) => {
  const { id } = req.params;
  try {
    const cityObj = await cityName(id);
    res.send(cityObj);
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
})
//GET ALL THE USERS//
app.get('/api/users', async(req,res) => {
  try {
    const users = await fetchUsers();
    const data = users.map((user)=>{return { "id":user.id,"username":user.username,"name":user.name}})
    res.send(data);
  } catch (error) {
    throw new Error(error);    
  }
});
//GET ONE USER//
app.get('/api/me', async(req,res) => {
  try {
    const { token } = req.headers;
    const user = await validateUser(token);
    res.send(user);
  } catch (error) {
    throw new Error(error);    
  }
});
//DEFAULT//
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//     POST Requests      //
//USER LOGIN 
app.post('/api/auth/login', async (req, res) => {
  try{
  const { username, password } = req.body; 
  const authToken = await loginUser(username, password);
  res.send({token: authToken});
} catch(err){
  res.send(err.message);
}
})
//USER REGISTRATION
app.post('/api/auth/register', async (req, res, next) => {
  try{
    const { username, password, name } = req.body; 
    const registeredUserToken = await createUser(username, password, name);
    res.send({token: registeredUserToken});
  } catch (err) {
    res.send(err.message);
  }
})
//POST EVENT
app.post('/api/events', async(req,res,next) => {
  try {
    const { date, name, description, location, picture} = req.body;
    const { token } = req.headers;
    const userData = await validateUser(token);
    if(userData){
      const event = await createEvent(date,name,description,location,userData.id,picture);
      res.status(201).send(event);
    }else{
      throw new Error('Bad Token');
    }
       
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
})


//    PUT REQUESTS    //
//Add event to calendar//
app.put('/api/calendar', async(req,res,next) => {
  try {
    const { eventId } = req.body;
    const { token } = req.headers;
    const userData = await validateUser(token);
    const event = await viewEvent(eventId);
    if(userData){
      await updateCalendar(event.name, eventId, userData.id);
      res.status(201).send('Event Added');
    }else{
      throw new Error('Bad Token');
    }
       
  } catch (error) {
    console.log(error);
  }
})


//      DELETE REQUESTS      //
//DELETE EVENT//
app.delete('/api/events', async(req,res,next) => {
  try {
    const { eventId } = req.body;
    const { token } = req.headers;
    const userData = await validateUser(token);
    if(userData){
      await deleteEvent(eventId);
      res.status(200).send('Event Deleted');
    }else{
      throw new Error('Bad Token')
    } 
  } catch (error) {
    console.log(error);
  }
})
//DELETE USER//
app.delete('/api/users', async(req,res,next) => {
  try {
    const { token } = req.headers;
    const userData = await validateUser(token);
    if(userData){
      await deleteEvent(userData.Id);
      res.status(200).send('User Deleted');
    }else{
      throw new Error('Bad Token')
    }
  } catch (error) {
    throw new Error(error);
  }
})



app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}`);
});
