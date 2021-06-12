import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../stylesheets/calenderStyle.css'
function MyCalendar(){
  const [value, onChange] = useState(new Date());
return(
  <div>
    <Calendar
      onChange={onChange}
      value={value}
      className="react-calender"
    />
  </div>
);
}
export default MyCalendar