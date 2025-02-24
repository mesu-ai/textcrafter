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
    formData.append("File", file);


    // const reader= new FileReader();
    // reader.readAsDataURL(file);

    // const base64 = await new Promise<string>((resolve, reject)=>{
    //   reader.onload = () => resolve(reader.result as string);
    //   reader.onerror = reject;
    // })

    formData.append("MediaStorageInfo.Name", file.name);
    formData.append("MediaStorageInfo.ValidExt", ".jpg,.jpeg,.png");
    formData.append("MediaStorageInfo.UseFor", "category");


    console.log({ formData, file });

        // const MediaStorageInfo = {
        //   Id: 0,
        //   File: base64,
        //   Name: file.name,
        //   ValidExtensions: ".jpg,.jpeg,.png",
        //   UseFor:"category",
        // };

    const response = await fetch(
      "https://prod.saraemart.com/api/Media/CreateOrUpdateFile",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4MSIsImVtYWlsIjoiMCIsInVuaXF1ZV9uYW1lIjoiU2FSYSBBZG1pbiIsImNlcnRzZXJpYWxudW1iZXIiOiI4MSIsInJvbGUiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwIiwibmJmIjoxNzQwMzc2ODI0LCJleHAiOjE3NDI5Njg4MjQsImlhdCI6MTc0MDM3NjgyNH0.7IGiPjZqGlbpsFykcz1YmizlF327yQtRh63rM26FeE2erzoOlbYZRbGDsrg72MgwwEdc4egH6CcVDX8nkXyAyw",
        },
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);

    console.log(`https://prod.saraemart.com${data.optional}`)
  
    return `https://prod.saraemart.com${data.optional}`;
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

  // fetch(`${apiEndpoint?.deleteImage}?src=${encodeURIComponent(imgSrc)}`, { method: 'DELETE' });

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
