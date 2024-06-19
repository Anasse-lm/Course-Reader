import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import SlidesPage from './slides-page/SlidesPage';

function RouterController() {
  return (
    <Router>
      <div className="router-controller">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/slider" element={<SlidesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RouterController;
