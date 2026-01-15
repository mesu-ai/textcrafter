# TextCrafter

**TextCrafter** is a powerful, flexible, and fully customizable rich text editor built specifically for modern React applications. It supports a comprehensive set of formatting tools and HTML elements, including text styles, tables, lists, links, and images. Designed with compatibility and ease of integration in mind, TextCrafter works seamlessly with both React and Next.js (App Router and Page Router), and supports projects written in JavaScript or TypeScript. Whether you're building a blog platform, CMS, or document editor, TextCrafter provides a robust editing experience with fast installation via npm or Yarn.

---

## Key Features

- **Rich Text Formatting**: Bold, italic, underline, strikethrough, custom font families, and font sizes.
- **Text Alignment**: Align text left, center, right, or justify.
- **Lists**: Support for unordered and ordered lists.
- **Tables**: Easily add or remove rows and columns.
- **Links & Images**: Insert links and images (via URLs).
- **Undo & Redo**: Restore previous actions quickly.
- **Customizable Toolbar & Editor**: Extend and style the toolbar to match your design.
- **Dark & Light Mode Support**: Automatic theme detection with CSS variable customization.
- **Image Resize**: Drag-to-resize functionality with aspect ratio support.
- **Cross-Compatible**: Compatible with React, Next.js, TypeScript, and JavaScript.
- **Drag-and-Drop Image Upload**: Drag images directly into the editor for easy insertion.
- **External Media Management**: Upload images to a server when dropped or selected. No security risk.

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
   import "textcrafter/dist/styles.min.css";
   ```

2. **Implement the Editor Component**  
   Import and use the `Editor` component within your React component.

   ```tsx
   import React, { useState } from "react";
   import { Editor } from "textcrafter";

   const MyEditor = () => {
     const [editorContent, setEditorContent] = useState(
       "<p>Start editing...</p>"
     );

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

3. **External Server Functionality for Image**

```tsx
import { useState } from "react";
import "./App.css";
import { Editor } from "textcrafter";
import "textcrafter/dist/styles.min.css";

function App() {
  const [editorContent, setEditorContent] = useState("<p>Start editing...</p>");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // We just need the image URL
    // You can handle image with formdata or base64
    // Upload image to server and return Image URL

    const formData = new FormData();
    formData.append("image", file);

    // handle the image upload
    const response = await fetch("/api/upload-image", {
      method: "POST",
      headers: {
        Authorization: "Bearer token",
      },
      body: formData,
    });
    const data = await response.json();

    return data.imageUrl; // return the image url
  };

  const handleImageDelete = async (imgSrc: string) => {
    // Write your own delete functionality
    const response = await fetch(
      `/image-delete?src=${encodeURIComponent(imgSrc)}`,
      { method: "DELETE" }
    );
    await response.json();
  };

  return (
    <div>
      <Editor
        isServer
        value={editorContent}
        toolbarClassName="custom-toolbar" //customize toolbar
        editorClassName="custom-editor"  //customize editor
        handleImageUpload={handleImageUpload}
        handleImageDelete={handleImageDelete}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default App;
```

---

### Using TextCrafter with Next.js

#### For App Router (Next.js 13+ with React Server Components)

1. **Import Styles**  
   Import the editor styles in your root layout to apply them globally.

   ```tsx
   import "textcrafter/dist/styles.min.css";
   ```

2. **Add the Editor Component in Page Components**  
   Use the `Editor` component in your page-level components.

   ```tsx
   import React, { useState } from "react";
   import { Editor } from "textcrafter";

   const PageComponent = () => {
     const [editorContent, setEditorContent] = useState("<p>Edit here...</p>");

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

1. **Import Styles in the \_app Component**  
   Include the editor styles in the `_app.js` or `_app.tsx` file.

   ```tsx
   import "textcrafter/dist/styles.min.css";
   ```

2. **Add the Editor Component in Page Components**

   ```tsx
   import React, { useState } from "react";
   import { Editor } from "textcrafter";

   const HomePage = () => {
     const [editorContent, setEditorContent] = useState("<p>Edit here...</p>");

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

TextCrafter offers extensive configuration options to customize the editor to fit your project's requirements:

- **Font Family**: Choose from fonts like Arial, Courier New, Times New Roman, etc.
- **Font Size**: Select font sizes ranging from Tiny to Huge.
- **Text Formatting**: Toggle bold, italic, underline, and strikethrough.
- **Text Alignment**: Align text to the left, center, right, or fully justify it.
- **Lists**: Add ordered and unordered lists for organized content.
- **Tables**: Insert and configure tables with customizable rows and columns.
- **Image Handling**: Upload, delete, and resize images with server-side integration.

---

## Styling & Customization

TextCrafter provides extensive customization options through CSS variables and className props. You can easily modify the appearance to match your application's design system.

### Available CSS Variables

TextCrafter exposes the following CSS variables for customization:

```css
/* Button Styling */
--textcrafter-button-bg: Background color for primary buttons
--textcrafter-button-bg-hover: Hover state for primary buttons
--textcrafter-button-secondary-bg: Background color for secondary buttons
--textcrafter-button-secondary-bg-hover: Hover state for secondary buttons

/* Dropdown & Toolbar */
--textcrafter-dropdown-bg: Dropdown menu background color
--textcrafter-border: Border color for UI elements
```

### Customization in React

#### Step 1: Create Custom Styles

Create a custom CSS file to override the CSS variables and customize toolbar/editor appearance:

```css
/* custom-styles.css */
:root {
  /* Light mode (default) */
  --textcrafter-button-bg: #ffffff;
  --textcrafter-button-bg-hover: #e0e0e0;
  --textcrafter-button-secondary-bg: #f2f2f2;
  --textcrafter-button-secondary-bg-hover: #f0f7ff;
  --textcrafter-dropdown-bg: #ffffff;
  --textcrafter-border: #ddd;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode */
    --textcrafter-button-bg: #2d2d2d;
    --textcrafter-button-bg-hover: #383838;
    --textcrafter-button-secondary-bg: #323232;
    --textcrafter-button-secondary-bg-hover: #213547;
    --textcrafter-dropdown-bg: #383838;
    --textcrafter-border: #6f6e6f;
  }
}

/* Customize toolbar appearance */
.custom-toolbar {
  background-color: #f3f3f3;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Customize editor appearance */
.custom-editor {
  padding: 10px;
  background-color: white;
  border: 1px solid #ababab;
  border-radius: 5px;
}

@media (prefers-color-scheme: dark) {
  .custom-toolbar {
    background-color: #282628;
    border: 1px solid #6f6e6f;
  }

  .custom-editor {
    background-color: #383838;
    border: 1px solid #6f6e6f;
  }
}
```

#### Step 2: Use Custom Styles in Your Component

```tsx
import React, { useState } from "react";
import { Editor } from "textcrafter";
import "textcrafter/dist/styles.min.css";
import "./custom-styles.css";

function App() {
  const [editorContent, setEditorContent] = useState("<p>Start editing...</p>");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div>
      <h1>TextCrafter Editor</h1>
      <Editor
        value={editorContent}
        onChange={handleEditorChange}
        toolbarClassName="custom-toolbar"
        editorClassName="custom-editor"
      />
    </div>
  );
}

export default App;
```

### Customization in Next.js

#### For App Router (Next.js 13+)

1. **Create your custom styles file:**

```css
/* app/styles/textcrafter-custom.css */
:root {
  --textcrafter-button-bg: #ffffff;
  --textcrafter-button-bg-hover: #e0e0e0;
  --textcrafter-button-secondary-bg: #f2f2f2;
  --textcrafter-button-secondary-bg-hover: #f0f7ff;
  --textcrafter-dropdown-bg: #ffffff;
  --textcrafter-border: #ddd;
}

@media (prefers-color-scheme: dark) {
  :root {
    --textcrafter-button-bg: #2d2d2d;
    --textcrafter-button-bg-hover: #383838;
    --textcrafter-button-secondary-bg: #323232;
    --textcrafter-button-secondary-bg-hover: #213547;
    --textcrafter-dropdown-bg: #383838;
    --textcrafter-border: #6f6e6f;
  }
}

.custom-toolbar {
  background-color: #f3f3f3;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-editor {
  padding: 10px;
  background-color: white;
  border: 1px solid #ababab;
  border-radius: 5px;
}

@media (prefers-color-scheme: dark) {
  .custom-toolbar {
    background-color: #282628;
    border: 1px solid #6f6e6f;
  }

  .custom-editor {
    background-color: #383838;
    border: 1px solid #6f6e6f;
  }
}
```

2. **Import styles in your layout.tsx:**

```tsx
import "textcrafter/dist/styles.min.css";
import "./styles/textcrafter-custom.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

3. **Use the Editor in your page:**

```tsx
"use client";

import { useState } from "react";
import { Editor } from "textcrafter";

export default function EditorPage() {
  const [content, setContent] = useState("<p>Edit here...</p>");

  return (
    <div>
      <h1>TextCrafter Editor</h1>
      <Editor
        value={content}
        onChange={setContent}
        toolbarClassName="custom-toolbar"
        editorClassName="custom-editor"
      />
    </div>
  );
}
```

#### For Page Router (Traditional Next.js)

1. **Add styles to your _app.tsx:**

```tsx
import "textcrafter/dist/styles.min.css";
import "../styles/textcrafter-custom.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

2. **Use the Editor in your pages:**

```tsx
import { useState } from "react";
import { Editor } from "textcrafter";

export default function HomePage() {
  const [content, setContent] = useState("<p>Edit here...</p>");

  return (
    <div>
      <h1>TextCrafter Editor</h1>
      <Editor
        value={content}
        onChange={setContent}
        toolbarClassName="custom-toolbar"
        editorClassName="custom-editor"
      />
    </div>
  );
}
```

### Advanced Customization with Image Handling

```tsx
import { useState } from "react";
import { Editor } from "textcrafter";
import "textcrafter/dist/styles.min.css";
import "./custom-styles.css";

function App() {
  const [editorContent, setEditorContent] = useState("");

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      headers: {
        Authorization: "Bearer token",
      },
      body: formData,
    });
    const data = await response.json();
    return data.imageUrl;
  };

  const handleImageDelete = async (imgSrc: string) => {
    await fetch(`/image-delete?src=${encodeURIComponent(imgSrc)}`, {
      method: "DELETE",
    });
  };

  return (
    <div>
      <h1>Advanced TextCrafter Editor</h1>
      <Editor
        isServer
        value={editorContent}
        onChange={setEditorContent}
        toolbarClassName="custom-toolbar"
        editorClassName="custom-editor"
        handleImageUpload={handleImageUpload}
        handleImageDelete={handleImageDelete}
      />
    </div>
  );
}

export default App;
```

### Theme Toggle Example

```tsx
import { useState } from "react";
import { Editor } from "textcrafter";
import "textcrafter/dist/styles.min.css";

function App() {
  const [editorContent, setEditorContent] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div style={{ colorScheme: isDarkMode ? "dark" : "light" }}>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      <Editor
        value={editorContent}
        onChange={setEditorContent}
        toolbarClassName="custom-toolbar"
        editorClassName="custom-editor"
      />
    </div>
  );
}

export default App;
```

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
