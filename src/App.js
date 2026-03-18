import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import LandingPage from './pages/LandingPage';
import PortfolioPage from './pages/PortfolioPage';
import ResumePage from './pages/ResumePage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </AdminProvider>
    </HashRouter>
  );
}

export default App;
