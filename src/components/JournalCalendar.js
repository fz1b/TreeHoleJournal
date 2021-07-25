import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {useState} from 'react';
import '../stylesheets/JournalCalendar.css';
import Button from "@material-ui/core/Button";
function JournalCalendar({journals}){
    const [date,setDate] = useState(new Date());
     const mockDates = ["Fri Jul 23 2021","Tue Jul 20 2021"]
    // const datesWithJournals = journals.map((j)=>j.date);
return(
    <>
    <Calendar 
    tileClassName={({date})=>mockDates.includes(date.toDateString()) ? 'journal':null}
    onChange={setDate}
    value={date}
    tileDisabled={({date}) => !mockDates.includes(date.toDateString())}/>
    <div>
    <Button variant="contained"
            color="primary"
            size="small">
                Clear Selection
    </Button>
    </div>

    </>
)
}
export default JournalCalendar