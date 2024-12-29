import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Editor from '../../components/Editor';

describe('Editor Component', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    value: '',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial content', () => {
    const initialContent = '<p>Initial content</p>';
    render(<Editor {...defaultProps} value={initialContent} />);
    
    const editorElement = screen.getByRole('textbox');
    expect(editorElement).toHaveProperty('innerHTML', initialContent);
  });

  it('calls onChange when content changes', () => {
    render(<Editor {...defaultProps} />);
    const editorElement = screen.getByRole('textbox');
    
    fireEvent.input(editorElement, {
      target: { innerHTML: '<p>New content</p>' }
    });

    expect(mockOnChange).toHaveBeenCalledWith('<p>New content</p>');
  });

  it('handles image drag and drop', async () => {
    render(<Editor {...defaultProps} />);
    const editorElement = screen.getByRole('textbox');
    
    const file = new File([''], 'test.png', { type: 'image/png' });
    const dataTransfer = {
      files: [file],
      types: ['Files']
    };

    fireEvent.drop(editorElement, { dataTransfer });
    
    // Wait for FileReader
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockOnChange).toHaveBeenCalled();
  });
});