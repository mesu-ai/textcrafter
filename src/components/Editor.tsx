//scr/components/Editor.tsx

import React, { DragEvent, FC, FormEvent, useEffect, useRef } from 'react';
import Toolbar from './Toolbar';
import '../styles/editor.css';

export interface EditorProps {
  value: string;
  isServer?: boolean;
  customEditorClass?: string;
  customToolbarClass?: string;
  handleImageUpload?: (file: File) => Promise<string>;
  handleImageDelete?: (src: string) => Promise<void>;
  onChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({value, onChange, isServer = false, customEditorClass, customToolbarClass, handleImageUpload, handleImageDelete}) => {
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


  const handleDrop = async (e: DragEvent<HTMLDivElement>, isServer: boolean) => {
    
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    console.log({isServer, handleImageUpload})

    if (isServer && handleImageUpload) {
      const editor = editorRef.current;
      if (!editor) return;
      editor.focus();

      const promises = files.map(async (file) => {
        const imageUrl = await handleImageUpload(file);
        const imgHtml = `<div class="image-container" contenteditable="false"><img src="${imageUrl}" alt="Uploaded Image"/><button class="remove-image-button">x</button></div>`;
        applyCommand("insertHTML", imgHtml);
      });
      await Promise.all(promises);
      onChange(editor.innerHTML);

    } else {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = document.createElement("img");
          img.src = event.target?.result as string;
          editorRef.current?.appendChild(img);
          onChange(editorRef.current?.innerHTML || "");
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

  // Container level click handler to prevent form submission
  // const handleContainerClick = (e: React.MouseEvent) => {
  //   const target = e.target as HTMLElement;
  //   if (target.closest('.toolbar')) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  // };

  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".toolbar")) {
      e.preventDefault();
      e.stopPropagation();
    } else if (target.classList.contains("remove-image-button")) {
      const imageContainer = target.closest(".image-container");
      if (imageContainer) {
        imageContainer.remove();
        onChange(editorRef.current?.innerHTML || "");
        // Optionally, send a request to delete the image from the server
        const imgSrc = imageContainer.querySelector("img")?.src;
        if (isServer && handleImageDelete && imgSrc) {
          handleImageDelete(imgSrc);
        }
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
      className={`editor-canvas ${customEditorClass ? customEditorClass : 'default-editor-canvas'}`}
      onClick={handleContainerClick}
    >
      <Toolbar onCommand={applyCommand} customToolbarClass={customToolbarClass}/>
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