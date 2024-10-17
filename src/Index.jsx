// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navigation component
import About from './About';   // Import the new About component
import Research from './Research'; // Import the new Research component
import Publications from './Publications'; // Publications
import Teaching from './Teaching';  // Teaching
import Projects from './Projects';  // Projects
import { PortfolioProvider } from './PortfolioContext';
import Background from './Background';

export default function Index() {
  // Your existing state and methods

  return (
    <PortfolioProvider>
    <Router>
      {/* Navigation component will always be visible */}
      <Navbar />

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Routes>
         
          <Route path="/" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/background" element={<Background />} />
        </Routes>
      </div>
    </Router>
</PortfolioProvider>
  );
}
