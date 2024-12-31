
import { useState } from 'react';
import './App.css'
import { Editor } from 'textcrafter';
import 'textcrafter/dist/styles.min.css';

function App() {
  const [editorContent, setEditorContent] = useState('<p>Start editing...</p>');

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div>
      <h2>React TextCrafter Example</h2>
      <Editor value={editorContent} onChange={handleEditorChange} />
    </div>
  )
}

export default App
