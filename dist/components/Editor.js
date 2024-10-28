import React, { useRef } from 'react';
import Toolbar from './Toolbar';
const Editor = () => {
    const editorRef = useRef(null);
    //   const applyCommand = (command: string, value?: string) => {
    //     if (command === 'createLink') {
    //       const url = prompt('Enter the URL:', 'https://') || undefined; // Convert null to undefined
    //       if (url) {
    //         document.execCommand('createLink', false, url);
    //       }
    //     } else if (command === 'insertImage') {
    //       const imageUrl = prompt('Enter the image URL:', 'https://') || undefined; // Convert null to undefined
    //       if (imageUrl) {
    //         document.execCommand('insertImage', false, imageUrl);
    //       }
    //     } else if (command === 'insertHTML' && value) {
    //       document.execCommand('insertHTML', false, value);
    //     } else {
    //       document.execCommand(command, false, value || '');
    //     }
    //     editorRef.current?.focus(); // Keep focus on the editor
    //   };
    const applyCommand = (command, value) => {
        var _a;
        if (command === 'createLink' && value) {
            document.execCommand('createLink', false, value);
        }
        else if (command === 'insertImage' && value) {
            document.execCommand('insertImage', false, value);
        }
        else if (command === 'insertHTML' && value) {
            document.execCommand('insertHTML', false, value);
        }
        else {
            document.execCommand(command, false, value || '');
        }
        (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.focus(); // Keep focus on the editor
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
    return (React.createElement("div", null,
        React.createElement(Toolbar, { onCommand: applyCommand }),
        React.createElement("div", { ref: editorRef, contentEditable: true, className: 'editor-canvas', onDrop: handleDrop, onDragOver: (e) => e.preventDefault(), style: {
                minHeight: '300px',
                border: '1px solid #ddd',
                padding: '10px',
            } })));
};
export default Editor;
