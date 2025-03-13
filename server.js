const { createUser, loginUser, validateUser} = require('./db/users.js');
const { fetchEvents, localEvents, createEvent, deleteEvent } = require('./db/events.js');
const { updateCalendar, cancelEvent , myCalendar } = require('./db/calendar.js')


const client = require('./db/client.js');
client.connect();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


//      GET REQUESTS      //
//DEFAULT//
app.get('/', (req, res) => {
  res.send('Welcome to Snout and About!');
})
//GET ALL EVENTS/
app.get('/api/events', async(req,res) => {
  try {
    const events = await fetchEvents();
    res.send(events);
  } catch (error) {
    res.send(error.message)
  }
})
//GET EVENTS BY REGION//
app.get('/api/events/:region', async(req,res) => {
  const { region } = req.params;
  try {
    const events = await localEvents(region);
    res.send(events);
  } catch (error) {
    res.send(error.message);
  }
})
//GET CALENDAR EVENTS BY USER//
app.get('/api/calendar/:userId', async(req,res) => {
  const { userId } = req.params;
  try {
    const events = await myCalendar(userId);
    res.send(events);
  } catch (error) {
    res.send(error.message);
  }
})



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
      const event = await deleteEvent(eventId);
      res.status(200).send(event);
    }else{
      throw new Error('Bad Token')
    } 
  } catch (error) {
    console.log(error);
  }
})

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}`);
});
