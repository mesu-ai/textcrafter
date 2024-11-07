import React, { useEffect, useRef } from 'react';
import Toolbar from './Toolbar';
import '../styles/editor.css';
const Editor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const applyCommand = (command, value) => {
        const editor = editorRef.current;
        if (!editor)
            return;
        if (command === 'createLink' && value) {
            document.execCommand('createLink', false, value);
        }
        else if (command === 'insertImage' && value) {
            document.execCommand('insertImage', false, value);
        }
        else if (command === 'formatBlock' && value) {
            document.execCommand('formatBlock', false, value);
        }
        else if (command === 'insertHTML' && value) {
            editor.innerHTML += value;
        }
        else {
            document.execCommand(command, false, value || '');
        }
        editor.focus(); // Keep focus on the editor
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                var _a, _b, _c;
                const img = document.createElement('img');
                img.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                (_b = editorRef.current) === null || _b === void 0 ? void 0 : _b.appendChild(img);
                onChange(((_c = editorRef.current) === null || _c === void 0 ? void 0 : _c.innerHTML) || '');
            };
            reader.readAsDataURL(file);
        });
    };
    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);
    return (React.createElement("div", { id: "editor-container", className: 'editor-canvas' },
        React.createElement(Toolbar, { onCommand: applyCommand }),
        React.createElement("div", { id: "content-area", ref: editorRef, contentEditable: true, onDrop: handleDrop, onDragOver: (e) => e.preventDefault(), onInput: handleInput })));
};
export default Editor;
