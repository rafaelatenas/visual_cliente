import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from './componentes/Admin/admin';
import CambiarC from './componentes/CambiarContaseña/CambiarC';
import Home from './componentes/Home/home';
import Login from './componentes/Login/login';


const AppRoutes = () =>

<Login>
    <BrowserRouter>
        <Routes>
            <Route exact path="/" component={Login} />
            <Route exact path="home" component={Home} />
            <Route exact path="data/reports" component={Home} />
            {/* Componentes de Gestión de Usuario */}
            <Route exact path="change/password" component={CambiarC}/>
            <Route exact path="management/panel" component={Admin}/>
        </Routes>
    </BrowserRouter>
</Login>;

export default AppRoutes;