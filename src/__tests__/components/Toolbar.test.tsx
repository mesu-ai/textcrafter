//src/__tests__/components/Toolbar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toolbar from '../../components/Toolbar';

describe('Toolbar Component', () => {
  const mockOnCommand = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all formatting buttons', () => {
    render(<Toolbar onCommand={mockOnCommand} />);
    
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /strikeThrough/i })).toBeInTheDocument();
  });

  it('triggers command on button click', () => {
    render(<Toolbar onCommand={mockOnCommand} />);
    
    const boldButton = screen.getByRole('button', { name: /bold/i });
    fireEvent.click(boldButton);
    
    expect(mockOnCommand).toHaveBeenCalledWith('bold');
  });

  it('handles font selection', () => {
    render(<Toolbar onCommand={mockOnCommand} />);
    
    const fontSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(fontSelect, { target: { value: 'Arial' } });
    
    expect(mockOnCommand).toHaveBeenCalledWith('fontName', 'Arial');
  });

  it('handle text color picker', ()=>{
    render(<Toolbar onCommand={mockOnCommand} />);
    
    const colorPicker = screen.getByTitle('Text Color');
    fireEvent.change(colorPicker, { target: { value: '#000000' } });
    expect(mockOnCommand).toHaveBeenCalledWith('foreColor', '#000000');
  });

  it('handle background color picker', ()=>{
    render(<Toolbar onCommand={mockOnCommand} />);
    
    const colorPicker = screen.getByTitle('Background Color');
    fireEvent.change(colorPicker, { target: { value: '#ffffff' } });
    expect(mockOnCommand).toHaveBeenCalledWith('backColor', '#ffffff');
  });

  
});