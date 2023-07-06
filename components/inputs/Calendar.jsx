'use client'

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Calendar = ({
    value,
    disabledDates,
    onChange,

}) => {
    return (
        <DateRange
            rangeColors={['#262626']}
            ranges={[value]}
            date={new Date()}
            onChange={(value) => onChange(value)}
            direction='vertical'
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    )
};
export default Calendar;