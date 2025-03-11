const client = require('./client.js');

const createEvent = async(date,name,description,picture=null,creatorId) => {
  try {
    if(picture){
      const { rows } = await client.query(`
        INSERT INTO events (date,name,description,picture,creator_id)
        VALUES ('${date}','${name}','${description}','${picture}','${creatorId}')
        RETURNING *;
      `);
      return rows[0];
    }else{
      const { rows } = await client.query(`
        INSERT INTO events (date,name,description,creator_id)
        VALUES ('${date}','${name}','${description}','${creatorId}')
        RETURNING *;
      `);
      return rows[0];
    }
  } catch (error) {
    throw new Error(error);
  }
}

const deleteEvent = async(eventId) => {
  try {
    await client.query(`
      DELETE FROM events WHERE id=${eventId};
    `);
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createEvent,
  deleteEvent
}