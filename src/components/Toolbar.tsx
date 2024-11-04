import React, { useState } from 'react';
import '../styles/editor.css';
import AlignLeftIcon from '../assets/icons/AlignLeftIcon';
import AlignCenterIcon from '../assets/icons/AlignCenterIcon';
import AlignRightIcon from '../assets/icons/AlignRightIcon';
import AlignJustifyIcon from '../assets/icons/AlignJustifyIcon';
import ListBulletIcon from '../assets/icons/ListBulletIcon';
import ListNumberIcon from '../assets/icons/ListNumberIcon';
import ListCheckIcon from '../assets/icons/ListCheckIcon';
import LinkAddIcon from '../assets/icons/LinkAddIcon';
import LinkRemoveIcon from '../assets/icons/LinkRemoveIcon';
import InsertImageIcon from '../assets/icons/InsertImageIcon';
import UndoIcon from '../assets/icons/UndoIcon';
import RedoIcon from '../assets/icons/RedoIcon';

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onCommand }) => {
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const createTableHTML = (rows: number, cols: number) => {
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

  const insertTable = () => {
    onCommand('insertHTML', createTableHTML(tableRows, tableCols));
  };

  const handleTableOptionChange = (option: string) => {
    switch (option) {
      case 'addRow':
        onCommand('addRow');
        break;
      case 'removeRow':
        onCommand('removeRow');
        break;
      case 'addColumn':
        onCommand('addColumn');
        break;
      case 'removeColumn':
        onCommand('removeColumn');
        break;
      default:
        break;
    }
  };

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
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select onChange={(e) => onCommand('fontSize', e.target.value)}>
          <option value="">Font Size</option>
          <option value="1">Extra Small</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Medium</option>
          <option value="5">Large</option>
          <option value="6">Extra Large</option>
          <option value="7">Huge</option>
        </select>
      </div>

      {/* Text Formatting */}
      <div id="text-formatting-group" className="toolbar-group">
        <button onClick={() => onCommand('bold')}>B</button>
        <button onClick={() => onCommand('italic')}>I</button>
        <button onClick={() => onCommand('underline')}>U</button>
        <button onClick={() => onCommand('strikeThrough')}>abc</button>
        <button onClick={() => onCommand('removeFormat')}>Clear Formatting</button>
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
        <button onClick={() => onCommand('insertHTML', '<ul><li>Checklist</li></ul>')}><ListCheckIcon className="button-icon" /></button>
      </div>

      {/* Undo and Redo */}
      <div id="undo-redo-group" className="toolbar-group">
        <button onClick={() => onCommand('undo')}><UndoIcon className="button-icon" /></button>
        <button onClick={() => onCommand('redo')}><RedoIcon className="button-icon" /></button>
      </div>

      {/* Link and Image Insertion */}
      <div id="link-image-group" className="toolbar-group">
        <button onClick={() => onCommand('createLink', prompt('Enter the URL:', 'https://') || '')}><LinkAddIcon className="button-icon" /></button>
        <button onClick={() => onCommand('unlink')}><LinkRemoveIcon className="button-icon" /></button>
        <button onClick={() => onCommand('insertImage', prompt('Enter the image URL:', 'https://') || '')}><InsertImageIcon className="button-icon" /></button>
      </div>

      {/* Table Creation */}
      <div id="table-creation-group" className="toolbar-group">
        <div>
          <label>Rows:</label>
          <input
            type="number"
            min="1"
            value={tableRows}
            onChange={(e) => setTableRows(Math.max(1, Number(e.target.value)))}
            style={{ width: '50px' }}
          />
        </div>
        <div>
          <label>Cols:</label>
          <input
            type="number"
            min="1"
            value={tableCols}
            onChange={(e) => setTableCols(Math.max(1, Number(e.target.value)))}
            style={{ width: '50px' }}
          />
        </div>
        <button onClick={insertTable}>Insert Table</button>
      </div>

      {/* Table Options */}
      <div id="table-options-group" className="toolbar-group">
        <select onChange={(e) => handleTableOptionChange(e.target.value)}>
          <option value="">Table Options</option>
          <option value="addRow">Add Row</option>
          <option value="removeRow">Remove Row</option>
          <option value="addColumn">Add Column</option>
          <option value="removeColumn">Remove Column</option>
        </select>
      </div>

      {/* Horizontal Line */}
      <div id="horizontal-line-group" className="toolbar-group">
        <button onClick={() => onCommand('insertHorizontalRule')}>Insert Horizontal Line</button>
      </div>

      {/* Headings and Block Styles */}
      <div id="block-style-group" className="toolbar-group">
        <select onChange={(e) => onCommand('formatBlock', e.target.value)}>
          <option value="">Normal Text</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="blockquote">Blockquote</option>
          <option value="pre">Code Block</option>
        </select>
      </div>

      {/* Special Characters */}
      <div id="special-characters-group" className="toolbar-group">
        <button onClick={() => onCommand('insertHTML', '&copy;')}>©</button>
        <button onClick={() => onCommand('insertHTML', '&euro;')}>€</button>
        <button onClick={() => onCommand('insertHTML', '&trade;')}>™</button>
        <button onClick={() => onCommand('insertHTML', '😊')}>😊</button>
        <button onClick={() => onCommand('insertHTML', '👍')}>👍</button>
        <button onClick={() => onCommand('insertHTML', '🎉')}>🎉</button>
      </div>
    </div>
  );
};

export default Toolbar;
