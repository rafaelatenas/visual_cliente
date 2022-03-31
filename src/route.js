import React from 'react';
import { Route, Switch } from 'react-router-dom';
//Components
import App from './App';
import CambiarC from './componentes/CambiarContaseña/CambiarC';
import Home from './componentes/Home/home';
import Pagina404 from './Pagina404/Pagina404';






const AppRoutes = () =>

<App>
    <Switch>
        <Route exact path="/Home" component = {Home} />
        <Route exact path="/CambiarC" component = {CambiarC} />
        <Route exact path="/Opcion3" component = {Opcion3} />
        <Route component={Pagina404} />
    </Switch>
</App>;

export default AppRoutes;