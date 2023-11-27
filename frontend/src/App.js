// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home'; // Make sure the file and component names match
import Players from './components/board';
import MatchesTable from './components/matches';

const App = () => { 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/matches" element={<MatchesTable />} />
      </Routes>
    </Router>
  );
};

export default App;
