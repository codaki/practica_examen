import React, { useState } from "react";
import { uploadFile } from "../api";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const response = await uploadFile(file);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error al subir el archivo");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Archivo</button>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
