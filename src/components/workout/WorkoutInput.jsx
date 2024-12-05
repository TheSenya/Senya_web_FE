import React, { useState } from 'react';
import './WorkoutInput.css';
import { EXERCISE_LIST } from '../../constants';

const WorkoutInput = ({ setAddingWorkout }) => {
    const [workoutName, setWorkoutName] = useState('');
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [currentSet, setCurrentSet] = useState(1)
    const [isSplitSet, setIsSplitSet] = useState(false)

    const [unit, setUnit] = useState('lb');

    function previewOfSets() {
        for (let i = 0; i > 1; i++);
    }

    return (
        <div className='workout-creator-container'>

            <div className="workout-input-container">
                <div className='workout-name-container'>
                    <span> workout name</span>
                    <div className="workout-name-input">
                        <input type="text" placeholder="Workout Name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
                    </div>
                </div>

                <div className='workout-set-input'>

                </div>

                <div className='set-input-container'>
                    <div className='set-input'>
                        <span>Set: {currentSet}</span>
                        <input type="number" placeholder='Reps' />
                        <input type="number" placeholder='Weight' />
                        <div classname='unit-switch-container'>

                            <button className={`unit-button ${unit === 'kg' ? 'active' : ''}`} onClick={() => setUnit('kg')}>kg</button>
                            <button className={`unit-button ${unit === 'lb' ? 'active' : ''}`} onClick={() => setUnit('lb')}>lb</button>
                        </div>

                    </div>

                    <input
                        type="checkbox"
                        onChange={(e) => setIsSplitSet(e.target.value)}
                    />
                    <span> is SplitSet?</span>

                </div>
                <div className='button-container'>
                    <div className="save-button">
                        <button>Save</button>
                    </div>
                    <div className="cancel-button">
                        <button onClick={() => setAddingWorkout(false)}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className='workout-preview-container'>
                <span>Preview</span>
                <div className='workout-preview'>
                    <span>
                        {workoutName}
                    </span>
                </div>



            </div>
        </div>

    );
};

export default WorkoutInput;