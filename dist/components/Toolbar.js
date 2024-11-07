import React, { useEffect, useState } from 'react';
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
const TableSelector = ({ onTableCreate }) => {
    const [hoveredRow, setHoveredRow] = useState(0);
    const [hoveredCol, setHoveredCol] = useState(0);
    const handleSellHover = (row, col) => {
        setHoveredRow(row);
        setHoveredCol(col);
    };
    const handleCellClick = () => {
        onTableCreate(hoveredRow + 1, hoveredCol + 1);
    };
    return (React.createElement("div", { className: 'table-selector' },
        [...new Array(8)].map((_, row) => (React.createElement("div", { key: `row-${row}`, className: 'table-selector-row' }, [...new Array(8)].map((_, col) => (React.createElement("div", { key: `col-${col}`, className: `table-selector-cell ${row <= hoveredRow && col <= hoveredCol ? 'highlighted' : ''}`, onMouseEnter: () => handleSellHover(row, col), onClick: handleCellClick })))))),
        React.createElement("div", { className: "table-selector-label" },
            hoveredRow + 1,
            " x ",
            hoveredCol + 1)));
};
const Toolbar = ({ onCommand }) => {
    const [activeFormats, setActiveFormats] = useState({});
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
    const handleTableCreate = (rows, cols) => {
        onCommand('insertHTML', createTableHTML(rows, cols));
    };
    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = window.setTimeout(() => func.apply(this, args), delay);
        };
    };
    // const detectFormatting = () => {
    //   const newActiveFormat: { [key: string]: boolean } = {};
    //   newActiveFormat.bold = document.queryCommandState('bold');
    //   newActiveFormat.italic = document.queryCommandState('italic');
    //   newActiveFormat.underline = document.queryCommandState('underline');
    //   newActiveFormat.strikeThrough = document.queryCommandState('strikeThrough');
    //   newActiveFormat.justifyLeft = document.queryCommandState('justifyLeft');
    //   newActiveFormat.justifyCenter = document.queryCommandState('justifyCenter');
    //   newActiveFormat.justifyRight = document.queryCommandState('justifyRight');
    //   newActiveFormat.justifyFull = document.queryCommandState('justifyFull');
    //   newActiveFormat.insertUnorderedList = document.queryCommandState('insertUnorderedList');
    //   newActiveFormat.insertOrderedList = document.queryCommandState('insertOrderedList');
    //   setActiveFormats(newActiveFormat);
    // };
    const detectFormatting = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return;
        }
        const range = selection.getRangeAt(0);
        let node = range.startContainer;
        // If the node is a text node, get its parent element
        if (node.nodeType === Node.TEXT_NODE) {
            node = node.parentElement;
        }
        // Initialize the new active formats object
        const newActiveFormat = {};
        // Helper function to check if an ancestor node matches a tag name
        const hasAncestor = (node, tagName) => {
            while (node && node !== document.body) {
                if (node.tagName === tagName) {
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
        newActiveFormat.justifyLeft = textAlign === 'left';
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
        const debounceDetectFormatting = debounce(detectFormatting, 100);
        document.addEventListener('selectionchange', debounceDetectFormatting);
        return () => document.removeEventListener('selectionchange', debounceDetectFormatting);
    }, []);
    return (React.createElement("div", { id: "toolbar", className: "toolbar" },
        React.createElement("div", { id: "font-group", className: "toolbar-group" },
            React.createElement("select", { onChange: (e) => onCommand('fontName', e.target.value) },
                React.createElement("option", { value: "" }, "Font Family"),
                React.createElement("option", { value: "Arial" }, "Arial"),
                React.createElement("option", { value: "Courier New" }, "Courier New"),
                React.createElement("option", { value: "Georgia" }, "Georgia"),
                React.createElement("option", { value: "Tahoma" }, "Tahoma"),
                React.createElement("option", { value: "Times New Roman" }, "T New Roman"),
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
            React.createElement("button", { onClick: () => onCommand('bold'), style: { fontWeight: '700' }, className: activeFormats.bold ? 'active' : '', "aria-label": 'Bold' }, "B"),
            React.createElement("button", { onClick: () => onCommand('italic'), className: activeFormats.italic ? 'active' : '', style: { fontStyle: 'italic' }, "aria-label": 'Italic' }, "I"),
            React.createElement("button", { onClick: () => onCommand('underline'), className: activeFormats.underline ? 'active' : '', style: { textDecoration: 'underline' }, "aria-label": 'Underline' }, "U"),
            React.createElement("button", { onClick: () => onCommand('strikeThrough'), className: activeFormats.strikeThrough ? 'active' : '', style: { textDecoration: 'line-through' } }, "abc"),
            React.createElement("button", { onClick: () => onCommand('removeFormat'), title: 'Clear Formatting' },
                React.createElement(ClearFormatIcon, { className: 'button-icon' }))),
        React.createElement("div", { id: "color-group", className: "toolbar-group" },
            React.createElement("input", { type: "color", onChange: (e) => onCommand('foreColor', e.target.value), title: "Text Color" }),
            React.createElement("input", { type: "color", onChange: (e) => onCommand('backColor', e.target.value), title: "Background Color" })),
        React.createElement("div", { id: "alignment-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('justifyLeft'), className: activeFormats.justifyLeft ? 'active' : '' },
                React.createElement(AlignLeftIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('justifyCenter'), className: activeFormats.justifyCenter ? 'active' : '' },
                React.createElement(AlignCenterIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('justifyRight'), className: activeFormats.justifyRight ? 'active' : '' },
                React.createElement(AlignRightIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('justifyFull'), className: activeFormats.justifyFull ? 'active' : '' },
                React.createElement(AlignJustifyIcon, { className: "button-icon" }))),
        React.createElement("div", { id: "list-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('insertUnorderedList'), className: activeFormats.insertUnorderedList ? 'active' : '' },
                React.createElement(ListBulletIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('insertOrderedList'), className: activeFormats.insertOrderedList ? 'active' : '' },
                React.createElement(ListNumberIcon, { className: "button-icon" }))),
        React.createElement("div", { id: "table", className: "toolbar-group" },
            React.createElement("button", { className: "table-selector-button" },
                React.createElement(TableIcon, { className: "button-icon" })),
            React.createElement("div", { className: "table-selector-container" },
                React.createElement("div", { className: 'table-selector-show' },
                    React.createElement(TableSelector, { onTableCreate: handleTableCreate }),
                    React.createElement("div", { className: 'table-option-button' },
                        React.createElement("button", { onClick: () => addRow(), value: "addRow" }, "Add Row"),
                        React.createElement("button", { onClick: () => removeRow(), value: "removeRow" }, "Remove Row"),
                        React.createElement("button", { onClick: () => addColumn(), value: "addColumn" }, "Add Column"),
                        React.createElement("button", { onClick: () => removeColumn(), value: "removeColumn" }, "Remove Column"),
                        React.createElement("button", { onClick: () => onCommand('insertHorizontalRule'), value: "horizontalLine" }, "Horizontal Line"))))),
        React.createElement("div", { id: "link-image-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('createLink', prompt('Enter the URL:', 'https://') || '') },
                React.createElement(LinkAddIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('unlink') },
                React.createElement(LinkRemoveIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('insertImage', prompt('Enter the image URL:', 'https://') || '') },
                React.createElement(InsertImageIcon, { className: "button-icon" }))),
        React.createElement("div", { id: "block-style-group", className: "toolbar-group" },
            React.createElement("select", { onChange: (e) => onCommand('formatBlock', e.target.value) },
                React.createElement("option", { value: "p" }, "Normal Text"),
                React.createElement("option", { value: "h1" }, "Heading 1"),
                React.createElement("option", { value: "h2" }, "Heading 2"),
                React.createElement("option", { value: "h3" }, "Heading 3"),
                React.createElement("option", { value: "blockquote" }, "Blockquote"),
                React.createElement("option", { value: "pre" }, "Code Block"))),
        React.createElement("div", { id: "symbol", className: "toolbar-group" },
            React.createElement("button", { className: "symbol-selector-button" }, "Symbols"),
            React.createElement("div", { className: "symbol-selector-container" },
                React.createElement("div", { className: 'symbol-selector-show' },
                    React.createElement("div", { className: 'symbol-option-button' },
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '&copy;') }, "\u00A9"),
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '&euro;') }, "\u20AC"),
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '&trade;') }, "\u2122"),
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '&#10077;') }, "\u275D"),
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '&#10078;') }, "\u275E"),
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '&#10003;') }, "\u2713"),
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '😊') }, "\uD83D\uDE0A"),
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '👍') }, "\uD83D\uDC4D"),
                        React.createElement("button", { onClick: () => onCommand('insertHTML', '🎉') }, "\uD83C\uDF89"))))),
        React.createElement("div", { id: "undo-redo-group", className: "toolbar-group" },
            React.createElement("button", { onClick: () => onCommand('undo') },
                React.createElement(UndoIcon, { className: "button-icon" })),
            React.createElement("button", { onClick: () => onCommand('redo') },
                React.createElement(RedoIcon, { className: "button-icon" })))));
};
export default Toolbar;
