import axios from 'axios'
import { useEffect, useState } from 'react';
export default function Slider() {
    const [data, setData] = useState([])
    
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
        {data.filter(file => file.endsWith('.mp4') || file.endsWith('.html')).map((file ,index) => (
          <div key={index}>
            <h3>{file}</h3>
            <video width="320" height="200" controls>
              <source src={`http://localhost:5000/uploads/${file}`} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    );
  }
  