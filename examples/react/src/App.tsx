import { useState } from "react";
import "./App.css";
import { Editor } from "textcrafter";
import "textcrafter/dist/styles.min.css";

function App() {
  const [editorContent, setEditorContent] = useState("<p>Start editing...</p>");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleImagaUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    console.log({ formData, file });

    const response = await fetch("/api/upload-image", {
      method: "POST",
      headers: {
        Authorization: "Bearer token",
      },
      body: formData,
    });
    const data = await response.json();
    console.log({ data });
    return data.imageUrl;
  };

  const handleImageDelete = async (imgSrc: string) => {
    console.log({ imgSrc });
    const response = await fetch(
      `/image-delete?src=${encodeURIComponent(imgSrc)}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    console.log({ data });
  };


  return (
    <div>
      <h2>React TextCrafter Example</h2>
      <Editor
        isServer
        value={editorContent}
        customToolbarClass="custom-toolbar"
        customEditorClass="custom-editor"
        handleImagaUpload={handleImagaUpload}
        handleImageDelete={handleImageDelete}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default App;
