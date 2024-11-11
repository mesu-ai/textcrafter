

# TextCrfter

A flexible and customizable text editor built for React, supporting both rich text formatting and HTML elements like tables, lists, links, and images. Ideal for use in React and Next.js (App and Page) applications. Compatible with both JavaScript and TypeScript projects. Easily installable via npm or Yarn.

## Features

- **Rich Text Formatting:** Bold, Italic, Underline, Strikethrough, Font Family, Font Size
- **Text Alignment:** Left, Center, Right, Justify
- **Lists:** Unordered and Ordered Lists
- **Tables:** Add, Remove Rows and Columns
- **Links & Images:** Insert Links and Images (via URLs)
- **Undo & Redo** functionality
- **Customizable Toolbar:** Easily extend and style the toolbar
- **Cross-compatible:** Works in React, Next.js, TypeScript, and JavaScript
- **Drag and Drop Image Upload:** Easily insert images into the editor

## Installation

### Using npm:
```bash
npm install textcrafter
```

### Using Yarn:
```bash
yarn add textcrafter
```

## Usage

### Basic Setup for React

1. Import the `Style` of the Editor and Toolbar in your App component.

```tsx
import 'textcrafter/dist/styles.min.css';

```


2. Import the `Editor` component in your React component.

```tsx
import React, { useState } from 'react';
import { Editor } from 'textcrafter';

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState('<p>Start editing...</p>');

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div>
      <Editor value={editorContent} onChange={handleEditorChange} />
    </div>
  );
};

export default MyEditor;
```

### Integrating with Next.js

If you're using Next.js, the editor can be used both in the App and Page directories.

For App (with React Server Components in Next 13+):

1. Import the `Style` of the Editor and Toolbar in your RootLayout.

```tsx
import 'textcrafter/dist/styles.min.css';

```

2. Import the `Editor` component in your page component

```tsx
import React, { useState } from 'react';
import { Editor } from 'textcrafter';

const PageComponent = () => {
  const [editorContent, setEditorContent] = useState('<p>Edit here...</p>');

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div>
      <Editor value={editorContent} onChange={handleEditorChange} />
    </div>
  );
};

export default PageComponent;
```

For Page (traditional routing in Next.js):

1. Import the `Style` of the Editor and Toolbar in your _app component.

```tsx
import 'textcrafter/dist/styles.min.css';

```

2. Import the `Editor` component in your page component

```tsx
// pages/index.tsx or pages/somepage.tsx
import React, { useState } from 'react';
import { Editor } from 'textcrafter';

const HomePage = () => {
  const [editorContent, setEditorContent] = useState('<p>Edit here...</p>');

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div>
      <Editor value={editorContent} onChange={handleEditorChange} />
    </div>
  );
};

export default HomePage;
```

## Configuration

The toolbar offers a range of options that can be customized for your use case.

- **Font Family:** Customize the font family with options like Arial, Courier New, Times New Roman, etc.
- **Font Size:** Adjust the font size with options from Tiny to Huge.
- **Text Formatting:** Toggle bold, italic, underline, and strikethrough.
- **Text Alignment:** Align text to the left, center, right, or justify it.
- **Insert Lists:** Add ordered or unordered lists.
- **Table Insertion:** Easily add tables with customizable rows and columns.

## Styling

You can customize the editor's appearance by modifying the included CSS styles or by adding your own custom styles.

### Example Styling:

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This package is licensed under the MIT License.