const client = require('./client.js');
const { createUser, loginUser, validateUser} = require('./users.js');
const { fetchEvents, localEvents, createEvent, deleteEvent } = require('./events.js');
const { updateCalendar } = require('./calendar.js')
const { addCity, cityCheck } = require('./cities.js')

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS calendar;
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS cities;
      DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(60) NOT NULL,
        name VARCHAR(30)
      );

      CREATE TABLE cities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL,
        state VARCHAR(30) NOT NULL
      );

      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        name VARCHAR(50) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        location INT NOT NULL REFERENCES cities(id),
        picture VARCHAR(255) UNIQUE,
        creator_id INT NOT NULL REFERENCES users(id)
      );

      CREATE TABLE calendar (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(50) NOT NULL,
        event_id INT NOT NULL REFERENCES events(id),
        user_id INT NOT NULL REFERENCES users(id)
      );
    `);
  } catch (error) {
    console.log(error);
  }
}


const seeder = async() => {
  console.log('Connecting to client...')
  await client.connect();
  console.log('Connected!')

  console.log('Dropping tables...');
  await dropTables();
  console.log('Dropped!')

  console.log('Generating Tables...');
  await createTables();
  console.log('Generated!');

  console.log('Creating dummy users....');
  const user1 = await createUser('user1', 'testtest','test ter');
  const user2 = await createUser('testUser', 'password','User Test');
  const user3 = await createUser('johnDoe', 'johndoe','John Doe');
  console.log('Users Created!')

  console.log('Loggin in...');
  await loginUser('user1','testtest');
  console.log('Logged in!')

  console.log('Creating the first city...');
  await cityCheck('Denver, CO');
  console.log('City Added!');

  console.log('Creating an event...')
  const event1 = await createEvent('11/03/2025','First day of coding.','Lets get this baby started!','New York City, New York',1);
  const event2 = await createEvent('11/04/2025','Second day of coding.','we are started!', 'Joliet, Illinois',2);
  const event3 = await createEvent('11/05/2025','Third day of coding.','starting the started!', 'Phoenix, Arizona',3);
  console.log('Event Created!');

  console.log('updating calendar')
  const calendar1 = await updateCalendar("Kevins calendar", event1.id, 1)
  const calendar2 = await updateCalendar("jerrys calendar", event2.id, 2)
  const calendar3 = await updateCalendar("marks calendar", event3.id, 3)
  console.log('calendar updated')

  console.log('Ending session...')
  await client.end();
}

seeder();