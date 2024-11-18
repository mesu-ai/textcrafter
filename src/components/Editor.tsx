import React, { DragEvent, FC, useEffect, useRef } from 'react';
import Toolbar from './Toolbar';
import '../styles/editor.css';

export interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
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

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
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

        onChange(editorRef.current?.innerHTML || '');
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

  return (
    <div id="editor-container" className='editor-canvas'>
      <Toolbar onCommand={applyCommand} />
      <div
        id="content-area"
        ref={editorRef}
        contentEditable
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onInput={handleInput}
      >
        {/* Content here */}
      </div>
    </div>
  );
};

export default Editor;
