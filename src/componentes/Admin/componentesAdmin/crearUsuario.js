import React from "react";
import { FormErrors } from "../FormErrors"
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';


export default class crearUsuario extends React.Component{
    //Validación de Formulario

    constructor (props) {
        super(props);
        this.state = { 
            formErrors: {
                Nombres:'',
                Apellidos:'',
                Email: '',
                Password: '',
                ConfirmacionPassword:'',
            },
            nombresValid: false,
            apellidosValid: false,
            emailValid: false,
            passwordValid: false,
            confirmacionpasswordValid: false,
            nivelValid: false,
            clienteValid: false,
            formValid: false,
            Nombres:'',
            Apellidos:'',
            Email:'',
            Password:'',
            ConfirmacionPassword:''

        }    
     } 
     
     validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nombresValid= this.state.nombresValid;
        let apellidosValid= this.state.apellidosValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
       // let confirmacionpasswordValid = this.state.confirmacionpasswordValid;
        switch(fieldName) {

          case 'Nombres':
            nombresValid = value.length >= 6;
            fieldValidationErrors.Nombres = nombresValid ? '' : ' es demasiado corto';
            console.log(this.state.formErrors.Nombres)

            break;
            case 'Apellidos':
                apellidosValid = value.length >= 6;
                fieldValidationErrors.Apellidos = apellidosValid ? '' : ' es demasiado corto';
                console.log(this.state.formErrors.Apellidos)
                
            break;  
          case 'Email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.Email = emailValid ? '' : ' es invalido';
            console.log(this.state.formErrors.Email)
            
            break;
          case 'Password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.Password = passwordValid ? '': ' es demasiado corto';
            console.log(this.state.formErrors.Password)
            break;
        //   case 'ConfirmacionPassword':
        //     confirmacionpasswordValid = value.length >= 6;
        //     fieldValidationErrors.ConfirmacionPassword = confirmacionpasswordValid ? '': ' es demasiado corto';
        //     break;  
          default:
            break;
                
    
        }
        this.setState(
          {
            formErrors: fieldValidationErrors,
            nombresValid:nombresValid,
            apellidosValid:apellidosValid,
            emailValid: emailValid,
            passwordValid: passwordValid,
          }, 
          this.validateForm
          );
      }
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }
      validateForm() {
        this.setState({formValid: this.state.nombresValid && this.state.apellidosValid && this.state.emailValid && this.state.passwordValid });
      }
      handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => { this.validateField(name, value) });
      }  
    //   componentDidMount(){
    //       const prub = document.querySelectorAll('input');
    //       console.dir(prub[0].onchange)
    //   }
    enviarDatos=()=>{
        console.log(22)
    }
    render(){
        return(
            <form id="msform">
            <ul id="progressbar">
                <li className="active"></li>
                <li></li>
            </ul>
            
            <fieldset>
                <h2 className="fs-title">Datos del Usuario</h2>
                
                <input type="text" name="Nombres" placeholder="Nombres" value={this.state.Nombres} onChange={this.handleUserInput}/>
                <input type="text" name="Apellidos" placeholder="Apellidos" value={this.state.Apellidos} onChange={this.handleUserInput}/>
                <input type="button" name="next" className="next action-button" value="Next" />
            </fieldset>
            <fieldset>
                <h2 className="fs-title">Crear Usuario</h2>
                <input  type="email" name="Email" placeholder="Correo" value={this.state.Email} onChange={this.handleUserInput}/>
                <input className={`${this.errorClass(this.state.formErrors.Password)}`} type="password" name="Password" placeholder="Contraseña" value={this.state.Password} onChange={this.handleUserInput}/>
                <input type="button" name="previous" className="previous action-button" value="Previous" />
                <input type="submit" name="submit" className="submit action-button" value="Submit" onClick={this.enviarDatos}/>
            </fieldset>
        </form> 
        )
    }
}