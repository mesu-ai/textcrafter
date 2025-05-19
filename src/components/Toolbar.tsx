//src/components/Toolbar.tsx

import React, { FC, useEffect, useState } from 'react';
import '../styles/editor.css';
import AlignLeftIcon from '../assets/icons/AlignLeftIcon';
import AlignCenterIcon from '../assets/icons/AlignCenterIcon';
import AlignRightIcon from '../assets/icons/AlignRightIcon';
import AlignJustifyIcon from '../assets/icons/AlignJustifyIcon';
import ListBulletIcon from '../assets/icons/ListBulletIcon';
import ListNumberIcon from '../assets/icons/ListNumberIcon';
import LinkAddIcon from '../assets/icons/LinkAddIcon';
import LinkRemoveIcon from '../assets/icons/LinkRemoveIcon';
import InsertImageIcon from '../assets/icons/InsertImageIcon';
import UndoIcon from '../assets/icons/UndoIcon';
import RedoIcon from '../assets/icons/RedoIcon';
import TableIcon from '../assets/icons/TableIcon';
import ClearFormatIcon from '../assets/icons/ClearFormatIcon';
import { addColumn, addRow, removeColumn, removeRow } from '../utils/commands';
import { customTable, tableCell, tableHeaderCell } from '../utils/constant';
import FolderIcon from '../assets/icons/FolderIcon';
import AttachIcon from '../assets/icons/AttachIcon';

export interface ToolbarProps {
  customToolbarClass?: string;
  onCommand: (command: string, value?: string) => void;
  onInsertImageFromDevice?: (file: File) => void;
  onInsertImageFromURL?: (url: string) => void;
}

interface TableSelectorProps {
  onTableCreate: (rows: number, cols: number) => void
}


const TableSelector: FC<TableSelectorProps> = ({ onTableCreate }) => {
  const [hoveredRow, setHoveredRow] = useState(0);
  const [hoveredCol, setHoveredCol] = useState(0);

  const handleSellHover = (row: number, col: number) => {
    setHoveredRow(row);
    setHoveredCol(col);
  }

  const handleCellClick = () => {
    onTableCreate(hoveredRow + 1, hoveredCol + 1);
  }

  return (
    <div className='table-selector'>
      {[...new Array(8)].map((_, row) => (
        <div key={`row-${row}`} className='table-selector-row'>
          {[...new Array(8)].map((_, col) => (
            <div key={`col-${col}`} className={`table-selector-cell ${row <= hoveredRow && col <= hoveredCol ? 'highlighted' : ''}`} onMouseEnter={() => handleSellHover(row, col)} onClick={handleCellClick}
            />
          ))}
        </div>
      ))}

      <div className="table-selector-label">
        {hoveredRow + 1} x {hoveredCol + 1}
      </div>
    </div>
  )
}


