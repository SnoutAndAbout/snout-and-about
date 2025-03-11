const client = require('./client.js');


const updateCalendar = async( eventId, userId ) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO calendar ( event_id, user_id )
      VALUES (${eventId}, ${userId})
      RETURNING *;
    `);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

const cancelEvent = async( eventId, userId ) => {
  try {
    await client.query(`
      DELETE FROM calendar WHERE event_id=${eventId} AND user_id=${userId};
    `);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  updateCalendar,
  cancelEvent
}