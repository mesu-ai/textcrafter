import { useState } from "react";
import "./App.css";
import { Editor } from "textcrafter";
import "textcrafter/dist/styles.min.css";

function App() {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

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
    const response = await fetch(
      `/image-delete?src=${encodeURIComponent(imgSrc)}`,
      { method: "DELETE" }
    );
    await response.json();
  };


  return (
    <div>
      <h2>React TextCrafter Example</h2>
      <Editor
        // isServer
        value={editorContent}
        toolbarClassName="custom-toolbar"
        editorClassName="custom-editor"
        // handleImageUpload={handleImageUpload}
        // handleImageDelete={handleImageDelete}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default App;
