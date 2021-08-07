import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import '../stylesheets/JournalCalendar.css';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core/';

function JournalCalendar({ journals, handleDateSelection }) {
    const [date, setDate] = useState(null);
    const validDates = journals.map((j) => j.date.toDateString());
    const handleClear = () => {
        setDate(null);
        console.log('clear');
        handleDateSelection(null);
    };
    const handleSelect = (date) => {
        setDate(date);
        handleDateSelection(date);
    };
    return (
        <Box
            height='100%'
            display='flex'
            justifyContent='flex-start'
            flexDirection='column'
            textAlign='center'
        >
            <Box>
                <Calendar
                    tileClassName={({ date }) =>
                        validDates.includes(date.toDateString())
                            ? 'journal'
                            : null
                    }
                    onChange={handleSelect}
                    value={date}
                    tileDisabled={({ date }) =>
                        !validDates.includes(date.toDateString())
                    }
                />
            </Box>
            <Box>
                    <Button
                        id='clear_selection_button'
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={handleClear}
                    >
                        Clear Selection
                    </Button>
            </Box>
        </Box>
    );
}
export default JournalCalendar;
