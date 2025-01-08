import React, { useState } from "react";
import './TaskManager.css';

function TaskManager() {
    // State management for different types of tasks and calendar
    const [dailyTasks, setDailyTasks] = useState([]);
    const [leftoverTasks, setLeftoverTasks] = useState([]);
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [reminder, setReminder] = useState('');

    // Task input states
    const [newTask, setNewTask] = useState('');
    const [newTaskCount, setNewTaskCount] = useState('');
    const [newTaskUnit, setNewTaskUnit] = useState('');
    const [isDaily, setIsDaily] = useState(false);

    // Modified task creation function
    const addNewTask = () => {
        if (newTask.trim()) {
            const taskObj = {
                text: newTask,
                completed: false,
                hasCounter: !!newTaskCount,
                targetCount: newTaskCount ? parseInt(newTaskCount) : null,
                currentCount: 0,
                unit: newTaskUnit,
                isDaily: isDaily,
            };
            
            
            if (isDaily) {
                setDailyTasks([...dailyTasks, taskObj]);
            } else {
                setTodaysTasks([...todaysTasks, taskObj]);
            }
            
            setNewTask('');
            setNewTaskCount('');
            setNewTaskUnit('');
            setIsDaily(false);
        }
    };

    // Add progress to counter task
    const updateTaskCount = (index, increment) => {
        const updatedTasks = [...todaysTasks];
        const task = updatedTasks[index];
        
        if (increment) {
            task.currentCount = Math.min(task.currentCount + 1, task.targetCount);
        } else {
            task.currentCount = Math.max(task.currentCount - 1, 0);
        }
        
        task.completed = task.currentCount >= task.targetCount;
        setTodaysTasks(updatedTasks);
    };

    return (
        <div className="task-manager">
            {/* Modified task input section */}
            <div className="task-input-section">
                <input 
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <input 
                    type="number"
                    value={newTaskCount}
                    onChange={(e) => setNewTaskCount(e.target.value)}
                    placeholder="Count (optional)"
                    className="count-input"
                />
                <input 
                    type="text"
                    value={newTaskUnit}
                    onChange={(e) => setNewTaskUnit(e.target.value)}
                    placeholder="Unit (e.g., pushups)"
                    className="unit-input"
                />
                <div className="daily-checkbox">
                    <input 
                        type="checkbox"
                        id="isDaily"
                        checked={isDaily}
                        onChange={(e) => setIsDaily(e.target.checked)}
                    />
                    <label htmlFor="isDaily">Make Daily Task</label>
                </div>
                <button onClick={addNewTask}>Add Task</button>
            </div>

            {/* Tasks Container */}
            <div className="tasks-grid">
                {/* Today's Tasks */}
                <div className="task-container">
                    <h2>Today's Tasks</h2>
                    <ul>
                        {todaysTasks.map((task, index) => (
                            <li key={index}>
                                <input 
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => {
                                        const updatedTasks = [...todaysTasks];
                                        updatedTasks[index].completed = !task.completed;
                                        setTodaysTasks(updatedTasks);
                                    }}
                                />
                                {task.hasCounter ? (
                                    <div className="counter-task">
                                        <span className={task.completed ? 'completed' : ''}>
                                            {task.text} ({task.currentCount}/{task.targetCount} {task.unit})
                                        </span>
                                        <div className="counter-controls">
                                            <button 
                                                onClick={() => updateTaskCount(index, false)}
                                                className="counter-btn"
                                            >
                                                -
                                            </button>
                                            <button 
                                                onClick={() => updateTaskCount(index, true)}
                                                className="counter-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <span className={task.completed ? 'completed' : ''}>
                                        {task.text}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Leftover Tasks */}
                <div className="leftover-task-container">
                    <h2>Leftover Tasks</h2>
                    <ul>
                        {leftoverTasks.map((task, index) => (
                            <li key={index}>
                                <input type="checkbox" />
                                {task.text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Modified Daily Tasks section */}
                <div className="daily-task-container">
                    <h2>Daily Tasks</h2>
                    <ul>
                        {dailyTasks.map((task, index) => (
                            <li key={index}>
                                <input 
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => {
                                        const updatedTasks = [...dailyTasks];
                                        updatedTasks[index].completed = !task.completed;
                                        setDailyTasks(updatedTasks);
                                    }}
                                />
                                {task.hasCounter ? (
                                    <div className="counter-task">
                                        <span className={task.completed ? 'completed' : ''}>
                                            {task.text} ({task.currentCount}/{task.targetCount} {task.unit})
                                        </span>
                                        <div className="counter-controls">
                                            <button 
                                                onClick={() => updateTaskCount(index, false)}
                                                className="counter-btn"
                                            >
                                                -
                                            </button>
                                            <button 
                                                onClick={() => updateTaskCount(index, true)}
                                                className="counter-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <span className={task.completed ? 'completed' : ''}>
                                        {task.text}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TaskManager;