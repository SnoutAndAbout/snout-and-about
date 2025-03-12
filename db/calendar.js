const client = require('./client.js');


const updateCalendar = async( eventName, eventId, userId ) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO calendar ( event_name, event_id, user_id )
      VALUES ('${eventName}', ${eventId}, ${userId})
      RETURNING *;
    `);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

const cancelEvent = async( eventName, eventId, userId ) => {
  try {
    await client.query(`
      DELETE FROM calendar WHERE event_name= ${eventName} AND event_id=${eventId} AND user_id=${userId};
    `);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  updateCalendar,
  cancelEvent
}