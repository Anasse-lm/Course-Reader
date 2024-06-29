import axios from 'axios'
import { useEffect, useState } from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import Video from './Video';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
              <Video index={index} file={file}/>
            )
          }
        })}
      </div>
    );
  }
  