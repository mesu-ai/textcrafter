import React, { useState } from 'react';
import '../styles/editor.css';

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onCommand }) => {
 
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Generate initial table HTML
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

  // Command to insert the table into the editor
  const insertTable = () => {
    onCommand('insertHTML', createTableHTML(tableRows, tableCols));
  };


  const addRow = () => {
    const selectedTable = document.querySelector('.custom-table') as HTMLTableElement;
    if (selectedTable) {
      const row = selectedTable.insertRow(-1);
      for (let i = 0; i < selectedTable.rows[0].cells.length; i++) {
        const cell = row.insertCell(i);
        cell.innerHTML = 'New Cell';
        cell.classList.add('table-cell');
      }
    }
  };
  
  // Function to remove the last row from the selected table
  const removeRow = () => {
    const selectedTable = document.querySelector('.custom-table') as HTMLTableElement;
    if (selectedTable && selectedTable.rows.length > 1) {
      selectedTable.deleteRow(-1);
    }
  };
  
  // Function to add a column to the selected table
  const addColumn = () => {
    const selectedTable = document.querySelector('.custom-table') as HTMLTableElement;
    if (selectedTable) {
      for (let i = 0; i < selectedTable.rows.length; i++) {
        const cell = selectedTable.rows[i].insertCell(-1);
        cell.innerHTML = 'New Cell';
        cell.classList.add('table-cell');
      }
    }
  };
  
  // Function to remove the last column from the selected table
  const removeColumn = () => {
    const selectedTable = document.querySelector('.custom-table') as HTMLTableElement;
    if (selectedTable) {
      for (let i = 0; i < selectedTable.rows.length; i++) {
        if (selectedTable.rows[i].cells.length > 1) {
          selectedTable.rows[i].deleteCell(-1);
        }
      }
    }
  };
  
  // Function to collapse all cells in a specific row or column
  const toggleCollapseRow = (rowIndex: number) => {
    const selectedTable = document.querySelector('.custom-table') as HTMLTableElement;
    if (selectedTable && rowIndex < selectedTable.rows.length) {
      const row = selectedTable.rows[rowIndex];
      for (let cell of row.cells) {
        cell.style.display = cell.style.display === 'none' ? 'table-cell' : 'none';
      }
    }
  };

  const handleTableOptionChange = (option: string) => {
    switch (option) {
      case 'addRow':
        addRow();
        break;
      case 'removeRow':
        removeRow();
        break;
      case 'addColumn':
        addColumn();
        break;
      case 'removeColumn':
        removeColumn();
        break;
      case 'toggleCollapseRow':
        toggleCollapseRow(0); // You can set rowIndex dynamically or based on user input
        break;
      default:
        break;
    }
  };


  return (
    <div className="toolbar">
      {/* Font Family and Size */}
      <div className="toolbar-group">
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
      <div className="toolbar-group">
        <button onClick={() => onCommand('bold')}>B</button>
        <button onClick={() => onCommand('italic')}>I</button>
        <button onClick={() => onCommand('underline')}>U</button>
        <button onClick={() => onCommand('strikeThrough')}>abc</button>
        <button onClick={() => onCommand('removeFormat')}>Clear Formatting</button>
      </div>

      {/* Text Color and Background Color */}
      <div className="toolbar-group">
        <input type="color" onChange={(e) => onCommand('foreColor', e.target.value)} title="Text Color" />
        <input type="color" onChange={(e) => onCommand('backColor', e.target.value)} title="Background Color" />
      </div>

      {/* Text Alignment */}
      <div className="toolbar-group">
        <button onClick={() => onCommand('justifyLeft')}>Align Left</button>
        <button onClick={() => onCommand('justifyCenter')}>Center</button>
        <button onClick={() => onCommand('justifyRight')}>Align Right</button>
        <button onClick={() => onCommand('justifyFull')}>Justify</button>
      </div>

      {/* List Options */}
      <div className="toolbar-group">
        <button onClick={() => onCommand('insertUnorderedList')}>Bulleted List</button>
        <button onClick={() => onCommand('insertOrderedList')}>Numbered List</button>
        <button onClick={() => onCommand('insertHTML', '<ul><li>Checklist</li></ul>')}>Checklist</button>
      </div>

      {/* Undo and Redo */}
      <div className="toolbar-group">
        <button onClick={() => onCommand('undo')}>Undo</button>
        <button onClick={() => onCommand('redo')}>Redo</button>
      </div>

      {/* Link and Image Insertion */}
      <div className="toolbar-group">
        <button onClick={() => onCommand('createLink', prompt('Enter the URL:', 'https://') || '')}>Add Link</button>
        <button onClick={() => onCommand('unlink')}>Remove Link</button>
        <button onClick={() => onCommand('insertImage', prompt('Enter the image URL:', 'https://') || '')}>Insert Image</button>
      </div>

      {/* Table Creation */}
      <div className="toolbar-group">
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

      {/* Table Options Select Dropdown */}
      <div className="toolbar-group">
        <select onChange={(e) => handleTableOptionChange(e.target.value)}>
          <option value="">Table Options</option>
          <option value="addRow">Add Row</option>
          <option value="removeRow">Remove Row</option>
          <option value="addColumn">Add Column</option>
          <option value="removeColumn">Remove Column</option>
          <option value="toggleCollapseRow">Toggle Collapse Row</option>
        </select>
      </div>

      {/* Horizontal Line */}
      <div className="toolbar-group">
        <button onClick={() => onCommand('insertHorizontalRule')}>Insert Horizontal Line</button>
      </div>

      {/* Headings and Block Styles */}
      <div className="toolbar-group">
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
      <div className="toolbar-group">
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
