import React, { useRef } from 'react';
const Editor = () => {
    const editorRef = useRef(null);
    return (React.createElement("div", { ref: editorRef, contentEditable: true, className: "editor-canvas" }));
};
export default Editor;
