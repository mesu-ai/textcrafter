import React, { FC, useState } from 'react';
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
import TableIcon from '../assets/icons/TableIcon';
import ClearFormatIcon from '../assets/icons/ClearFormatIcon';

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

  // const createTableHTML = (rows: number, cols: number) => {
  //   let tableHTML = '<table class="custom-table" border="1">';
  //   for (let i = 0; i < rows; i++) {
  //     tableHTML += '<tr>';
  //     for (let j = 0; j < cols; j++) {
  //       tableHTML += `<td class="table-cell">Cell</td>`;
  //     }
  //     tableHTML += '</tr>';
  //   }
  //   tableHTML += '</table>';
  //   return tableHTML;
  // };

  // Command to insert the table into the editor
  // const insertTable = () => {
  //   onCommand('insertHTML', createTableHTML(tableRows, tableCols));
  // };
  const handleTableCreate = (rows: number, cols: number) => {
    onCommand('insertHTML', createTableHTML(rows, cols));
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
  // const toggleCollapseRow = (rowIndex: number) => {
  //   const selectedTable = document.querySelector('.custom-table') as HTMLTableElement;
  //   if (selectedTable && rowIndex < selectedTable.rows.length) {
  //     const row = selectedTable.rows[rowIndex];
  //     for (let cell of row.cells) {
  //       cell.style.display = cell.style.display === 'none' ? 'table-cell' : 'none';
  //     }
  //   }
  // };

  // const handleTableOptionChange = (option: string) => {
  //   switch (option) {
  //     case 'addRow':
  //       addRow();
  //       break;
  //     case 'removeRow':
  //       removeRow();
  //       break;
  //     case 'addColumn':
  //       addColumn();
  //       break;
  //     case 'removeColumn':
  //       removeColumn();
  //       break;
  //     case 'toggleCollapseRow':
  //       toggleCollapseRow(0);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleTable = (option: string) => {
  //   console.log(option)

  //   switch (option) {
  //     case 'addRow':
  //       addRow()
  //       break;

  //     case 'removeRow':
  //       removeRow()
  //       break;

  //     case 'addColumn':
  //       addColumn()
  //       break;

  //     case 'removeColumn':
  //       removeColumn()
  //       break;

  //     case 'horizontalLine':
  //       onCommand('insertHorizontalRule')
  //       break;

  //     default:
  //       break;
  //   }

  // }

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
        <button onClick={() => onCommand('bold')} style={{fontWeight:'700'}}>B</button>
        <button onClick={() => onCommand('italic')} style={{ fontStyle: 'italic' }}>I</button>
        <button onClick={() => onCommand('underline')} style={{ textDecoration: 'underline' }}>U</button>
        <button onClick={() => onCommand('strikeThrough')} style={{ textDecoration: 'line-through' }}>abc</button>
        <button onClick={() => onCommand('removeFormat')} title='Clear Formatting'><ClearFormatIcon className='button-icon'/></button>
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

     

      {/* <div className="toolbar-group">
        <select onChange={(e) => handleTable(e.target.value)}>

          <option>Table Options</option>
          <option value='createTable'>Create Table</option>
          <option value="addRow">Add Row</option>
          <option value="removeRow">Remove Row</option>
          <option value="addColumn">Add Column</option>
          <option value="removeColumn">Remove Column</option>
          <option value="horizontalLine">Insert Horizontal Line</option>
        </select>
      </div> */}

      {/* Table Creation */}
      {/* <div id="table-creation-group" className="toolbar-group">
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
      </div> */}

      {/* Table Options */}
      {/* <div id="table-options-group" className="toolbar-group">
        <select onChange={(e) => handleTableOptionChange(e.target.value)}>
          <option value="">Table Options</option>
          <option value="addRow">Add Row</option>
          <option value="removeRow">Remove Row</option>
          <option value="addColumn">Add Column</option>
          <option value="removeColumn">Remove Column</option>
        </select>
      </div> */}

      {/* Horizontal Line */}
      {/* <div id="horizontal-line-group" className="toolbar-group">
        <button onClick={() => onCommand('insertHorizontalRule')}>Insert Horizontal Line</button>
      </div> */}

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

       {/* Undo and Redo */}
       <div id="undo-redo-group" className="toolbar-group">
        <button onClick={() => onCommand('undo')}><UndoIcon className="button-icon" /></button>
        <button onClick={() => onCommand('redo')}><RedoIcon className="button-icon" /></button>
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
              <button onClick={() => onCommand('insertHTML', '😊')}>😊</button>
              <button onClick={() => onCommand('insertHTML', '👍')}>👍</button>
              <button onClick={() => onCommand('insertHTML', '🎉')}>🎉</button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Special Characters */}
      {/* <div id="special-characters-group" className="toolbar-group">
        <button onClick={() => onCommand('insertHTML', '&copy;')}>©</button>
        <button onClick={() => onCommand('insertHTML', '&euro;')}>€</button>
        <button onClick={() => onCommand('insertHTML', '&trade;')}>™</button>
        <button onClick={() => onCommand('insertHTML', '😊')}>😊</button>
        <button onClick={() => onCommand('insertHTML', '👍')}>👍</button>
        <button onClick={() => onCommand('insertHTML', '🎉')}>🎉</button>
      </div> */}
    </div>
  );
};

export default Toolbar;
