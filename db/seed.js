const client = require('./client.js');
const { createUser, loginUser, validateUser } = require('./users.js');
const { fetchEvents, localEvents, createEvent, deleteEvent } = require('./events.js');
const { updateCalendar } = require('./calendar.js')
const { addCity, cityCheck } = require('./cities.js')

const dropTables = async () => {
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

const createTables = async () => {
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
        name VARCHAR(50) NOT NULL,
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


const seeder = async () => {
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
  const user1 = await createUser('user1', 'testtest', 'test ter');
  const user2 = await createUser('testUser', 'password', 'User Test');
  const user3 = await createUser('johnDoe', 'johndoe', 'John Doe');
  console.log('Users Created!')

  console.log('Loggin in...');
  await loginUser('user1', 'testtest');
  console.log('Logged in!')

  console.log('Creating the first city...');
  await cityCheck('Denver, CO');
  console.log('City Added!');

  console.log('Creating an event...')
  const event1 = await createEvent("04/15/2025", "Dog Parade", "Dress up your furry friend and join us for a fun-filled dog parade! Prizes for the best costumes.", "Los Angeles, California", 1);
  const event2 = await createEvent("05/10/2025", "Paws & Play Meetup", "A fun day at the park with agility courses, treats, and socializing for dogs and owners alike.", "Austin, Texas", 2);
  const event3 = await createEvent("06/20/2025", "Doggy Ice Cream Social", "Cool off with your pup at our ice cream social featuring dog-friendly frozen treats!", "Chicago, Illinois", 3);
  const event4 = await createEvent("07/08/2025", "Beach Day with Dogs", "Sun, sand, and splashes! Bring your dog for a fun beach day with games and swimming.", "Miami, Florida", 2);
  const event5 = await createEvent("08/12/2025", "Puppy Yoga", "Relax and stretch with adorable puppies in this unique yoga session designed for both humans and dogs.", "San Francisco, California", 1);
  const event6 = await createEvent("06/08/2025", "Yappy Hour at the Park", "Unwind with fellow dog lovers at this pet-friendly happy hour featuring treats for humans and pups.", "Chicago, Illinois", 2);  
  const event7 = await createEvent("06/15/2025", "Canine Carnival", "A fun carnival for dogs with obstacle courses, treat stations, and costume contests.", "Chicago, Illinois", 3);  
  const event8 = await createEvent("06/18/2025", "Fetch & Frisbee Tournament", "Compete in a friendly frisbee and fetch competition with prizes for the top dogs.", "Chicago, Illinois", 3);  
  const event9 = await createEvent("06/25/2025", "Dog Yoga & Meditation", "Enjoy a calming yoga session designed for you and your furry companion.", "Chicago, Illinois", 2);  
  const event10 = await createEvent("06/30/2025", "Puppy Paddle Day", "Take your pup for a kayak or paddleboard ride on Lake Michigan at this dog-friendly event.", "Chicago, Illinois", 3);  

  

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