const Toolbar: FC<ToolbarProps> = ({ onCommand, customToolbarClass, onInsertImageFromDevice, onInsertImageFromURL }) => {
  const [activeFormats, setActiveFormats] = useState<{ [key: string]: boolean }>({});
  const [imageURL, setImageURL] = useState<string>('');
  const [insertURL, setInsertURL] = useState<string>('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  const isSelectAlign = activeFormats.justifyLeft || activeFormats.justifyCenter || activeFormats.justifyRight || activeFormats.justifyFull;

  
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();
      setSavedSelection(range);
      
      // Also save the selected text for display
      setSelectedText(selection.toString());
      
      // Apply highlight to the selected text temporarily
      if (!document.getElementById('temp-selection-highlight')) {
        // Create a temporary style element
        const style = document.createElement('style');
        style.id = 'temp-selection-highlight';
        style.innerHTML = `
          .temp-selection-highlight {
            background-color: rgba(41, 119, 255, 0.2);
            border-radius: 2px;
          }
        `;
        document.head.appendChild(style);
      }
      
      // Create a temporary span to highlight the selection
      const span = document.createElement('span');
      span.className = 'temp-selection-highlight';
      span.id = 'current-selection-highlight';
      
      // Store the current selection contents in the span
      // First, remove any existing highlights
      const existingHighlight = document.getElementById('current-selection-highlight');
      if (existingHighlight) {
        const parent = existingHighlight.parentNode;
        while (existingHighlight.firstChild) {
          parent?.insertBefore(existingHighlight.firstChild, existingHighlight);
        }
        parent?.removeChild(existingHighlight);
      }
      
      try {
        range.surroundContents(span);
      } catch (e) {
        console.warn('Could not highlight complex selection (likely spans multiple elements)', e);
      }
    }
  };

  // Enhanced restoreSelection function
  const restoreSelection = () => {
    if (savedSelection) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedSelection.cloneRange());
      
      // Remove the temporary highlight
      setTimeout(() => {
        const highlight = document.getElementById('current-selection-highlight');
        if (highlight) {
          const parent = highlight.parentNode;
          while (highlight.firstChild) {
            parent?.insertBefore(highlight.firstChild, highlight);
          }
          parent?.removeChild(highlight);
        }
      }, 0);
      
      return true;
    }
    return false;
  };

  // Function to clear selection highlight and state
  const clearSelection = () => {
    setSavedSelection(null);
    setSelectedText('');
    
    // Remove the temporary highlight
    const highlight = document.getElementById('current-selection-highlight');
    if (highlight) {
      const parent = highlight.parentNode;
      while (highlight.firstChild) {
        parent?.insertBefore(highlight.firstChild, highlight);
      }
      parent?.removeChild(highlight);
    }
  };


  const createTableHTML = (rows: number, cols: number) => {
    
    let tableHTML = `<div style="overflow-x: auto; max-width: 100%;"><table id="editor-custom-table" style="${customTable}"><thead><tr>`;
  
    for (let j = 0; j < cols; j++) {
      tableHTML += `<th style="${tableHeaderCell}">Header ${j + 1}</th>`;
    }
  
    tableHTML += `</tr></thead><tbody>`;
  
    for (let i = 0; i < rows - 1; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < cols; j++) {
        tableHTML += `<td style="${tableCell}">Cell ${i + 1}-${j + 1}</td>`;
      }
      tableHTML += '</tr>';
    }
  
    tableHTML += `</tbody></table></div>`;
  
    return tableHTML;
  };

  const handleTableCreate = (rows: number, cols: number) => {
    onCommand('insertHTML', createTableHTML(rows, cols));
  };

  const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
    let debounceTimer: number;
    return function (this: any, ...args: Parameters<F>) {
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => func.apply(this, args), delay);
    }
  }

  const detectFormatting = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
  
    const range = selection.getRangeAt(0);
    let node = range.startContainer as HTMLElement;
  
    // If the node is a text node, get its parent element
    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentElement!;
    }
  
    // Initialize the new active formats object
    const newActiveFormat: { [key: string]: boolean } = {};
  
    // Helper function to check if an ancestor node matches a tag name
    const hasAncestor = (node: Node | null, tagName: string): boolean => {
      while (node && node !== document.body) {
        if ((node as HTMLElement).tagName === tagName) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    };
  
    // Check for bold formatting
    newActiveFormat.bold = hasAncestor(node, 'B') || hasAncestor(node, 'STRONG') ||
      window.getComputedStyle(node).fontWeight === '700';
  
    // Check for italic formatting
    newActiveFormat.italic = hasAncestor(node, 'I') || hasAncestor(node, 'EM') ||
      window.getComputedStyle(node).fontStyle === 'italic';
  
    // Check for underline formatting
    newActiveFormat.underline = hasAncestor(node, 'U') ||
      window.getComputedStyle(node).textDecorationLine.includes('underline');
  
    // Check for strikethrough formatting
    newActiveFormat.strikeThrough = hasAncestor(node, 'S') || hasAncestor(node, 'STRIKE') ||
      window.getComputedStyle(node).textDecorationLine.includes('line-through');
  
    // Check for text alignment
    const textAlign = window.getComputedStyle(node).textAlign;
    newActiveFormat.justifyLeft =  textAlign === 'left';
    newActiveFormat.justifyCenter = textAlign === 'center';
    newActiveFormat.justifyRight = textAlign === 'right';
    newActiveFormat.justifyFull = textAlign === 'justify';
  
    // Check for unordered list
    newActiveFormat.insertUnorderedList = hasAncestor(node, 'UL');
  
    // Check for ordered list
    newActiveFormat.insertOrderedList = hasAncestor(node, 'OL');
  
    setActiveFormats(newActiveFormat);
  };

  useEffect(() => {
    const debounceDetectFormatting = debounce(detectFormatting, 200);
    document.addEventListener('selectionchange', debounceDetectFormatting);
    return () =>
      document.removeEventListener('selectionchange', debounceDetectFormatting);
  }, []);


  return (
    <div id="toolbar" className={`toolbar ${customToolbarClass ? customToolbarClass : 'default-toolbar-class'}`} onClick={(e) => e.stopPropagation()}>
      
      {/* Font Family and Size */}
      <div id="font-group" className="toolbar-group">
        <select onChange={(e) => { e.preventDefault(); onCommand('fontName', e.target.value); }} role='combobox'>
          <option value="">Font Family</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Times New Roman">T New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select onChange={(e) => { e.preventDefault(); onCommand('fontSize', e.target.value); }}>
          <option value="">Font Size</option>
          <option value="1">Tiny</option>
          <option value="2">Small</option>
          <option value="3">Regular</option>
          <option value="4">Medium</option>
          <option value="5">Large</option>
          <option value="6">E.Large</option>
          <option value="7">Huge</option>
        </select>
      </div>

      {/* Text Formatting */}
      <div id="text-formatting-group" className="toolbar-group">
        <button type="button" onClick={() => onCommand('bold')} style={{ fontWeight: '700' }} className={activeFormats.bold ? 'active' : ''} aria-label='Bold'>B</button>
        <button type="button" onClick={() => onCommand('italic')} className={activeFormats.italic ? 'active' : ''} style={{ fontStyle: 'italic' }} aria-label='Italic'>I</button>
        <button type="button" onClick={() => onCommand('underline')} className={activeFormats.underline ? 'active' : ''} style={{ textDecoration: 'underline' }} aria-label='Underline'>U</button>
        <button type="button" onClick={() => onCommand('strikeThrough')} className={activeFormats.strikeThrough ? 'active' : ''} style={{ textDecoration: 'line-through' }} aria-label='strikeThrough'>abc</button>
        <button type="button" onClick={() => onCommand('removeFormat')} title='Clear Formatting'><ClearFormatIcon className='button-icon' /></button>
      </div>

      {/* Text Color and Background Color */}
      <div id="color-group" className="toolbar-group">
         <label className='color-picker'>A
           <input type="color" onChange={(e) =>{ e.preventDefault();  e.stopPropagation(); onCommand('foreColor', e.target.value);  }} onMouseDown={(e) => e.preventDefault()} title="Text Color" />
         </label>
        <label className='color-picker'>H
          <input type="color" onChange={(e) => { e.preventDefault(); e.stopPropagation(); onCommand('hiliteColor', e.target.value); }} onMouseDown={(e) => e.preventDefault()} title="Highlight Color" />
        </label> 
      </div>

      
      {/* Text Alignment */}
      <div id="alignment-group" className="toolbar-group">
        <div className='alignment-container'>
          <button type='button' className={isSelectAlign ? "active" : ''}> { 
            activeFormats?.justifyLeft ? 
            <AlignLeftIcon className="button-icon" /> : activeFormats?.justifyCenter ? 
            <AlignCenterIcon className="button-icon" /> : activeFormats?.justifyRight ?
            <AlignRightIcon className="button-icon" /> : activeFormats?.justifyFull ?
            <AlignJustifyIcon className="button-icon" /> : <AlignLeftIcon className="button-icon" />
          }</button>
          <div className="alignment-selector-container">
            <div className='alignment-selector-show'>
              <div className='alignment-option-button'>
                <button type="button" onClick={() => onCommand('justifyLeft')} className={activeFormats.justifyLeft ? 'active' : ''}><AlignLeftIcon className="button-icon" /></button>
                <button type="button" onClick={() => onCommand('justifyCenter')} className={activeFormats.justifyCenter ? 'active' : ''}><AlignCenterIcon className="button-icon" /></button>
                <button type="button" onClick={() => onCommand('justifyRight')} className={activeFormats.justifyRight ? 'active' : ''}><AlignRightIcon className="button-icon" /></button>
                <button type="button" onClick={() => onCommand('justifyFull')} className={activeFormats.justifyFull ? 'active' : ''}><AlignJustifyIcon className="button-icon" /></button>
              </div>
            </div>
          </div >
        </div>
      </div>

      {/* List Options */}
      <div id="list-group" className="toolbar-group">
        <button type="button" onClick={() => onCommand('insertUnorderedList')} className={activeFormats.insertUnorderedList ? 'active' : ''}><ListBulletIcon className="button-icon" /></button>
        <button type="button" onClick={() => onCommand('insertOrderedList')} className={activeFormats.insertOrderedList ? 'active' : ''}><ListNumberIcon className="button-icon" /></button>
      </div>

       {/* Table Option */}
      <div id="table-group" className="toolbar-group">
        <div className="table-container">
          <button type="button"><TableIcon className="button-icon" /></button>
          <div className="table-selector-container">
            <div className='table-selector-show'>
              <TableSelector onTableCreate={handleTableCreate} />
              <div className='table-option-button'>
                <button type="button" onClick={() => addRow()} value="addRow">Add Row</button>
                <button type="button" onClick={() => removeRow()} value="removeRow">Remove Row</button>
                <button type="button" onClick={() => addColumn()} value="addColumn">Add Column</button>
                <button type="button" onClick={() => removeColumn()} value="removeColumn">Remove Column</button>
                <button type="button" onClick={() => onCommand('insertHorizontalRule')} value="horizontalLine">Horizontal Line</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link and Image Insertion */}
       <div id="link-image-group" className="toolbar-group">
        <div id="link">
          <button 
            type="button" 
            className="link-selector-button"
          >
            <LinkAddIcon className="button-icon" />
          </button>
          <div className="link-selector-container">
            <div className='link-selector-show'>
              <div className='link-insert-option'>
                {selectedText && (
                  <div className='link-selected-text'>
                    <span> Linking: {selectedText.length > 20 ? `${selectedText.substring(0, 20)}...` : selectedText}</span>
                    <button type="button" className='link-unselect-button' onClick={clearSelection}>✕</button>
                  </div>
                )}
                <div className='link-insert-url'>
                  <input 
                    type="url" 
                    placeholder="URL" 
                    onChange={(e) => setInsertURL(e.target.value)}
                    onClick={(e) => e.stopPropagation()} 
                    onFocus={saveSelection}
                  />
                  <button 
                    type="button" 
                    className='link-insert-url-button' 
                    onClick={() => {
                      if (insertURL && onCommand && restoreSelection()) {
                        onCommand('createLink', insertURL);
                        document.querySelector<HTMLInputElement>('.link-insert-url input')!.value = '';
                        setInsertURL('');
                        clearSelection(); // Clear the selection after applying
                      }
                    }}
                  >
                    <AttachIcon className='button-icon'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => onCommand('unlink')}><LinkRemoveIcon className="button-icon" /></button>
        <div id="image">
          <button type="button" className="image-selector-button"><InsertImageIcon className="button-icon" /></button>
          <div className="image-selector-container">
            <div className='image-selector-show'>
              <div className='image-option-button'>
                 <label htmlFor="file-upload" className="custom-file-upload">
                  <div className='image-insert-button' title='Browse Folder'><FolderIcon className='button-icon'/></div>
                  <input accept="image/*" type="file" id="file-upload" 
                    onChange={ (e) => {
                    const file = e.target.files?.[0];
                    if(file && onInsertImageFromDevice){
                      onInsertImageFromDevice(file);
                      e.target.value = '';
                    }
                  }} 
                   />
                </label>
                
                <div className='image-insert-url'>
                  <input type="url" placeholder="Image URL" onBlur={(e) => { setImageURL(e.target.value); }} />
                  <button type="button" className='image-insert-url-button' onClick={()=>{
                    if (imageURL && onInsertImageFromURL) {
                      onInsertImageFromURL(imageURL);
                      document.querySelector<HTMLInputElement>('.image-insert-url input')!.value = '';
                      setImageURL('');
                    }
                  }}><AttachIcon className='button-icon'/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Headings and Block Styles */}
      <div id="block-style-group" className="toolbar-group">
        <select onChange={(e) => { e.preventDefault(); onCommand('formatBlock', e.target.value); }}>
          <option value="p">Normal Text</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="blockquote">Blockquote</option>
          <option value="pre">Code Block</option>
        </select>
      </div>

      <div id="symbol-group" className="toolbar-group">
        <div className="symbol-container">
          <button type="button">Symbols</button>
          <div className="symbol-selector-container">
            <div className='symbol-selector-show'>
              <div className='symbol-option-button'>
                <button type="button" onClick={() => onCommand('insertHTML', '&copy;')}>©</button>
                <button type="button" onClick={() => onCommand('insertHTML', '&euro;')}>€</button>
                <button type="button" onClick={() => onCommand('insertHTML', '&trade;')}>™</button>
                <button type="button" onClick={() => onCommand('insertHTML', '&#10077;')}>❝</button>
                <button type="button" onClick={() => onCommand('insertHTML', '&#10078;')}>❞</button>
                <button type="button" onClick={() => onCommand('insertHTML', '&#10003;')}>✓</button>
                <button type="button" onClick={() => onCommand('insertHTML', '😊')}>😊</button>
                <button type="button" onClick={() => onCommand('insertHTML', '👍')}>👍</button>
                <button type="button" onClick={() => onCommand('insertHTML', '🎉')}>🎉</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Undo and Redo */}
      <div id="undo-redo-group" className="toolbar-group">
        <button type="button" onClick={() => onCommand('undo')}><UndoIcon className="button-icon" /></button>
        <button type="button" onClick={() => onCommand('redo')}><RedoIcon className="button-icon" /></button>
      </div>

    </div>
  );
};

export default Toolbar;
