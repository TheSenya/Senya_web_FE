import 'quill/dist/quill.snow.css'; // Import Quill styles
import Quill from 'quill';
import { quillModules, quillFormats } from '../../../config/quillConfig';

import React, { useRef, useEffect } from 'react';

import './QuillEditor.css'

const QuillEditor = () => {
    const editorRef = useRef(null);
    const quillInstanceRef = useRef(null); // Store the Quill instance

    useEffect(() => {
        if (editorRef.current && !quillInstanceRef.current) {
            quillInstanceRef.current = new Quill(editorRef.current, {
              theme: 'snow',
              modules: quillModules,
              formats: quillFormats,
            });
          }
        }, []);

    return (
        <div className="quill-container" ref={editorRef} style={{ height: '300px' }} />
        
        );
};

export default QuillEditor;