import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {useState} from 'react';
import '../stylesheets/JournalCalendar.css';
function JournalCalendar({journals}){
    const [date,setDate] = useState(new Date());
     const mockDates = ["Fri Jul 23 2021","Tue Jul 20 2021"]
    // const datesWithJournals = journals.map((j)=>j.date);
return(
    <Calendar 
    tileClassName={({date})=>mockDates.includes(date.toDateString()) ? 'journal':null}
    onChange={setDate}
    value={date}
    tileDisabled={({date}) => !mockDates.includes(date.toDateString())}/>
)
}
export default JournalCalendar