import { useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Path() {
    const path = localStorage.getItem('path')
    useEffect(() => {
      console.log(path);
    })
    return (
      <div className="path-info">
        <Link to="/" >
          <ArrowBackIcon />
        </Link>
        <h3>{path}</h3>
      </div>
    );
  }
  