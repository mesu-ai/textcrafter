
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
      <Editor
        value={editorContent}
        onChange={handleEditorChange}
        isServer
        token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsImp0aSI6ImI2OGFlMzAyLWIyZWEtNGQ0NC1iOWU2LWQwY2NhNzdmOTJjOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiZThkOTdjZWYtNjlkZC00NDZmLWEyNTgtZjJhYmJhODYyMDhmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTczNTgxMTk3MSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzAvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzAvIn0.a6HmUOfcS-K5-4NghDq9pSU7cG2K0T1mbSZWIkHEJQY'
        apiEndpoint={{ uploadImage: "https://foodvillage.live/api/Banner/CreateOrUpdateCommonImage", deleteImage: "" }}
      />
    </div>
  );
}

export default App
