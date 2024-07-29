// my-nft-marketplace/my-nft-client/src/App.tsx

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Collection from './Collection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nft/:name" element={<Collection />} />
      </Routes>
    </Router>
  );
}

export default App;
