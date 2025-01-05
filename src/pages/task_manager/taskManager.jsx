import React, { useState } from "react";
import './TaskManager.css';

//TODO


function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim() !== "") {
            setTasks([...tasks, {
                id: Date.now(),
                text: newTask,
                completed: false
            }]);
            setNewTask("");
        }
    };

    const toggleComplete = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId 
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            
            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="task-input"
                />
                <button type="submit" className="add-button">Add Task</button>
            </form>

            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                        />
                        <span style={{ 
                            textDecoration: task.completed ? 'line-through' : 'none'
                        }}>
                            {task.text}
                        </span>
                        <button 
                            onClick={() => deleteTask(task.id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskManager;