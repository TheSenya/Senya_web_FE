import React, { useState } from 'react';
import './DayBlockExpanded.css';
import WorkoutInput from '../workout/WorkoutInput';

const DayBlockExpanded = ({ date, onClose }) => {
    const [addingWorkout, setAddingWorkout] = useState(false);

    const addWorkout = () => {
        setAddingWorkout(true);
        console.log("adding workout", addingWorkout);
    }

    function addWorkoutHandler() {
        if (addingWorkout) {
            return <WorkoutInput setAddingWorkout={setAddingWorkout} />;
        }
        return null;
    }

    return (
        <div className="day-block-expanded-overlay" onClick={onClose}>
            <div className="day-block-expanded" onClick={e => e.stopPropagation()}>
                
                <div className="day-block-expanded-header">
                    <div className="day-block-expanded-header-left">
                        <div className="day-block-expanded-date">
                            <span className="day-details">
                            {date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        </div>
                    </div>
                    <div className="day-block-expanded-header-right">
                        <button className="add-workout-button" onClick={addWorkout}>
                            <span>Add Workout</span>
                        </button>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                </div>
                <div className="day-block-expanded-body">
                    <div className="day-block-expanded-workout">
                        <span>Workout</span>
                    </div>
                    {addWorkoutHandler()}
                </div>
                <div className="day-block-expanded-footer">
                    <div className="day-block-expanded-notes">
                        <span>Notes</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DayBlockExpanded;