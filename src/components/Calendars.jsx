import React, { useState } from 'react';
import { Link } from "react-router-dom"
import Calendar from 'react-calendar';

const Calendars = ({ events }) => {

  const isSameDay = (a, b) => {
    return (a.getFullYear() === b.getFullYear()) && (a.getMonth() === b.getMonth()) && (a.getDate() === b.getDate());
  }

  const isSameMonth = (a, b) => {
    return (a.getFullYear() === b.getFullYear()) && (a.getMonth() === b.getMonth());
  }

  const [value, setValue] = useState(new Date());
  const [dayEvents, setDayEvents] = useState(events.filter((event) => isSameDay(new Date(), new Date(event.date))));


  const onChange = (nextValue) => {
    setValue(nextValue);
    const todays = events.filter((event) => isSameDay(nextValue, new Date(event.date)))
    setDayEvents(todays);
  }



  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      for (const event in events) {
        if (isSameDay(new Date(events[event].date), date)) {
          return '🕮';
        }
      }
    }
    if (view == 'year') {
      for (const event in events) {
        if (isSameMonth(new Date(events[event].date), date)) {
          return '🕮';
        }
      }
    }
  }
  return (
    <div id='calendar'>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent}
        minDetail='year'
        onViewChange={()=> {setValue(new Date())}}
      />
      <div id='day-display'>
        <h3>{value.toDateString()}</h3>
        {
          dayEvents[0] ?

            <ul id='event list'>
              {
                dayEvents.map((event) => {
                  return (
                    <li>
                      <h5>{event.name}</h5>
                      <p>{event.description}</p>
                      <Link to={`/events/${event.id}`}>Event Page</Link>
                    </li>
                  )
                })

              }
            </ul>
            :
            <>
              <p>
                No events today
              </p>
            </>
        }
      </div>
    </div>

  )
}

export default Calendars
