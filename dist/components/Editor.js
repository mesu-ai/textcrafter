import React, { useRef } from 'react';
import Toolbar from './Toolbar';
import '../styles/editor.css';
const Editor = () => {
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
        else if (command === 'insertHTML' && value) {
            editor.innerHTML += value;
        }
        else {
            document.execCommand(command, false, value || '');
        }
        editor.focus(); // Keep focus on the editor
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                var _a, _b;
                const img = document.createElement('img');
                img.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                (_b = editorRef.current) === null || _b === void 0 ? void 0 : _b.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    };
    return (React.createElement("div", { id: "editor-container", className: 'editor-canvas' },
        React.createElement(Toolbar, { onCommand: applyCommand }),
        React.createElement("div", { className: "content-area", ref: editorRef, contentEditable: true, onDrop: handleDrop, onDragOver: (e) => e.preventDefault() })));
};
export default Editor;
