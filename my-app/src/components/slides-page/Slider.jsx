import axios from 'axios'
import { useEffect, useState } from 'react';
export default function Slider() {
    const [data, setData] = useState([])
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:5000/files');
        console.log(response.data);
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
        <ul>
          {data.map((d, index) => (
            <li key={index}>{d}</li>
          ))}
        </ul>
      </div>
    );
  }
  