import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FilesContext } from '../context/FilesContext';

function Main() {
  const { files, setFiles } = useContext(FilesContext);
  const navigate = useNavigate();

  const handleDirectoryUpload = async (event) => {
    const fileList = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFiles(response.data.files);
      const name = fileList[0].webkitRelativePath.split('/')[0];
      localStorage.setItem('directoryName', name);
      localStorage.setItem('files', JSON.stringify(response.data.files));
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleReadButton = () => {
    navigate('/slider');
  };

  const handleClearButton = () => {
    const inputVal = document.getElementById('inputVal')
    inputVal.value = ''
  }
  return (
    <main className="main container">
      <div className="input-group mb-3">
        <input
          id="inputVal" 
          type="file"
          webkitdirectory="true"
          directory="true"
          multiple
          onChange={handleDirectoryUpload}
        />
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
export default Main;