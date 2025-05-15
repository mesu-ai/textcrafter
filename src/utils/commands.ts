import { tableCell, tableHeaderCell } from "../components/Toolbar";

export const addRow = () => {
  const selectedTable = document.getElementById('editor-custom-table') as HTMLTableElement;
  if (!selectedTable) return;

  const tbody = selectedTable.querySelector('tbody');
  const thead = selectedTable.querySelector('thead');

  if (!tbody || !thead) return;

  const columnCount = thead.rows[0]?.cells.length || 0;
  const newRow = document.createElement('tr');

  for (let i = 0; i < columnCount; i++) {
    const td = document.createElement('td');
    td.innerHTML = 'New Cell';
    td.style.cssText = tableCell;
    newRow.appendChild(td);
  }

  tbody.appendChild(newRow);
};


// Function to remove the last row from the selected table
export const removeRow = () => {
  const selectedTable = document.getElementById('editor-custom-table') as HTMLTableElement;
  if (selectedTable && selectedTable.rows.length > 1) {
    selectedTable.deleteRow(-1);
  }
};

// Function to add a column to the selected table
export const addColumn = () => {
  const selectedTable = document.getElementById('editor-custom-table') as HTMLTableElement;
  if (!selectedTable) return;

  const thead = selectedTable.querySelector('thead');
  const tbody = selectedTable.querySelector('tbody');

  // Add new header cell to <thead>
  if (thead) {
    const headerRow = thead.rows[0];
    const th = document.createElement('th');
    th.textContent = `Header ${headerRow.cells.length + 1}`;
    th.style.cssText = tableHeaderCell;
    headerRow.appendChild(th);
  }

  // Add new data cell to each row in <tbody>
  if (tbody) {
    for (const row of Array.from(tbody.rows)) {
      const td = document.createElement('td');
      td.innerHTML = 'New Cell';
      td.style.cssText = tableCell;
      row.appendChild(td);
    }
  }
};


// Function to remove the last column from the selected table
export const removeColumn = () => {
  const selectedTable = document.getElementById('editor-custom-table') as HTMLTableElement;
  if (selectedTable) {
    for (let i = 0; i < selectedTable.rows.length; i++) {
      if (selectedTable.rows[i].cells.length > 1) {
        selectedTable.rows[i].deleteCell(-1);
      }
    }
  }
};

