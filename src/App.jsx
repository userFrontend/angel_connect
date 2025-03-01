import React from 'react';
import './App.css'
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Chatbot from './components/Chatbot/Chatbot';
import HRPanel from './components/HRpanel/HRpanel';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="app">
      <Header  />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hr' element={<Chatbot/>}/>
        <Route path='/chat' element={<HRPanel />}/>
      </Routes>
    </div>
  );
}

export default App;