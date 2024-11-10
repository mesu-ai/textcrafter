export const addRow = () => {
  const selectedTable = document.getElementById('editor-custom-table') as HTMLTableElement;
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
export const removeRow = () => {
  const selectedTable = document.getElementById('editor-custom-table') as HTMLTableElement;
  if (selectedTable && selectedTable.rows.length > 1) {
    selectedTable.deleteRow(-1);
  }
};

// Function to add a column to the selected table
export const addColumn = () => {
  const selectedTable = document.getElementById('editor-custom-table') as HTMLTableElement;
  if (selectedTable) {
    for (let i = 0; i < selectedTable.rows.length; i++) {
      const cell = selectedTable.rows[i].insertCell(-1);
      cell.innerHTML = 'New Cell';
      cell.classList.add('table-cell');
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