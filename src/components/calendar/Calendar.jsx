import React, { useState } from 'react';
import './Calendar.css';
import { MONTH_NAMES } from '../../constants';
import DayBlock from './DayBlock';

const Calendar = () => {
    const currentDate = new Date();
    const [displayedMonthAsDate, setDisplayedMonthAsDate] = useState(currentDate);
    // const [isDayBlockExpanded, setIsDayBlockExpanded] = useState(false);

    // Get days in month
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(displayedMonthAsDate);
    const firstDayOfMonth = getFirstDayOfMonth(displayedMonthAsDate);
    const monthNames = MONTH_NAMES;

    // Navigation handlers
    const prevMonth = () => {
        setDisplayedMonthAsDate(new Date(displayedMonthAsDate.getFullYear(), displayedMonthAsDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setDisplayedMonthAsDate(new Date(displayedMonthAsDate.getFullYear(), displayedMonthAsDate.getMonth() + 1));
    };

    // Generate calendar days
    const renderCalendarDays = () => {
        const blanks = Array(firstDayOfMonth).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const totalSlots = [...blanks, ...days];

        return totalSlots.map((day, index) => (
            <DayBlock 
                key={index}
                date={day ? new Date(displayedMonthAsDate.getFullYear(), displayedMonthAsDate.getMonth(), day) : null}
                isEmpty={!day}
            />
        ));
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={prevMonth}>&lt;</button>
                <h2>{`${monthNames[displayedMonthAsDate.getMonth()]} ${displayedMonthAsDate.getFullYear()}`}</h2>
                <button onClick={nextMonth}>&gt;</button>
            </div>

            <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-days">
                {renderCalendarDays()}
            </div>
        </div>
    );
};

export default Calendar;
