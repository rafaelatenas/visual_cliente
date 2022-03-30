import React from 'react';
import eye_slash from '../../landing/favicon/eye-slash-solid.svg';
import eye_solid from '../../landing/favicon/eye-solid.svg';
import './login.css';



class Login extends React.Component {
 
    
	render() {
  return (

    <div className="card">
        <div className='card-login'>
            <form className='form-body' action='login'>
                <div className='form'>
                    <div className='form-group'>
                        <input type='email' name="email" className='form-control' id='inputEmail' placeholder='Email'></input>
                    </div> 
                    
                    <div className='form-group'>
                        <input type='password' name="password" className='form-control' id="inputPassword" placeholder="Password"></input>
                        <img id="solid" className='eye-show' src={eye_solid} alt="Mostrar Contraseña"></img>
                        <img  id="slash" className='eye-show' style={{visibility:'hidden'}} src={eye_slash} alt="Mostrar Contraseña"></img>
                    </div>
                </div>
                <div className='buttons'>
                    <button type='button' className='interaction log-in'><a href='../home/home'>Log in</a></button>
                </div>
            </form>
        </div>
    </div>
    
  );
  } 
}
export default Login;
