import React from 'react';
import { Routes, Route } from 'react-router-dom';



import Client from './pages/Client/Client.js';
import Header from './pages/Header/Header.js';
import Home from './pages/Home/Home.js';
import Introduction from './pages/Introduction/Introduction.js';
import Service from './pages/Service/Service.js';
import './App.css';
import LayoutDefault from './Layout/LayoutDefaut.js';
function App() {
  return (
    <>
      
      <main>
        <Routes> 
          <Route path="/" element={<LayoutDefault />} >

            
            <Route path="/" element={<Home />} />
            <Route path="/client" element={<Client />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/service" element={<Service />} />
          </Route>
          
        </Routes>
      </main>
    </>
  );
}

export default App;