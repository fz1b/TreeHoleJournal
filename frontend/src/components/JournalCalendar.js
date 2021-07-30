import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import '../stylesheets/JournalCalendar.css';
import Button from '@material-ui/core/Button';
function JournalCalendar({ journals,handleDateSelection }) {
    const [date, setDate] = useState(null);
    const validDates = journals.map((j)=>j.date.toDateString());
    const handleClear =()=>{
        setDate(null);
        console.log("clear")
        handleDateSelection(null);
    }
    const handleSelect = (date)=>{
        setDate(date);
        handleDateSelection(date);
    }
    return (
        <>
            <Calendar
                tileClassName={({ date }) =>
                validDates.includes(date.toDateString()) ? 'journal' : null
                }
                onChange={handleSelect}
                value={date}
                tileDisabled={({ date }) =>
                    !validDates.includes(date.toDateString())
                }
            />
            <div id='clear_selection_button'>
                <Button variant='contained' color='primary' size='small' onClick={handleClear}>
                    Clear Selection
                </Button>
            </div>
        </>
    );
}
export default JournalCalendar;
