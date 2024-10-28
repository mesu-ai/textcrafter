import React from 'react';

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onCommand }) => {
  return (
    <div className='toolbar'>
      {/* Text Formatting */}
      <button onClick={() => onCommand('bold')}>Bold</button>
      <button onClick={() => onCommand('italic')}>Italic</button>
      <button onClick={() => onCommand('underline')}>Underline</button>
      <button onClick={() => onCommand('strikeThrough')}>Strikethrough</button>

      {/* Font Size */}
      <select onChange={(e) => onCommand('fontSize', e.target.value)}>
        <option value=''>Font Size</option>
        <option value='1'>Small</option>
        <option value='3'>Normal</option>
        <option value='5'>Large</option>
        <option value='7'>Extra Large</option>
      </select>

      {/* Font and Background Color */}
      <input
        type='color'
        onChange={(e) => onCommand('foreColor', e.target.value)}
        title='Text Color'
      />
      <input
        type='color'
        onChange={(e) => onCommand('backColor', e.target.value)}
        title='Background Color'
      />

      {/* Text Alignment */}
      <button onClick={() => onCommand('justifyLeft')}>Align Left</button>
      <button onClick={() => onCommand('justifyCenter')}>Center</button>
      <button onClick={() => onCommand('justifyRight')}>Align Right</button>
      <button onClick={() => onCommand('justifyFull')}>Justify</button>

      {/* Lists */}
      <button onClick={() => onCommand('insertUnorderedList')}>
        Bulleted List
      </button>
      <button onClick={() => onCommand('insertOrderedList')}>
        Numbered List
      </button>
      <button
        onClick={() => onCommand('insertHTML', '<ul><li>Checklist</li></ul>')}
      >
        Checklist
      </button>

      {/* Link and Media Embedding */}
      <button
        onClick={() =>
          onCommand('createLink', prompt('Enter the URL:', 'https://') || '')
        }
      >
        Add Link
      </button>
      <button onClick={() => onCommand('unlink')}>Remove Link</button>
      <button
        onClick={() =>
          onCommand('insertImage', prompt('Enter the image URL:', 'https://') || '')
        }
      >
        Insert Image
      </button>

      {/* Table Insertion */}
      <button
        onClick={() =>
          onCommand(
            'insertHTML',
            '<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>'
          )
        }
      >
        Insert Table
      </button>

      {/* Headings and Block Styles */}
      <select onChange={(e) => onCommand('formatBlock', e.target.value)}>
        <option value=''>Normal Text</option>
        <option value='h1'>Heading 1</option>
        <option value='h2'>Heading 2</option>
        <option value='h3'>Heading 3</option>
        <option value='blockquote'>Blockquote</option>
        <option value='pre'>Code Block</option>
      </select>

      {/* Undo and Redo */}
      <button onClick={() => onCommand('undo')}>Undo</button>
      <button onClick={() => onCommand('redo')}>Redo</button>

      {/* Horizontal Line */}
      <button onClick={() => onCommand('insertHorizontalRule')}>
        Insert Horizontal Line
      </button>

      {/* Special Characters */}
      <button onClick={() => onCommand('insertHTML', '&copy;')}>©</button>
      <button onClick={() => onCommand('insertHTML', '&euro;')}>€</button>
      <button onClick={() => onCommand('insertHTML', '&trade;')}>™</button>

      {/* Emoticons */}
      <button onClick={() => onCommand('insertHTML', '😊')}>😊</button>
      <button onClick={() => onCommand('insertHTML', '👍')}>👍</button>
      <button onClick={() => onCommand('insertHTML', '🎉')}>🎉</button>
    </div>
  );
};

export default Toolbar;
