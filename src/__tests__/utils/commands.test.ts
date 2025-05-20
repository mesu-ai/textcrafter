import { addRow, removeRow, addColumn, removeColumn } from '../../utils/commands';

describe('Table Commands', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table id="editor-custom-table">
        <thead>
          <tr><th>Header</th></tr>
        </thead>
        <tbody>
          <tr><td>Initial</td></tr>
        </tbody>
      </table>
    `;
  });

  it('adds a new row correctly', () => {
    const table = document.getElementById('editor-custom-table') as HTMLTableElement;
    const initialRows = table.rows.length;
    
    addRow();
    
    expect(table.rows.length).toBe(initialRows + 1);
  });

  it('removes a row correctly', () => {
    const table = document.getElementById('editor-custom-table') as HTMLTableElement;
    const initialRows = table.rows.length;
    
    removeRow();
    
    expect(table.rows.length).toBe(initialRows - 1);
  });
});