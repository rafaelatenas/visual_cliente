import React from 'react';
import ReactDOM from 'react-dom';

import Home from './componentes/Home/home';
//import Admin from './componentes/Admin/admin';
import Login from './componentes/Login/login';
import './index.css';
import reportWebVitals from './reportWebVitals';



function Tester(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <Login />;
  }
  return <Home />;
}

ReactDOM.render(
  <Tester isLoggedIn={true} />,
  document.getElementById('root')
);

reportWebVitals();
