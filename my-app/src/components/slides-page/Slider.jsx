import axios from 'axios'
import { useEffect, useState } from 'react';
import Video from './Video';
import PdfFile from './PdfFile';
import { PDFViewer } from '@react-pdf/renderer';


export default function Slider() {
    const [data, setData] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);

    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:5000/files');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    useEffect(() => {
      fetchData()
    },[])

    return (
      <div className="slider">
        {data.filter(file => file.endsWith('.mp4') || file.endsWith('.html') || file.endsWith('.pdf')).map((file ,index) => {
          if (file.endsWith('.mp4')) {
            return (
              <Video key={index} file={file}/>
            )
          }
          else
          {
            return (
              <div key={index}>
                <PdfFile file={file}/>
              </div>  
            )
          }
        })}
      </div>
    );
  }
  