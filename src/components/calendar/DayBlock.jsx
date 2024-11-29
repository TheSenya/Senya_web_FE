import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DayBlockExpanded from './DayBlockExpanded';
import './DayBlock.css';

const DayBlock = ({date, isEmpty}) => {
    const [isDayBlockExpanded, setIsDayBlockExpanded] = useState(false);

    if (isEmpty) {
        return <div className="day-block empty" />;
    }

    useEffect(() => {
        if (isDayBlockExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isDayBlockExpanded]);

    return (
        <>
            <div 
                className={`day-block ${isDayBlockExpanded ? 'expanding' : ''}`}
                onClick={() => setIsDayBlockExpanded(true)}
            >
                <div className="day-block-header">
                    <div className="day-block-date">
                        <span className="day-number">{date.getDate()}</span>
                    </div>
                </div>
                <div className="day-block-body">
                    <div className="day-block-workout">
                        <span>Workout</span>
                    </div>
                </div>
                <div className="day-block-footer">
                    <div className="day-block-notes">
                        <span>Notes</span>
                    </div>
                </div>
            </div>
            {isDayBlockExpanded && createPortal(
                <DayBlockExpanded 
                    date={date}
                    onClose={() => setIsDayBlockExpanded(false)}
                />,
                document.body
            )}
        </>
    );
};

export default DayBlock;