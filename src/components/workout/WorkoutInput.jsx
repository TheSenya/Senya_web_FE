import React, { useState } from 'react';
import './WorkoutInput.css';
import { EXERCISE_LIST } from '../../constants';

const WorkoutInput = ({ setAddingWorkout }) => {
    const [workoutName, setWorkoutName] = useState('');
    const [reps, setReps] = useState([0]);
    const [weight, setWeight] = useState([0]);
    const [sets, setSets] = useState([]);
    const [currentSet, setCurrentSet] = useState(0)
    const [isSplitSet, setIsSplitSet] = useState(false)

    const [unit, setUnit] = useState('lb');

    function previewOfSets() {
        for (let i = 0; i > 1; i++);
    }

    // function setInputFieldtoSpan(){
    //     currHTML = ''
    //     for (let i = 0; i < currentSet; i++){
    //         if(i < currentSet){
    //             currHTML += 
    //         }
    //     }

    //     if(sets.length > currentSet){
    //     }

    // }

    const handleAddSet = () => {
        console.log('add set')
        const set = {
            reps: reps,
            weight: weight,
            isSplitSet: isSplitSet
        }
        setSets([...sets, set])
        setCurrentSet(sets.length)
        setReps([0])
        setWeight([0])
        setIsSplitSet(false)
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

                {sets.map((set, index) => (
                    <div key={index} className='previous-set-container'>
                        <div className='set-view'>
                            <span>Set: {index + 1}</span>
                            <span>Reps: {set.reps}</span>
                            <span>Weight: {set.weight}</span>
                        </div>
                        <div className='edit-previous-set-container'>
                            <button >
                                edit
                            </button>
                            <button >
                                delete
                            </button>
                        </div>
                    </div>
                ))}

                <div className='set-input-container'>

                    <div className='set-input'>
                        <div>

                        </div>
                        <span>Set: {currentSet + 1}</span>
                        <input type="number" min="0" placeholder='Reps' onChange={(e) => setReps(e.target.value)} />
                        <input type="number" min="0" placeholder='Weight' onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className='new-set-input-container'>
                        <button onClick={handleAddSet}>
                            add set
                        </button>
                    </div>
                </div>

                <div className='button-container'>
                    <div className='unit-switch-container'>

                        <button className={`unit-button ${unit === 'kg' ? 'active' : ''}`} onClick={() => setUnit('kg')}>kg</button>
                        <button className={`unit-button ${unit === 'lb' ? 'active' : ''}`} onClick={() => setUnit('lb')}>lb</button>
                    </div>
                    <div className='split-set-switch-container'>
                        <input
                            type="checkbox"
                            onChange={(e) => setIsSplitSet(e.target.value)}
                        />
                        <span> is SplitSet?</span>
                    </div>
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