import React from 'react';
import eye_slash from '../../landing/favicon/eye-slash-solid.svg';
import eye_solid from '../../landing/favicon/eye-solid.svg';
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
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
          timer: 10000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
           }
        });
        e.preventDefault();
        console.log(process.env.REACT_APP_API_ENDPOINT);
        console.log("Fomulario Enviado....")
        const {Email,Password}=this.state;
        var datosEnviar={email:Email,password:Password}        
        axios.post(process.env.REACT_APP_API_ENDPOINT+"login",datosEnviar).then(result => {
        var nombre=result.data.NombresUsuarios;
        var apellidos=result.data.ApellidosUsuarios;  
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('Login', result.data.Login);    
        toast.fire({
          icon: 'success',
          title: ''+result.data.message+' '+nombre+' '+apellidos+'',
          confirmButtonText: `Ok`,
        })    
        var cliente = result.data.Cliente;
        if (cliente === 'ATENAS') {
          window.location.href = 'management/panel'
        } else {
          console.log('no')
        }  
        }).catch(err => {
          console.log(err)
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
                                     onKeyUp={(e)=>{
                                        if(e.key === 'Enter'){
                                          this.enviarDatos(e)
                                        }
                                       }
                                     }
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
  

