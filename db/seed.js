const client = require('./client.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS calendar;
      DROP TABLE IF EXISTS events;
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

      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        name VARCHAR(50) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        picture VARCHAR(255) UNIQUE,
        creator_id INT NOT NULL REFERENCES users(id)
      );

      CREATE TABLE calendar (
        id SERIAL PRIMARY KEY,
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

  console.log('Ending session...')
  await client.end();
}

seeder();