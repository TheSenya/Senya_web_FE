import React, { useState } from 'react';
import './WorkoutInput.css';
import { EXERCISE_LIST } from '../../constants';

const WorkoutInput = ({setAddingWorkout}) => {
    const [workoutName, setWorkoutName] = useState('');
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);

    
    return (
        <div className="workout-input-container">
            <div className="workout-name-input">
                <input type="text" placeholder="Workout Name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
            </div>
            <div className="reps-input">
                <input type="number" placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} min="0" />
            </div>
            <div className="sets-input">
                <input type="number" placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} min="0" />
            </div>
            <div className="save-button">
                <button>Save</button>
            </div>
            <div className="cancel-button">
                <button onClick={() => setAddingWorkout(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default WorkoutInput;