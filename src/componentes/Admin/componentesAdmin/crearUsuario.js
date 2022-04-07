import React from "react";
import { $ } from "react-jquery-plugin";
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

            case 'Nombres':
              nombresValid = value.length >= 6;
              fieldValidationErrors.Nombres = nombresValid ? '' : ' es demasiado corto';
              
              break;
              case 'Apellidos':
                  apellidosValid = value.length >= 6;
                  fieldValidationErrors.Apellidos = apellidosValid ? '' : ' es demasiado corto';
              break;  
            case 'Email':
              emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              fieldValidationErrors.Email = emailValid ? '' : ' es invalido';
              toast.fire({
                icon: 'error',
                title: ''+fieldValidationErrors.Email+'',
                confirmButtonText: `Ok`,
              })
              break;
            case 'Password':
              passwordValid = value.length >= 6;
              fieldValidationErrors.Password = passwordValid ? '': ' es demasiado corto';
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
        //--- Para botón Next ---//
        this.setState({formValidNext: this.state.nombresValid && this.state.apellidosValid});

        //--- Para botón Submit ---//
        this.setState({formValid: this.state.nombresValid && this.state.apellidosValid && this.state.emailValid && this.state.passwordValid });

      }
      handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => { this.validateField(name, value) });
      }  
       
    enviarDatos=(e)=>{
      console.log("Fomulario Enviado....");
  }
 

componentDidMount(){

   // Inicio de animación del formulario
   var current_fs, next_fs, previous_fs;
   var left, opacity, scale;
   var animating;

   $(".next").on('click',(function(){
       if(animating) return false;
       animating = true;

       current_fs = $(this).parent();
       next_fs = $(this).parent().next();

       $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

       next_fs.show();
       current_fs.animate({opacity: 0}, {
           step: function(now, mx) {

               scale = 1 - (1 - now) * 0.2;

               left = (now * 50)+"%";
               opacity = 1 - now;
               current_fs.css({
           'transform': 'scale('+scale+')',
           'position': 'absolute',
           'top': '15%'
       });
               next_fs.css({'left': left, 'opacity': opacity});
           },
           duration: 800,
           complete: function(){
               current_fs.hide();
               animating = false;
           },
           easing: 'easeInOutBack'
       });
   }));

   $(".previous").on('click',(function(){
       if(animating) return false;
       animating = true;

       current_fs = $(this).parent();
       previous_fs = $(this).parent().prev();

       $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

       previous_fs.show();
       current_fs.animate({opacity: 0}, {
           step: function(now, mx) {
               scale = 0.8 + (1 - now) * 0.2;
               left = ((1-now) * 50)+"%";
               opacity = 1 - now;
               current_fs.css({'left': left});
               previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
           },
           duration: 800,
           complete: function(){
               current_fs.hide();
               animating = false;
           },
           //this comes from the custom easing plugin
           easing: 'easeInOutBack'
       });
       $(".submit").on('click',(function(){
             alert(2322)
         }))
   }));

   

   // Fin de la animación del formulario

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
                <input type="button" name="next" disabled={!this.state.formValidNext} className="next action-button" value="Next" />
            </fieldset>
            <fieldset>
                <h2 className="fs-title">Crear Usuario</h2>
                <input  type="email" name="Email" placeholder="Correo" value={this.state.Email} onChange={this.handleUserInput}/>
                <input className={`${this.errorClass(this.state.formErrors.Password)}`} type="password" name="Password" placeholder="Contraseña" value={this.state.Password} onChange={this.handleUserInput}/>
                <input type="button" name="previous" className="previous action-button" value="Previous" />
                <input type="submit" disabled={!this.state.formValid} name="submit" className="submit action-button" onClick={this.enviarDatos}  value="Submit" />
            </fieldset>
        </form> 
        )
    }
}

