const client = require('./client.js');
const { updateCalendar } = require('./calendar.js');


const createEvent = async( date, name, description, location, creatorId, picture=null) => {
  try {
    if(picture){
      const { rows } = await client.query(`
        INSERT INTO events (date,name,description,location,picture,creator_id)
        VALUES ('${date}','${name}','${description}','${location}','${picture}',${creatorId})
        RETURNING *;
      `);
      const event = rows[0];
      await updateCalendar( event.id, event.creator_id);
      return event;
    }else{
      const { rows } = await client.query(`
        INSERT INTO events (date,name,description,location,creator_id)
        VALUES ('${date}','${name}','${description}','${location}',${creatorId})
        RETURNING *;
      `);
      const event = rows[0];
      await updateCalendar( event.name, event.id, event.creator_id);
      return event;
    }
  } catch (error) {
    throw new Error(error);
  }
}

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

const whereEvents = async() => {
  try {
    const {rows} = await client.query(`
      SELECT DISTINCT location FROM events;
    `);
    return rows.map((x)=>x.location);
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
  whereEvents
}