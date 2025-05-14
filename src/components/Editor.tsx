//scr/components/Editor.tsx

import React, { DragEvent, FC, FormEvent, useEffect, useRef } from 'react';
import Toolbar from './Toolbar';
import '../styles/editor.css';

export interface EditorProps {
  value: string;
  isServer?: boolean;
  isEditable?: boolean;
  customEditorClass?: string;
  customToolbarClass?: string;
  handleImageUpload?: (file: File) => Promise<string>;
  handleImageDelete?: (src: string) => Promise<void>;
  onChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({
  value,
  onChange,
  isServer = false,
  isEditable = true,
  customEditorClass,
  customToolbarClass,
  handleImageUpload,
  handleImageDelete,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyCommand = (command: string, value?: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    try {
      switch (command) {
        case "createLink":
          value && document.execCommand("createLink", false, value);
          break;
        case "insertImage":
          value && document.execCommand("insertImage", false, value);
          break;
        case "formatBlock":
          value && document.execCommand("formatBlock", false, value);
          break;
        case "insertHTML":
          handleHTMLInsertion(editor, value);
          break;
        case "insertUnorderedList":
          handleListInsertion(command, "disc");
          break;
        case "insertOrderedList":
          handleListInsertion(command, "decimal");
          break;
        default:
          document.execCommand(command, false, value || "");
      }

      editor.focus();
      onChange(editor.innerHTML);
    } catch (error) {
      console.error("Error applying command:", error);
    }
  };

  const handleHTMLInsertion = (editor: HTMLElement, value?: string) => {
    if (!value) return;

    if (value.includes('<table id="editor-custom-table"')) {
      editor.innerHTML += value;
    } else {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      if (range) {
        range.deleteContents();
        const fragment = range.createContextualFragment(value);
        range.insertNode(fragment);

        const newRange = document.createRange();
        newRange.setStartAfter(fragment.lastChild!);
        newRange.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(newRange);
      }
    }
  };

  const handleListInsertion = (command: string, listStyleType: string) => {
    document.execCommand(command);
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    // const commonAncestorContainer = range?.commonAncestorContainer;
    let listElement = range && (range?.commonAncestorContainer as HTMLElement);
    while (
      listElement &&
      !(listElement.tagName === "UL" || listElement.tagName === "OL")
    ) {
      listElement = listElement.parentElement!;
    }

    if (
      listElement &&
      (listElement.tagName === "UL" || listElement.tagName === "OL")
    ) {
      listElement.setAttribute(
        "style",
        `list-style-position: inside; list-style-type: ${listStyleType};`
      );
    }
  };


  const handleDrop = async (
    e: DragEvent<HTMLDivElement>,
    isServer: boolean
  ) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const editor = editorRef.current;

    if (!editor) return;
    editor.focus();

    if (isServer && handleImageUpload) {
      const promises = files.map(async (file) => {
        const imageUrl = await handleImageUpload(file);
        const imgHtml = `<div class="image-container" contenteditable="false"><img src="${imageUrl}" alt="Uploaded Image"/></div>`;
        applyCommand("insertHTML", imgHtml);
        
      });
      await Promise.all(promises);
      onChange(editor.innerHTML);
    } else {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Url = event.target?.result as string;
          const imgHtml = `<div class="image-container" contenteditable="false"><img src="${base64Url}" alt="Uploaded Image"/></div>`;
          applyCommand("insertHTML", imgHtml);
          onChange(editor?.innerHTML || "");
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };


  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
  
    if (target.closest(".toolbar")) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  
    const container = target.closest(".image-container");
    if (!container) return;
  
    // Detect pseudo-element click (matches ::after zone)
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
  
    // Assume "button" zone is top-right 30x30px
    if (offsetX > rect.width - 70 && offsetY < 27) {

      container.remove();
      onChange(editorRef.current ? editorRef.current.innerHTML : '');
  
      const imgSrc = container.querySelector("img")?.src;
      if (isServer && handleImageDelete && imgSrc) {
        handleImageDelete(imgSrc);
      }
    }
  };
  
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div
      id="editor-container"
      className={`editor-canvas ${isEditable ? 'editor-canvas-editable' : ''} ${customEditorClass ?? "default-editor-canvas"}`}
      onClick={handleContainerClick}
    >
      <Toolbar
        onCommand={applyCommand}
        customToolbarClass={customToolbarClass}
      />
      <div
        id="content-area"
        ref={editorRef}
        contentEditable
        onDrop={(e) => handleDrop(e, isServer)}
        onDragOver={(e) => e.preventDefault()}
        onInput={handleInput}
        role="textbox"
      >
        {/* Content here */}
      </div>
    </div>
  );
};

export default Editor;