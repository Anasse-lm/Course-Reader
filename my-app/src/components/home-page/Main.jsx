import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { FilesContext } from "../context/FilesContext";
export default function Main() {

  let {files, setFiles} = useContext(FilesContext);
  let navigate = useNavigate()

  
  function handleDirectoryUpload(event)
  {
    const directoryFiles = []
    const fileList = event.target.files
    // Extract directory name from the first file's webkitRelativePath
    const directoryName = fileList.length > 0 ? fileList[0].webkitRelativePath.split('/')[0] : '';
    
    console.log(directoryName);

    for (let i = 0; i < fileList.length; i++)
    {
      directoryFiles.push(fileList[i])
    }

    setFiles(directoryFiles)
    console.log(directoryName + "from main");
    localStorage.setItem('filesPath', directoryName)
  }
  
  const handleReadButton = () =>
  {
    navigate('/slider')
  };

  const handleClearButton = () => 
  {
    const uploadInput = document.getElementById('upload-input')
    setFiles([]); // Clear files state
    uploadInput.value = ''
  };

  return (
    <main className="main container">
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button">
          <input 
            id="upload-input"
            type="file"
            webkitdirectory="true"
            directory="true"
            multiple
            onChange={handleDirectoryUpload}
          />
        </button>
      </div>
      <div>
        <button className="btn btn-primary m-2" onClick={handleReadButton} disabled={files.length === 0}>
        **** Read ****
        </button>
        <button className="btn btn-primary" onClick={handleClearButton} disabled={files.length === 0}>
        **** Clear ****
        </button>
      </div>
    </main>
  );
}
