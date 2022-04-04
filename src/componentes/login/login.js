import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import eye_slash from '../../landing/favicon/eye-slash-solid.svg';
import eye_solid from '../../landing/favicon/eye-solid.svg';
import CambiarC from '../CambiarC/CambiarC';
import Home from '../Home/home';
import './login.css';




class Login extends React.Component {

     constructor(props) {
         super(props);
         this.state = {
            username: '',
            password: '',
            formErrors: {Email: '', Password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        };
            
       }
    
       handleUsername (e){
             this.setState({username: e.target.value});
       }
    
       handlePassword (e){
             this.setState({password: e.target.value});
       }  
    
       Logeo (e){
         e.preventDefault();

         const username = this.state.username;
         const password = this.state.password;
         let urlEnvio='http:localhost:3005/VisorCliente_Api/ListarUsuarios';

         fetch (urlEnvio, {
             method: 'GET'
           })
         .then(res => res.json())
         .then(res => {});
            
             fetch(urlEnvio).then(function(response) {
                
                  fetch (urlEnvio, {
                     method: 'GET'
                 })
                     .then(res => res.json())
                     .then(res => {
                         res.data.forEach(dataUsuario => {
                             console.log(dataUsuario)
                             var IndActivo = dataUsuario.Ind_Activo
                             if(response.status === 200){
                                
                                 if ((dataUsuario.correo === username) & (IndActivo === true) ) {
                                    
                                     ReactDOM.render(
                                         <Home to='./Home'/>,
                                         document.getElementById('root')
                                     );
                                     console.log(123)
                                 }else{
                                     ReactDOM.render(
                                         <CambiarC to='./CambiarC'/>,
                                         document.getElementById('root')
                                     );
                                 }
                             }else{
                                 console.log(321)
                             } 
                         });
                       
                        
                 

                         console.log(response)
                     });

     });
    
     }; 
    
	render() {

        return (
            <section className='contenedorcard'>
                <div className="card">
                    <div className='card-login'>
                        <form className='form-body' action='login'>
                            <div className='form'>
                                <div className='form-group'>
                                    <input 
                                     value={this.state.username}
                                     onChange={this.handleUsername.bind(this)}
                                    type='email' 
                                    name="email" 
                                    className='form-control' 
                                    id='inputEmail' 
                                    placeholder='Email'></input>
                                </div>

                                <div className='form-group'>
                                    <input 
                                     value={this.state.password}
                                     onChange={this.handlePassword.bind(this)}
                                    type='password' name="password"
                                    className='form-control' 
                                    id="inputPassword" 
                                    placeholder="Password"></input>
                                    <img id="solid" onClick={mostrarPDW} className='eye-show' src={eye_solid} alt="Mostrar Contraseña"></img>
                                    <img  id="slash" onClick={mostrarPDW} className='eye-show' style={{visibility:'hidden'}} src={eye_slash} alt="Mostrar Contraseña"></img>
                                </div>
                            </div>
                            <div className='buttons'>
                                <button
                                type='button' 
                                className='interaction log-in'>
                                    <Link to={"/home"}>Login</Link>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        )
    };
}
export default Login;

    
   function mostrarPDW() {
    var password = document.getElementById("inputPassword");
    const solid = document.getElementById('solid');
    const slash = document.getElementById('slash');

    if (password.type === "password") {
        password.type = "text";
        slash.style.visibility = "visible";
        solid.style.visibility = "hidden"
    }else {
        password.type = "password";
        solid.style.visibility = "visible"
        slash.style.visibility = "hidden"
    }
   };
  

