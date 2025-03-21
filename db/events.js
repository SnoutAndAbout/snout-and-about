const client = require('./client.js');
const { updateCalendar } = require('./calendar.js');
const { cityCheck } = require('./cities.js');


//CREATES A NEW EVENT, A PICTURE ENTRY IS NOT REQUIRED
const createEvent = async( date, name, description, location, creatorId, picture=null) => {
  try {
    if(picture){
      const locId = await cityCheck(location);
      const { rows } = await client.query(`
        INSERT INTO events (date,name,description,location,picture,creator_id)
        VALUES ('${date}','${name}','${description}','${locId}','${picture}',${creatorId})
        RETURNING *;
      `);
      const event = rows[0];
      await updateCalendar( event.name, event.id, event.creator_id);
      return event;
    }else{
      const locId = await cityCheck(location);
      const { rows } = await client.query(`
        INSERT INTO events (date,name,description,location,creator_id)
        VALUES ('${date}','${name}','${description}','${locId}',${creatorId})
        RETURNING *;
      `);
      const event = rows[0];
      await updateCalendar( event.name, event.id, event.creator_id);
      return event;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

//RETURNS THE ROW OF EVERY EVENT IN OUR DATABASE
const fetchEvents = async() => {
  try {
    const {rows} = await client.query(`
      SELECT * FROM events;
    `);
    return rows;
  } catch (error) {
    throw new Error(error)
  }
}

//RETURNS ROW DATA FOR SPECIFIED EVENT ID
const viewEvent = async(eventId) => {
  try {
    const {rows} = await client.query(`
      SELECT * FROM events WHERE id=${eventId};
    `);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

//RETURNS THE ROWS FOR EVENTS WITH THE SPECIFED LOCATION ID NUMBER
const localEvents = async(location) => {
  try {
    const {rows} = await client.query(`
      SELECT * FROM events WHERE location=${location};
    `);
    return rows;
  } catch (error) {
    throw new Error(error)
  }
}


const deleteEvent = async(eventId) => {
  try {
    await client.query(`
      DELETE FROM calendar WHERE event_id=${eventId};
      DELETE FROM events WHERE id=${eventId};
    `);
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createEvent,
  deleteEvent,
  fetchEvents,
  localEvents,
  viewEvent,
}
