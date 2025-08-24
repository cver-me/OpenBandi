import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BandoDetailPage from './pages/BandoDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bando/:id" element={<BandoDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;