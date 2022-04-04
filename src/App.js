import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Admin from './componentes/Admin/admin';
import CambiarC from './componentes/CambiarC/CambiarC';
import DataReport from './componentes/Data/data';
import Home from './componentes/Home/home';
import Login from './componentes/Login/login';

function App() {
  return (  
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="home" element={<Home/>} />
            <Route exact path="data" element={<DataReport/>} />
            {/* Componentes de Gestión de Usuario */}
            <Route exact path="home/CambiarC/CambiarC" element={<CambiarC/>}/>
            <Route exact path="management/panel" element={<Admin/>}/>
        </Routes>
    </BrowserRouter>  
  );
}
export default App;
