import HomePage from './components/home-page/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import AboutUs from './components/home-page/AboutUs';
import Donate from './components/home-page/Donate';
import SlidesPage from './components/slides-page/SlidesPage';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const [canAccessSlider, setCanAccessSlider] = useState(true);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage setCanAccessSlider={setCanAccessSlider}/>} />
          <Route path="/slider" caseSensitive={true} element={canAccessSlider ? <SlidesPage/> : <Navigate to='/'/>}/>
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
