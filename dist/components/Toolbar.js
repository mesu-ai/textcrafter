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
import TableIcon from '../assets/icons/TableIcon';
const TableSelector = ({ onTableCreate }) => {
    const [hoveredRow, setHoveredRow] = useState(0);
    const [hoveredCol, setHoveredCol] = useState(0);
    console.log({ hoveredCol, hoveredRow });
    const handleSellHover = (row, col) => {
        setHoveredRow(row);
        setHoveredCol(col);
    };
    const handleCellClick = () => {
        onTableCreate(hoveredRow + 1, hoveredCol + 1);
    };
    return (React.createElement("div", { className: 'table-selector' },
        [...new Array(8)].map((_, row) => (React.createElement("div", { key: row, className: 'table-selector-row' }, [...new Array(8)].map((_, col) => (React.createElement("div", { key: col, className: `table-selector-cell ${row <= hoveredRow && col <= hoveredCol ? 'highlighted' : ''}`, onMouseEnter: () => handleSellHover(row, col), onClick: handleCellClick })))))),
        React.createElement("div", { className: "table-selector-label" },
            hoveredRow + 1,
            " x ",
            hoveredCol + 1)));
};
const Toolbar = ({ onCommand }) => {
    const [tableRows, setTableRows] = useState(3);
    const [tableCols, setTableCols] = useState(3);
    const createTableHTML = (rows, cols) => {
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
    const handleTableCreate = (rows, cols) => {
        onCommand('insertHTML', createTableHTML(rows, cols));
    };
    const addRow = () => {
        const selectedTable = document.querySelector('.custom-table');
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
        const selectedTable = document.querySelector('.custom-table');
        if (selectedTable && selectedTable.rows.length > 1) {
            selectedTable.deleteRow(-1);
        }
    };
    // Function to add a column to the selected table
    const addColumn = () => {
        const selectedTable = document.querySelector('.custom-table');
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
        const selectedTable = document.querySelector('.custom-table');
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
    const handleTable = (option) => {
        console.log(option);
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
            case 'horizontalLine':
                onCommand('insertHorizontalRule');
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", { id: "toolbar", className: "toolbar" },
        React.createElement("div", { id: "font-group", className: "toolbar-group" },
            React.createElement("select", { onChange: (e) => onCommand('fontName', e.target.value) },
                React.createElement("option", { value: "" }, "Font Family"),
                React.createElement("option", { value: "Arial" }, "Arial"),
                React.createElement("option", { value: "Courier New" }, "Courier New"),
                React.createElement("option", { value: "Georgia" }, "Georgia"),
                React.createElement("option", { value: "Tahoma" }, "Tahoma"),
                React.createElement("option", { value: "Times New Roman" }, "Times New Roman"),
                React.createElement("option", { value: "Verdana" }, "Verdana")),
            React.createElement("select", { onChange: (e) => onCommand('fontSize', e.target.value) },
                React.createElement("option", { value: "" }, "Font Size"),
                React.createElement("option", { value: "1" }, "Tiny"),
                React.createElement("option", { value: "2" }, "Small"),
                React.createElement("option", { value: "3" }, "Regular"),
                React.createElement("option", { value: "4" }, "Medium"),
                React.createElement("option", { value: "5" }, "Large"),
                React.createElement("option", { value: "6" }, "E.Large"),
                React.createElement("option", { value: "7" }, "Huge"))),
        React.createElement("div", { id: "text-formatting-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('bold'), style: { fontWeight: '700' } }, "B"),
            React.createElement("button", { onClick: () => onCommand('italic'), style: { fontStyle: 'italic' } }, "I"),
            React.createElement("button", { onClick: () => onCommand('underline'), style: { textDecoration: 'underline' } }, "U"),
            React.createElement("button", { onClick: () => onCommand('strikeThrough'), style: { textDecoration: 'line-through' } }, "abc"),
            React.createElement("button", { onClick: () => onCommand('removeFormat') }, "Clear Formatting")),
        React.createElement("div", { id: "color-group", className: "toolbar-group" },
            React.createElement("input", { type: "color", onChange: (e) => onCommand('foreColor', e.target.value), title: "Text Color" }),
            React.createElement("input", { type: "color", onChange: (e) => onCommand('backColor', e.target.value), title: "Background Color" })),
        React.createElement("div", { id: "alignment-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('justifyLeft') },
                React.createElement(AlignLeftIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('justifyCenter') },
                React.createElement(AlignCenterIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('justifyRight') },
                React.createElement(AlignRightIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('justifyFull') },
                React.createElement(AlignJustifyIcon, { className: "button-icon" }))),
        React.createElement("div", { id: "list-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('insertUnorderedList') },
                React.createElement(ListBulletIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('insertOrderedList') },
                React.createElement(ListNumberIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('insertHTML', '<ul><li>Checklist</li></ul>') },
                React.createElement(ListCheckIcon, { className: "button-icon" }))),
        React.createElement("div", { id: "undo-redo-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('undo') },
                React.createElement(UndoIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('redo') },
                React.createElement(RedoIcon, { className: "button-icon" }))),
        React.createElement("div", { id: "link-image-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('createLink', prompt('Enter the URL:', 'https://') || '') },
                React.createElement(LinkAddIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('unlink') },
                React.createElement(LinkRemoveIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('insertImage', prompt('Enter the image URL:', 'https://') || '') },
                React.createElement(InsertImageIcon, { className: "button-icon" }))),
        React.createElement("div", { id: "table", className: "toolbar-group" },
            React.createElement("button", { className: "table-selector-button" },
                React.createElement(TableIcon, { className: "button-icon" })),
            React.createElement("div", { className: "table-selector-show" },
                React.createElement(TableSelector, { onTableCreate: handleTableCreate }),
                React.createElement("div", { className: 'table-option-button' },
                    React.createElement("button", { onClick: () => addRow(), value: "addRow" }, "Add Row"),
                    React.createElement("button", { onClick: () => removeRow(), value: "removeRow" }, "Remove Row"),
                    React.createElement("button", { onClick: () => addColumn(), value: "addColumn" }, "Add Column"),
                    React.createElement("button", { onClick: () => removeColumn(), value: "removeColumn" }, "Remove Column"),
                    React.createElement("button", { onClick: () => onCommand('insertHorizontalRule'), value: "horizontalLine" }, "Horizontal Line")))),
        React.createElement("div", { id: "block-style-group", className: "toolbar-group" },
            React.createElement("select", { onChange: (e) => onCommand('formatBlock', e.target.value) },
                React.createElement("option", { value: "" }, "Normal Text"),
                React.createElement("option", { value: "h1" }, "Heading 1"),
                React.createElement("option", { value: "h2" }, "Heading 2"),
                React.createElement("option", { value: "h3" }, "Heading 3"),
                React.createElement("option", { value: "blockquote" }, "Blockquote"),
                React.createElement("option", { value: "pre" }, "Code Block"))),
        React.createElement("div", { id: "special-characters-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('insertHTML', '&copy;') }, "\u00A9"),
            React.createElement("button", { onClick: () => onCommand('insertHTML', '&euro;') }, "\u20AC"),
            React.createElement("button", { onClick: () => onCommand('insertHTML', '&trade;') }, "\u2122"),
            React.createElement("button", { onClick: () => onCommand('insertHTML', '😊') }, "\uD83D\uDE0A"),
            React.createElement("button", { onClick: () => onCommand('insertHTML', '👍') }, "\uD83D\uDC4D"),
            React.createElement("button", { onClick: () => onCommand('insertHTML', '🎉') }, "\uD83C\uDF89"))));
};
export default Toolbar;
