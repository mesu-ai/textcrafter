import React, { DragEvent, FC, useRef } from 'react';
import Toolbar from './Toolbar';
import '../styles/editor.css';

const Editor: FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyCommand = (command: string, value?: string) => {
    const editor = editorRef.current;

    if (!editor) return;

    if (command === 'createLink' && value) {
      document.execCommand('createLink', false, value);
    } else if (command === 'insertImage' && value) {
      document.execCommand('insertImage', false, value);
    } else if (command === 'formatBlock' && value) {
      document.execCommand('formatBlock', false, value);
    } else if (command === 'insertHTML' && value) {
      editor.innerHTML += value;
    } else {
      document.execCommand(command, false, value || '');
    }
    editor.focus(); // Keep focus on the editor
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
    <div id="editor-container" className='editor-canvas'>
      <Toolbar onCommand={applyCommand} />
      <div
        id="content-area"
        ref={editorRef}
        contentEditable
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Content here */}
      </div>
    </div>
  );
};

export default Editor;
