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

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
}

interface TableSelectorProps {
  onTableCreate: (rows: number, cols: number) => void
}

const TableSelector: FC<TableSelectorProps> = ({ onTableCreate }) => {
  const [hoveredRow, setHoveredRow] = useState(0);
  const [hoveredCol, setHoveredCol] = useState(0);

  console.log({ hoveredCol, hoveredRow })

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
        <div key={row} className='table-selector-row'>
          {[...new Array(8)].map((_, col) => (
            <div key={col} className={`table-selector-cell ${row <= hoveredRow && col <= hoveredCol ? 'highlighted' : ''}`} onMouseEnter={() => handleSellHover(row, col)} onClick={handleCellClick} />
          ))}
        </div>
      ))}

      <div className="table-selector-label">
        {hoveredRow + 1} x {hoveredCol + 1}
      </div>
    </div>
  )
}

const Toolbar: FC<ToolbarProps> = ({ onCommand }) => {
  const [activeFormats, setActiveFormats] = useState<{[key:string]:boolean }>({});

  const createTableHTML = (rows: number, cols: number) => {
    console.log({ rows, cols });

    let tableHTML = '<table class="custom-table" border="1">';
    for (let i = 0; i < rows; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < cols; j++) {
        tableHTML += `<td class="table-cell">Cell</td>`;
      }
      tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    return tableHTML;
  };

  const handleTableCreate = (rows: number, cols: number) => {
    onCommand('insertHTML', createTableHTML(rows, cols));
  };

  const detectFormatting = () => {
    const newActiveFormat: { [key: string]: boolean } = {};
    newActiveFormat.bold = document.queryCommandState('bold');
    newActiveFormat.italic = document.queryCommandState('italic');
    newActiveFormat.underline = document.queryCommandState('underline');
    newActiveFormat.strikeThrough = document.queryCommandState('strikeThrough');

    setActiveFormats(newActiveFormat);
  };

  useEffect(() => {
    document.addEventListener('selectionchange', detectFormatting);
    return () =>
      document.removeEventListener('selectionchange', detectFormatting);
  }, []);



  return (
    <div id="toolbar" className="toolbar">
      {/* Font Family and Size */}
      <div id="font-group" className="toolbar-group">
        <select onChange={(e) => onCommand('fontName', e.target.value)}>
          <option value="">Font Family</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Times New Roman">T New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select onChange={(e) => onCommand('fontSize', e.target.value)}>
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
        <button onClick={() => onCommand('bold')} style={{ fontWeight: '700', color: activeFormats?.bold ? 'green' : 'black' }}>B</button>
        <button onClick={() => onCommand('italic')} style={{ fontStyle: 'italic', color: activeFormats?.italic ? 'green' : 'black'}}>I</button>
        <button onClick={() => onCommand('underline')} style={{ textDecoration: 'underline', color: activeFormats?.underline ? 'green' : 'black' }}>U</button>
        <button onClick={() => onCommand('strikeThrough')} style={{ textDecoration: 'line-through', color: activeFormats?.strikeThrough ? 'green' : 'black' }}>abc</button>
        <button onClick={() => onCommand('removeFormat')} title='Clear Formatting'><ClearFormatIcon className='button-icon' /></button>
      </div>

      {/* Text Color and Background Color */}
      <div id="color-group" className="toolbar-group">
        <input type="color" onChange={(e) => onCommand('foreColor', e.target.value)} title="Text Color" />
        <input type="color" onChange={(e) => onCommand('backColor', e.target.value)} title="Background Color" />
      </div>

      {/* Text Alignment */}
      <div id="alignment-group" className="toolbar-group">
        <button onClick={() => onCommand('justifyLeft')}><AlignLeftIcon className="button-icon" /></button>
        <button onClick={() => onCommand('justifyCenter')}><AlignCenterIcon className="button-icon" /></button>
        <button onClick={() => onCommand('justifyRight')}><AlignRightIcon className="button-icon" /></button>
        <button onClick={() => onCommand('justifyFull')}><AlignJustifyIcon className="button-icon" /></button>
      </div>

      {/* List Options */}
      <div id="list-group" className="toolbar-group">
        <button onClick={() => onCommand('insertUnorderedList')}><ListBulletIcon className="button-icon" /></button>
        <button onClick={() => onCommand('insertOrderedList')}><ListNumberIcon className="button-icon" /></button>
        {/* <button onClick={() => onCommand('insertHTML', '<ul><li>Checklist</li></ul>')}><ListCheckIcon className="button-icon" /></button> */}
        {/* <button onClick={() => addChecklist()}><ListCheckIcon className="button-icon" /></button> */}
      </div>

      <div id="table" className="toolbar-group">
        <button className="table-selector-button"><TableIcon className="button-icon" /></button>
        <div className="table-selector-container">
          <div className='table-selector-show'>
            <TableSelector onTableCreate={handleTableCreate} />
            <div className='table-option-button'>
              <button onClick={() => addRow()} value="addRow">Add Row</button>
              <button onClick={() => removeRow()} value="removeRow">Remove Row</button>
              <button onClick={() => addColumn()} value="addColumn">Add Column</button>
              <button onClick={() => removeColumn()} value="removeColumn">Remove Column</button>
              <button onClick={() => onCommand('insertHorizontalRule')} value="horizontalLine">Horizontal Line</button>
            </div>
          </div>

        </div>
      </div>

      {/* Link and Image Insertion */}
      <div id="link-image-group" className="toolbar-group">
        <button onClick={() => onCommand('createLink', prompt('Enter the URL:', 'https://') || '')}><LinkAddIcon className="button-icon" /></button>
        <button onClick={() => onCommand('unlink')}><LinkRemoveIcon className="button-icon" /></button>
        <button onClick={() => onCommand('insertImage', prompt('Enter the image URL:', 'https://') || '')}><InsertImageIcon className="button-icon" /></button>
      </div>

      {/* Headings and Block Styles */}
      <div id="block-style-group" className="toolbar-group">
        <select onChange={(e) => onCommand('formatBlock', e.target.value)}>
          <option value="p">Normal Text</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="blockquote">Blockquote</option>
          <option value="pre">Code Block</option>
        </select>
      </div>

      <div id="symbol" className="toolbar-group">
        <button className="symbol-selector-button">Symbols</button>
        <div className="symbol-selector-container">
          <div className='symbol-selector-show'>
            <div className='symbol-option-button'>
              <button onClick={() => onCommand('insertHTML', '&copy;')}>©</button>
              <button onClick={() => onCommand('insertHTML', '&euro;')}>€</button>
              <button onClick={() => onCommand('insertHTML', '&trade;')}>™</button>
              <button onClick={() => onCommand('insertHTML', '&#10077;')}>❝</button>
              <button onClick={() => onCommand('insertHTML', '&#10078;')}>❞</button>
              <button onClick={() => onCommand('insertHTML', '&#10003;')}>✓</button>
              <button onClick={() => onCommand('insertHTML', '😊')}>😊</button>
              <button onClick={() => onCommand('insertHTML', '👍')}>👍</button>
              <button onClick={() => onCommand('insertHTML', '🎉')}>🎉</button>
            </div>
          </div>

        </div>
      </div>

     {/* Undo and Redo */}
      <div id="undo-redo-group" className="toolbar-group">
        <button onClick={() => onCommand('undo')}><UndoIcon className="button-icon" /></button>
        <button onClick={() => onCommand('redo')}><RedoIcon className="button-icon" /></button>
      </div>

    </div>
  );
};

export default Toolbar;
