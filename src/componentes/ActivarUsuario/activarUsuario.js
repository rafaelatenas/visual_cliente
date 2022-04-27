import React from 'react';
import { Link } from 'react-router-dom';
import eye_slash from '../../landing/favicon/eye-slash-solid.svg';
import eye_solid from '../../landing/favicon/eye-solid.svg';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './activarUsuario.css';


class ActivarUsuario extends React.Component{

    constructor(props) {
        super(props)            
          this.state = {
            formErrors: {
                Usuario:'',
                Password: '',
                ConfirmacionPassword:'',
                },
            usuarioValid:false,
            passwordValid: false,
            confirmacionpasswordValid: false,
            Usuario:'',
            Password: '',
            ConfirmacionPassword:'',
            } 
        }
        

        validateField(fieldName, value) {
            let fieldValidationErrors = this.state.formErrors;
            let usuarioValid = this.state.usuarioValid;
            let passwordValid = this.state.passwordValid;
            let confirmacionpasswordValid = this.state.confirmacionpasswordValid;
      
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
      
           switch(fieldName) {
            case 'Email':
              usuarioValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              fieldValidationErrors.Usuario = usuarioValid ? '' : ' es invalido';
              break;
            case 'Password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.Password = passwordValid ? '': ' es demasiado corto';
                break;
            case 'ConfirmacionPassword':
                confirmacionpasswordValid = value.length >= 6;
                fieldValidationErrors.ConfirmacionPassword = confirmacionpasswordValid ? '': ' es demasiado corto';
                break;
            default:
                break;
      
            }
      
            this.setState(
              {
                formErrors: fieldValidationErrors,
                usuarioValid: usuarioValid,
                passwordValid: passwordValid,
                confirmacionpasswordValid: confirmacionpasswordValid
              }, 
              this.validateForm
              );
          }
          errorClass(error) {
            return(error.length === 0 ? '' : 'has-error');
          }
          validateForm() {
            this.setState({formValid: this.state.passwordValid});
          }
          
          handleUserInput = (e) => {
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
            console.log("Fomulario Enviado....")
            const {Password, Usuario}=this.state;
            var datosEnviar={password:Password, usuario:Usuario }

            axios.post(process.env.REACT_APP_API_ENDPOINT+"ActivarUsuario",datosEnviar)
                .then((result) => {
                this.setState({status:true})
                console.log(result)
                console.log(result.data);  
      
                  toast.fire({
                    icon: 'success',
                    title: ''+result.data.message+'',
                    confirmButtonText: `Ok`,
                  })
                })
                .catch((error) => {
                  console.error(error)
                  console.log(error.response.data.message);
                  console.log(error.response.status);
                  console.log(error.response.headers);        
                    toast.fire({
                      icon: 'error',
                      title: ''+error.response.message+'',
                      confirmButtonText: `Ok`,
                      })              
                })
          }

    render(){
        return(
            <section className='contenedorActivacion'>
                <div className='activarUs'>

                <form className='formActivacion'>
                    <div className='activacionUsuario'>
                            <label>Usuario:</label>
                            <input id='usuario' type='text' placeholder='Introduzca su Correo' className='activacion'></input>
                        </div>
                        <div className='activacionContraseña'>
                            <label>Nueva Contraseña:</label>
                            <input id='contraseña' type='password' placeholder='Introduzca su Contraseña' className='activacion'></input>
                        </div>
                        <div className='activacionConfirmar'>
                            <label> Confirmar Contraseña:</label>
                            <input id='confirmar' placeholder='confirmas su Contraseña' type='password' className='activacion confirmar'></input>
                            <img id="solid_eyeAc" onClick={mostrarC} className='eyeAc' src={eye_solid} alt="Mostrar Contraseña"></img>
                            <img  id="slash_eyeAc" onClick={mostrarC} className='eyeAc' style={{visibility:'hidden'}} src={eye_slash} alt="Mostrar Contraseña"></img>    
                        </div>
                        <button 
                                onClick={this.enviarDatos}
                                className='enviarform' 
                                type='submit'>Confirmar</button>
                    </form> 

                     
                </div>
                
                
            </section>
        )
    };
};
export default ActivarUsuario;


function mostrarC() {
    var password = document.getElementById("contraseña");
    var confirmarPass = document.getElementById("confirmar");
    const solid = document.getElementById('solid_eyeAc');
    const slash = document.getElementById('slash_eyeAc');
console.log(password.type)
    if (password.type === "password") {
        password.type = "text";
        confirmarPass.type = "text";
        slash.style.visibility = "visible";
        solid.style.visibility = "hidden"
    }else {
        password.type = "password";
        confirmarPass.type = "password";
        solid.style.visibility = "visible"
        slash.style.visibility = "hidden"
    }
   };
