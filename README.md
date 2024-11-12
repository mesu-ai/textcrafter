
---

# TextCrafter

**TextCrafter** is a powerful, flexible, and customizable rich text editor designed for React applications. It supports a wide range of text formatting and HTML elements, including tables, lists, links, and images. Built with compatibility in mind, TextCrafter is ideal for React and Next.js (App and Page) applications and is compatible with both JavaScript and TypeScript projects. Installation is quick and easy via npm or Yarn.

---

## Key Features

- **Rich Text Formatting**: Bold, italic, underline, strikethrough, custom font families, and font sizes.
- **Text Alignment**: Align text left, center, right, or justify.
- **Lists**: Support for unordered and ordered lists.
- **Tables**: Easily add or remove rows and columns.
- **Links & Images**: Insert links and images (via URLs).
- **Undo & Redo**: Restore previous actions quickly.
- **Customizable Toolbar**: Extend and style the toolbar to match your design.
- **Cross-Compatible**: Compatible with React, Next.js, TypeScript, and JavaScript.
- **Drag-and-Drop Image Upload**: Drag images directly into the editor for easy insertion.

---

## Installation

To install TextCrafter, choose your preferred package manager:

### npm
```bash
npm install textcrafter
```

### Yarn
```bash
yarn add textcrafter
```

---

## Getting Started

### Basic Setup for React

1. **Import the Editor Styles**  
   Import the editor's default stylesheet into your main app component to apply necessary styles.

   ```tsx
   import 'textcrafter/dist/styles.min.css';
   ```

2. **Implement the Editor Component**  
   Import and use the `Editor` component within your React component.

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

---

### Using TextCrafter with Next.js

#### For App Router (Next.js 13+ with React Server Components)

1. **Import Styles**  
   Import the editor styles in your root layout to apply them globally.

   ```tsx
   import 'textcrafter/dist/styles.min.css';
   ```

2. **Add the Editor Component in Page Components**  
   Use the `Editor` component in your page-level components.

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

#### For Page Router (Traditional Next.js Routing)

1. **Import Styles in the _app Component**  
   Include the editor styles in the `_app.js` or `_app.tsx` file.

   ```tsx
   import 'textcrafter/dist/styles.min.css';
   ```

2. **Add the Editor Component in Page Components**

   ```tsx
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

---

## Configuration

TextCrafter offers extensive configuration options to customize the editor to fit your project’s requirements:

- **Font Family**: Choose from fonts like Arial, Courier New, Times New Roman, etc.
- **Font Size**: Select font sizes ranging from Tiny to Huge.
- **Text Formatting**: Toggle bold, italic, underline, and strikethrough.
- **Text Alignment**: Align text to the left, center, right, or fully justify it.
- **Lists**: Add ordered and unordered lists for organized content.
- **Tables**: Insert and configure tables with customizable rows and columns.

---

## Styling

You can easily modify TextCrafter’s appearance by updating the provided CSS or adding custom styles. The toolbar and editor areas are designed for straightforward customization, allowing you to style them to fit your application’s theme.

---

## Contributing

Contributions are highly welcome! To contribute:

1. Fork this repository.
2. Make your changes in a new branch.
3. Submit a pull request, and our team will review it promptly.

---

## License

TextCrafter is licensed under the MIT License. See [LICENSE](./LICENSE) for more details.

---

TextCrafter combines rich functionality with ease of use, providing a smooth editing experience in any React or Next.js application. Happy coding!