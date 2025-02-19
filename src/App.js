import logo from './logo.svg';
import './App.css';
import React from 'react';
import Dashboard from './components/Dashboard'
import Header from './components/Header'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='dashboad'>
        <Dashboard />
      </div>
    </div>  
  );
}

export default App;
