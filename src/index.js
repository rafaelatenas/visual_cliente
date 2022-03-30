import React from 'react';
import ReactDOM from 'react-dom';
import Home from './componentes/Home/Home';
import Login from './componentes/login/login';
import './index.css';
import reportWebVitals from './reportWebVitals';



function Tester(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <Home />;
  }
  return <Login />;
}

ReactDOM.render(
  <Tester isLoggedIn={false} />,
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
