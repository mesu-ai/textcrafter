import React, { DragEvent, FC, useRef } from 'react';
import Toolbar from './Toolbar';
import '../styles/editor.css';

const Editor: FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

const applyCommand = (command: string, value?: string) => {
    if (command === 'createLink' && value) {
        document.execCommand('createLink', false, value);
    } else if (command === 'insertImage' && value) {
        document.execCommand('insertImage', false, value);
    } else if (command === 'insertHTML' && value) {
        document.execCommand('insertHTML', false, value);
    } else {
        document.execCommand(command, false, value || '');
    }
    editorRef.current?.focus(); // Keep focus on the editor
};


  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;
        editorRef.current?.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <Toolbar onCommand={applyCommand} />
      <div
        ref={editorRef}
        contentEditable
        className='editor-canvas'
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          minHeight: '300px',
          border: '1px solid #ddd',
          padding: '10px',
        }}
      >
        {/* Content here */}
      </div>
    </div>
  );
};

export default Editor;
