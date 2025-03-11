const { createUser, loginUser, validateUser} = require('./db/users.js');
const { fetchEvents, localEvents, createEvent } = require('./db/events.js');


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
app.get('/api/events', async(req,res) => {
  try {
    const events = fetchEvents();
    res.send(events);
  } catch (error) {
    res.send(error.message)
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

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}`);
});
