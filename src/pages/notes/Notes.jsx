import React, { useState } from 'react';
import './Notes.css';
import NestedNoteDirectory from '../../components/notes/NestedNoteDirectory';
import TextEditor from '../../components/notes/Note';

function Notes() {
    const [noteDirWidth, setNoteDirWidth] = useState(25);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const newWidth = Math.min(Math.max(e.clientX / window.innerWidth * 100, 10), 50);
        setNoteDirWidth(newWidth);
    };

    return (
        <div 
            className="notes-container" 
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp}
        >
            <div 
                className="note-dir-container" 
                style={{ width: `${noteDirWidth}%` }}
            >
                <NestedNoteDirectory/>
            </div>
            <div 
                className="draggable-line" 
                onMouseDown={handleMouseDown} 
                style={{ cursor: 'col-resize', width: '5px', backgroundColor: 'gray' }}
            />
            <div 
                className="text-editor-container" 
                style={{ width: `${100 - noteDirWidth}%` }}
            >
                <TextEditor/>
            </div>
        </div>
    );
}

export default Notes;