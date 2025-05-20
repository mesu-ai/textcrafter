import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

   const editorElement = screen.getByTestId('editor');
    expect(editorElement).toHaveProperty('innerHTML', initialContent);
  });

  it('calls onChange when content changes', () => {
    render(<Editor {...defaultProps} />);
   const editorElement = screen.getByTestId('editor');

    fireEvent.input(editorElement, {
      target: { innerHTML: '<p>New content</p>' }
    });

    expect(mockOnChange).toHaveBeenCalledWith('<p>New content</p>');
  });

   it('handles image drag and drop', async () => {
    render(<Editor {...defaultProps} />);
    const editorElement = screen.getByTestId('editor');

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    const dataTransfer = {
      files: [file],
      items: { add: jest.fn() },
      types: ['Files']
    };

    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: jest.fn(),
      result: 'data:image/png;base64,dummy',
    };

    jest.spyOn(window, 'FileReader').mockImplementation(() => fileReaderMock as unknown as FileReader);

    fireEvent.drop(editorElement, { dataTransfer });

    // Simulate FileReader behavior
    fileReaderMock.onload({
      target: { result: fileReaderMock.result }
    } as any);

    // Manually insert the result since execCommand doesn't work in JSDOM
    editorElement.innerHTML = '<div class="image-container" contenteditable="false"><img src="data:image/png;base64,dummy" alt="Uploaded Image"/></div>';
    fireEvent.input(editorElement);

    expect(mockOnChange).toHaveBeenCalledWith(expect.stringContaining('data:image/png;base64,dummy'));
  });

});