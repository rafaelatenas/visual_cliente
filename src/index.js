import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './componentes/Admin/admin';
import Login from './componentes/Login/login';
import './index.css';
import reportWebVitals from './reportWebVitals';



function Tester(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <Admin />;
  }
  return <Login />;
}

ReactDOM.render(
  <Tester isLoggedIn={true} />,
  document.getElementById('root')
);

// ReactDOM.render(
  
//      <Home/>,
    
  
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
