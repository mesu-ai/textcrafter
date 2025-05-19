//scr/components/Editor.tsx

import React, { DragEvent, FC, FormEvent, useEffect, useRef } from "react";
import Toolbar from "./Toolbar";
import "../styles/editor.css";

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
          if (value) {
            document.execCommand("createLink", false, value);
            const sel = window.getSelection();
            if (sel && sel.anchorNode?.parentElement?.tagName === "A") {
              const anchor = sel.anchorNode.parentElement as HTMLAnchorElement;
              anchor.title = value;
              anchor.target = "_blank";
            }
          }
          break;
        case "insertImage":
          console.log("insertImage", value);
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

      if (!range) return;

      range.deleteContents();
      const fragment = range.createContextualFragment(value);
      range.insertNode(fragment);

      const lastNode = fragment.lastChild || fragment.firstChild;

      if (lastNode && lastNode.parentNode) {
        const newRange = document.createRange();
        newRange.setStartAfter(lastNode);
        newRange.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(newRange);
      }
    }
  };

  const handleListInsertion = (command: string, listStyleType: string) => {
    document.execCommand(command);
    const selection = window.getSelection();
    if(!selection || selection.rangeCount === 0) return;
    
    const range = selection?.getRangeAt(0);
    let node = range.commonAncestorContainer as HTMLElement

    // If node is a text node, get its parent
    if (node.nodeType === Node.TEXT_NODE){
      node = node.parentElement!;
    }

    // Find the closest list element (UL or OL)
    let listElement = node;
    while (
      listElement &&
      !(listElement.tagName === "UL" || listElement.tagName === "OL") &&
      listElement.parentElement &&
      listElement !== editorRef.current
    ) {
      listElement = listElement.parentElement!;
    }

    if (
      listElement &&
      (listElement.tagName === "UL" || listElement.tagName === "OL")
    ) {

    const listStyles = `
      margin: 10px 0px 10px 20px;
      padding-left: 0;
      list-style-position: inside;
      list-style-type: ${listStyleType};
    `;
      listElement.setAttribute("style", listStyles);

      const listItems = listElement.querySelectorAll("li");
      listItems.forEach((item) => {
         item.setAttribute("style", "margin: 4px 0; padding: 0;");
      });
    }
  };

  const handleInsertImageFromURL = (imageURL: string) => {
    const editor = editorRef.current;
    if (!editor || !imageURL) return;
    editor.focus();
    const imgHtml = `<div class="image-container" contenteditable="false"><img src="${imageURL}" alt="Uploaded Image"/></div>`;
    applyCommand("insertHTML", imgHtml);
    onChange(editor.innerHTML);
  };

  const handleInsertImageFromDevice = async (file: File) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    if (isServer && handleImageUpload) {
      const imageUrl = await handleImageUpload(file);
      const imgHtml = `<div class="image-container" contenteditable="false"><img src="${imageUrl}" alt="Uploaded Image"/></div>`;
      applyCommand("insertHTML", imgHtml);
      onChange(editor.innerHTML);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        const imgHtml = `<div class="image-container" contenteditable="false"><img src="${base64Url}" alt="Uploaded Image"/></div>`;
        applyCommand("insertHTML", imgHtml);
        onChange(editor?.innerHTML || "");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const overlay = document.getElementById("editor-drop-overlay");
    if (overlay) overlay.style.display = "flex";
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const overlay = document.getElementById("editor-drop-overlay");
    if (overlay) overlay.style.display = "none";
  };

  const handleDrop = async (
    e: DragEvent<HTMLDivElement>,
    isServer: boolean
  ) => {
    e.preventDefault();
    const overlay = document.getElementById("editor-drop-overlay");
    if (overlay) overlay.style.display = "none";

    const files = Array.from(e.dataTransfer.files);

    const editor = editorRef.current;

    if (!editor || files.length === 0) return;
    editor.focus();
    const file = files[0];
    if (!file.type.startsWith("image/")) return;

    if (isServer && handleImageUpload) {
      const imageUrl = await handleImageUpload(file);
      const imgHtml = `<div class="image-container" contenteditable="false"><img src="${imageUrl}" alt="Uploaded Image"/></div>`;
      applyCommand("insertHTML", imgHtml);
      onChange(editor.innerHTML);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        const imgHtml = `<div class="image-container" contenteditable="false"><img src="${base64Url}" alt="Uploaded Image"/></div>`;
        applyCommand("insertHTML", imgHtml);
        onChange(editor?.innerHTML || "");
      };
      reader.readAsDataURL(file);
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
      onChange(editorRef.current ? editorRef.current.innerHTML : "");

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
      className={`editor-canvas ${isEditable ? "editor-canvas-editable" : ""} ${
        customEditorClass ?? "default-editor-canvas"
      }`}
      onClick={handleContainerClick}
    >
      <Toolbar
        onCommand={applyCommand}
        onInsertImageFromDevice={handleInsertImageFromDevice}
        onInsertImageFromURL={handleInsertImageFromURL}
        customToolbarClass={customToolbarClass}
        
        
      />

      <div id="editor-drop-overlay" className="drop-overlay">
        Drop Your Image Here
      </div>

      <div
        id="content-area"
        ref={editorRef}
        contentEditable
        onDrop={(e) => handleDrop(e, isServer)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onInput={handleInput}
        role="textbox"
      >
        {/* Content here */}
      </div>
    </div>
  );
};

export default Editor;
