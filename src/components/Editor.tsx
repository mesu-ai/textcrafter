import React, { FC, useRef } from 'react';

const Editor: FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={editorRef} contentEditable className="editor-canvas">
            {/* Editable content */}
        </div>
    );
};

export default Editor;