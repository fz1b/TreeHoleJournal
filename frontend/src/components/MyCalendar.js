import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const StyledCalendarDiv = styled.div`
    & .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active,
    .react-calendar__tile--active:enabled:focus {
        background: #3c7891;
    }
    & .react-calendar__tile--now,
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #b3d7e8;
    }

    & .react-calender {
        margin-top: 20px;
        margin-bottom: 20px;
    }
`;
function MyCalendar() {
    const [value, onChange] = useState(new Date());
    return (
        <StyledCalendarDiv>
            <Calendar
                onChange={onChange}
                value={value}
                className='react-calender'
            />
        </StyledCalendarDiv>
    );
}
export default MyCalendar;
