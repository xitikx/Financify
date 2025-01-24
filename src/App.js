// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import pages
import LandingPage from './pages/Landing'; 
import LoginPage from './pages/LoginPage'; 
import SignUpPage from './pages/SignUpPage'; 
import Dashboard from './pages/Dashboard';
// import SavingsPieChartPage from './pages/savingsPieChartPage';
import Expenses from './pages/Expenses';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/savings-pie-chart" element={SavingsPieChartPage} /> */}
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
