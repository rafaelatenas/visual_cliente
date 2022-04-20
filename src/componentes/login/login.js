import React from 'react';
//import ReactDOM from 'react-dom';
//import { Link } from 'react-router-dom';
import eye_slash from '../../landing/favicon/eye-slash-solid.svg';
import eye_solid from '../../landing/favicon/eye-solid.svg';
// import CambiarC from '../CambiarC/CambiarC';
// import Home from '../Home/Home';
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import { useNavigate } from 'react-router-dom';


class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          Email: '',
          Password: '',
          formErrors: {Email: '', Password: ''},
          emailValid: false,
          passwordValid: false,
          formValid: false
        }
      }

      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
          case 'Email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.Email = emailValid ? '' : ' es invalido';
            break;
          case 'Password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.Password = passwordValid ? '': ' es demasiado corto';
            break;
          default:
            break;
        }
        this.setState(
          {
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
          }, 
          this.validateForm
          );
      }
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
      }
      
      handlePassword = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => { this.validateField(name, value) });
      }
      handleUserEmail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => { this.validateField(name, value) });
       }  
      enviarDatos=(e)=>{ 
        const MySwal = withReactContent(Swal)
        const toast = MySwal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
           }
        });
        e.preventDefault();
        console.log('http:localhost:3005/VisorCliente_Api/NuevoUsuarios');
        console.log("Fomulario Enviado....")
        const {Email,Password}=this.state;
        var datosEnviar={email:Email,password:Password}

        axios.post('http:localhost:3005/VisorCliente_Api/NuevoUsuarios',datosEnviar).then(res => {
          console.log(res)
          var nombres=res.data.nombres;
          var apellidos=res.data.apellidos;  
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('Login', res.data.Login);    
          toast.fire({
            icon: 'success',
            title: ''+res.data.message+' '+nombres+' '+apellidos+'',
            confirmButtonText: `Ok`,
        })    
        
        let navigate = useNavigate();
        navigate('/home');    
        }).catch(err => {
          if (err.response) {
            console.log(err.response.data.message);
            console.log(err.response.status);
            console.log(err.response.headers);        
          }       
          toast.fire({
            icon: 'error',
            title: ''+err.response.data.message+'',
            confirmButtonText: `Ok`,
          })    
        })
    }


    //  constructor(props) {
    //      super(props);
    //      this.state = {
    //         username: '',
    //         password: '',
    //         formErrors: {Email: '', Password: ''},
    //         emailValid: false,
    //         passwordValid: false,
    //         formValid: false
    //     };
            
    //    }
    
    //    handleUsername (e){
    //          this.setState({username: e.target.value});
    //    }
    
    //    handlePassword (e){
    //          this.setState({password: e.target.value});
    //    }  
    
    //    Logeo (e){
    //      e.preventDefault();

    //      const username = this.state.username;
    //     //  const password = this.state.password;
    //      let urlEnvio='http:localhost:3005/VisorCliente_Api/ListarUsuarios';

    //      fetch (urlEnvio, {
    //          method: 'GET'
    //        })
    //      .then(res => res.json())
    //      .then(res => {});
            
    //          fetch(urlEnvio).then(function(response) {
                
    //               fetch (urlEnvio, {
    //                  method: 'GET'
    //              })
    //                  .then(res => res.json())
    //                  .then(res => {
    //                      res.data.forEach(dataUsuario => {
    //                          console.log(dataUsuario)
    //                          var IndActivo = dataUsuario.Ind_Activo
    //                          if(response.status === 200){
                                
    //                              if ((dataUsuario.correo === username) & (IndActivo === true) ) {
                                    
    //                                  ReactDOM.render(
    //                                      <Home to='./Home'/>,
    //                                      document.getElementById('root')
    //                                  );
    //                                  console.log(123)
    //                              }else{
    //                                  ReactDOM.render(
    //                                      <CambiarC to='./CambiarC'/>,
    //                                      document.getElementById('root')
    //                                  );
    //                              }
    //                          }else{
    //                              console.log(321)
    //                          } 
    //                      });
                       
                        
                 

    //                      console.log(response)
    //                  });

    //  });
    
    //  }; 
    
	render() {

        return (
            <section className='contenedorcard'>
                <div className="card">
                    <div className='card-login'>
                        <form className='form-body' action='login' onSubmit={this.enviarDatos}>
                            <div className='form'>
                                <div className='form-group'>
                                    <input 
                                     value={this.state.Email} 
                                     onChange={this.handleUserEmail}
                                    type='email' 
                                    name="Email" 
                                    className='form-control' 
                                    id='inputEmail' 
                                    placeholder='Email'></input>
                                </div>

                                <div className='form-group'>
                                    <input 
                                     value={this.state.Password} 
                                     onChange={this.handlePassword}
                                    type='password' 
                                    name="Password"
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
                                onClick={this.enviarDatos} 
                                disabled={!this.state.formValid}
                                className='interaction log-in'>
                                    Login
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
  

