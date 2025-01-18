import React, { useState } from 'react';
import './Note.css';
import QuillEditor from '../REUSE/quill/QuillEditor';

const Note = () => {

    return (
        <div className="">
            <div className="title-container">
                <input 
                    type="text" 
                    placeholder="Enter note title" 
                    className="note-title-input"
                />
                <button>save</button>
                <button>delete</button>
            </div>
            <div className="quill-container">
                <QuillEditor />
            </div>

        </div>

    );
};

export default Note;

