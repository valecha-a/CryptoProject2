// Part A working code:
//my-nft-marketplace/contracts_frontend/src/App.tsx
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ConnectWalletButton from './components/ConnectWalletButton';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nft/:wallet" element={<ConnectWalletButton />} />
      </Routes>
    </Router>
  );
}

export default App;