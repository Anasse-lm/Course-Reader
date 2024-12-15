import axios from 'axios'
import { useEffect, useState } from 'react';
import Video from './Video';
import PdfFile from './PdfFile';
import SlideBtn from './btns/SlideBtn';


export default function Slider() {
    const [data, setData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [filesExceptStr, setFilesExceptStr] = useState([])
    
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:5000/files');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const nextSlide = () => {
      // setCurrentIndex((prevIndex) => (prevIndex + 1) % filesExceptStr.length);
    };
  
    const prevSlide = () => {
      // setCurrentIndex((prevIndex) => (prevIndex - 1 + filesExceptStr.length) % filesExceptStr.length);
    };

    useEffect(() => {
      fetchData()
    },[])

    useEffect(() => {
      setFilesExceptStr(Array.from(data.filter(file => file.endsWith('.mp4') || file.endsWith('.html'))))
    },[data])

    return (
      <div className='slider-container'>
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 100 }%)` }}>
          {data.filter(file => file.endsWith('.mp4') || file.endsWith('.html') || file.endsWith('.pdf')).map((file ,index) => {
            if (file.endsWith('.mp4')) {
              return (
                <div className='slide'>
                  <Video key={index} file={file}/>
                </div>
              )
            }
            else
            {
              return (
                <div key={index} className='slide'>
                  <PdfFile file={file}/>
                </div>  
              )
            }
          })}
        </div>
        <div className='btns' style={{display:'relative', margin:'auto'}}>
          <SlideBtn direction={'back'} moveSlide={prevSlide}/>
          <SlideBtn direction={'next'} moveSlide={nextSlide}/>
        </div>
      </div>
    );
  }
  