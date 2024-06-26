import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Main({ setCanAccessSlider }) {
  const [ files, setFiles ] = useState([])
  const navigate = useNavigate()
  const handleUploadDir = async() => {
    const response = await axios.delete('http://localhost:5000/delete')
  }
  useEffect(() => {
    handleUploadDir()
  },[])

  
  const handleDirectoryUpload = async (event) => {
    const fileList = Array.from(event.target.files);
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
      const dirName = fileList[0].webkitRelativePath.split('/')[0];
      localStorage.setItem('path', dirName)
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleReadButton = () => {
    setCanAccessSlider(true)
    navigate('/slider')
  };

  const handleClearButton = () => {
    const inputVal = document.getElementById('inputVal')
    inputVal.value = ''
    handleUploadDir()
    setCanAccessSlider(false)
    setFiles([])
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