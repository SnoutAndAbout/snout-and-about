import React, { useState } from 'react';
import Calendar from 'react-calendar';



const Calendars = ({events}) => {

const [value, setValue] = useState(new Date());

const onChange = (nextValue) => {
  setValue(nextValue);
}

const isSameDay = (a, b) => {
  return (a.getFullYear()===b.getFullYear())&&(a.getMonth()===b.getMonth())&&(a.getDate()===b.getDate());
}

const tileContent = ({date, view}) => {
  if(view === 'month') {
    for(const event in events){
      if (isSameDay(new Date(events[event].date), date)){
        return '➊';
      }
    }
    // if(datesToAddContentTo.find(dDate => isSameDay(dDate[0], date))) {
    //   return dDate[1];
    // }
  }
}
  return (
    <Calendar
      onChange={onChange}
      value={value}
      tileContent={tileContent}
    />
  )
}

export default Calendars
