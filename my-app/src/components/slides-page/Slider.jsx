import axios from 'axios'
import { useEffect, useState } from 'react';
import Video from './Video';
import PdfFile from './PdfFile';
import SlideBtn from './btns/SlideBtn';


export default function Slider() {
    const [data, setData] = useState([])
    const [slideIndex, setSlideIndex] = useState(0)
    const [filesExceptStr, setFilesExceptStr] = useState([])

    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:5000/files');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const nextHandle = () => {
      if (slideIndex !== filesExceptStr.length - 1)
        setSlideIndex(slideIndex + 1)
      else if (slideIndex === filesExceptStr.length - 1)
        setSlideIndex(0)
    }

    const prevHandle = () => {
      if (slideIndex !== 0)
        setSlideIndex(slideIndex - 1)
      else if (slideIndex === 0)
        setSlideIndex(filesExceptStr.length - 1)
    }
    useEffect(() => {
      fetchData()
    },[])

    useEffect(() => {
      setFilesExceptStr(Array.from(data.filter(file => file.endsWith('.mp4') || file.endsWith('.html'))))
    },[data])

    return (
      <div className='slider-container'>
        <div className="slider" style={{ transform: `translateX(-${slideIndex * 100}% + 50px)` }}>
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
        <div className='btns' style={{display:'relative', margin:'auto'}}>
          <SlideBtn direction={'back'} moveSlide={prevHandle}/>
          <SlideBtn direction={'next'} moveSlide={nextHandle}/>
        </div>
      </div>
    );
  }
  