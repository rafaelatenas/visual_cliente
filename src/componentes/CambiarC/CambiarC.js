import React from 'react';
import { Link } from 'react-router-dom';
import eye_slash from '../../landing/favicon/eye-slash-solid.svg';
import eye_solid from '../../landing/favicon/eye-solid.svg';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './CambiarC.css';


class CambiarC extends React.Component{

    constructor(props) {
        super(props)            
          this.state = {
            formErrors: {
                Password: '',
                ConfirmacionPassword:'',
                },
            passwordValid: false,
            confirmacionpasswordValid: false,
            Password: '',
            ConfirmacionPassword:'',
            } 
        }
        

        validateField(fieldName, value) {
            let fieldValidationErrors = this.state.formErrors;
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
                passwordValid: passwordValid,
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
            const {Password, ConfirmacionPassword}=this.state;
            var datosEnviar={password:Password, confirmacionPassword:ConfirmacionPassword }

            axios.post(process.env.REACT_APP_API_ENDPOINT+"login",datosEnviar)
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
            <section className='contenedorcambio'>
                <div className='cambiarC'>
                
                <form className='formcambio'>
                        <div className='formcontraseña'>
                            <label>Nueva Contraseña:</label>
                            <input id='contraseña' type='password' className='contraseña'></input>
                        </div>
                        <div className='formconfirmar'>
                            <label> Confirmar Contraseña:</label>
                            <input id='confirmar' type='password' className='contraseña confirmar'></input>
                            <img id="solid_eye" onClick={mostrarC} className='eye' src={eye_solid} alt="Mostrar Contraseña"></img>
                            <img  id="slash_eye" onClick={mostrarC} className='eye' style={{visibility:'hidden'}} src={eye_slash} alt="Mostrar Contraseña"></img>    
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
export default CambiarC;


function mostrarC() {
    var password = document.getElementById("contraseña");
    var confirmarPass = document.getElementById("confirmar");
    const solid = document.getElementById('solid_eye');
    const slash = document.getElementById('slash_eye');
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
