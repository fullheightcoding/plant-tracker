import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
    </Routes>
  </BrowserRouter>
);