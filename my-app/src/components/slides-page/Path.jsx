import { useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Path() {
    const path = localStorage.getItem('path')
    
    return (
      <div className="path-info">
        <Link to="/" >
          <ArrowBackIcon />
        </Link>
        <h4>{path}</h4>
      </div>
    );
  }
  