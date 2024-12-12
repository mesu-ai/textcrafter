import React, { DragEvent, FC, FormEvent, useEffect, useRef } from 'react';
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

    try {

      if (command === 'createLink' && value) {
        document.execCommand('createLink', false, value);
      } else if (command === 'insertImage' && value) {
        document.execCommand('insertImage', false, value);
      } else if (command === 'formatBlock' && value) {
        document.execCommand('formatBlock', false, value);
      } else if (command === 'insertHTML' && value) {

        console.log({value})
       // Detect whether the operation is table creation or general HTML insertion
      if (value.includes('<table id="editor-custom-table"')) {
        // Insert table at the end of the editor content
        editor.innerHTML += value;
      } else {
        // Insert other HTML at the current cursor position
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);

        if (range) {
          range.deleteContents();
          const fragment = range.createContextualFragment(value);
          range.insertNode(fragment);

          // Adjust selection to move the cursor after the inserted content
          const newRange = document.createRange();
          newRange.setStartAfter(fragment.lastChild!);
          newRange.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(newRange);
        }
      }
      } else {
        document.execCommand(command, false, value || '');
      }
      editor.focus();
  
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    } catch (error) {
      console.error('Error applying command:', error);
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

  const handleInput = (e:FormEvent<HTMLDivElement>) => {
    e.preventDefault(); 

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

// Container level click handler to prevent form submission
const handleContainerClick = (e: React.MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.closest('.toolbar')) {
    e.preventDefault();
    e.stopPropagation();
  }
};

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div id="editor-container" className='editor-canvas' onClick={handleContainerClick}>
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
