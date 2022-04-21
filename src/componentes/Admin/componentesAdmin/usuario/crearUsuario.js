import React from "react";
import { $ } from "react-jquery-plugin";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from 'sweetalert2-react-content';



export default class crearUsuario extends React.Component{
    //Validación de Formulario

      constructor (props) {
          super(props);
          this.state = { 
              formErrors: {
                  nombres:'',
                  apellidos:'',
                  correo: '',
                  password: '',
                  Confirmacionpassword:'',
              },
              nombresValid: false,
              apellidosValid: false,
              correoValid: false,
              passwordValid: false,
              id_usuarioValid: false,
              nivelValid: false,
              clienteValid: false,
              formValid: false,
              nombres:'',
              apellidos:'',
              correo:'',
              password:'',
              usuario:'',
              id_Cliente:''

          }    
      } 
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nombresValid= this.state.nombresValid;
        let apellidosValid= this.state.apellidosValid;
        let correoValid = this.state.correoValid;
        let passwordValid = this.state.passwordValid;
        //let id_usuarioValid = this.state.id_usuarioValid;

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

            case 'nombres':
              nombresValid = value.length >= 6;
              fieldValidationErrors.nombres = nombresValid ? '' : ' es demasiado corto';
              
              break;
              case 'apellidos':
                  apellidosValid = value.length >= 6;
                  fieldValidationErrors.apellidos = apellidosValid ? '' : ' es demasiado corto';
              break;  
            case 'correo':
              correoValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              fieldValidationErrors.correo = correoValid ? '' : ' es invalido';
              toast.fire({
                icon: 'error',
                title: ''+fieldValidationErrors.correo+'',
                confirmButtonText: `Ok`,
              })
              break;
            case 'password':
              passwordValid = value.length >= 6;
              fieldValidationErrors.password = passwordValid ? '': ' es demasiado corto';
              break;
          //   case 'Confirmacionpassword':
          //     confirmacionpasswordValid = value.length >= 6;
          //     fieldValidationErrors.Confirmacionpassword = confirmacionpasswordValid ? '': ' es demasiado corto';
          //     break;  
            default:
              break;

        }

        this.setState(
          {
            formErrors: fieldValidationErrors,
            nombresValid:nombresValid,
            apellidosValid:apellidosValid,
            correoValid: correoValid,
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
        this.setState({formValid: this.state.nombresValid && this.state.apellidosValid && this.state.correoValid && this.state.passwordValid });

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
        const {correo,password,nombres,apellidos,id_Cliente}=this.state;
        
        var datosEnviar={
          "usuario":correo,
          "correo":correo,
          "password":password,
          "nombres":nombres,
          "apellidos":apellidos,
          "id_perfil": id_Cliente,
          "id_Cliente": id_Cliente
        }

        console.log(datosEnviar)       
        console.log('http:localhost:3005/VisorCliente_Api/NuevoUsuarios',{datosEnviar});
      
          let reqOptions = {
            url: "http://localhost:3005/VisorCliente_Api/NuevoUsuarios",
            method: "POST",
            data: datosEnviar,
          }

          axios.request(reqOptions)
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
                
                <input type="text" name="nombres" placeholder="nombres" value={this.state.nombres} onChange={this.handleUserInput}/>
                <input type="text" name="apellidos" placeholder="apellidos" value={this.state.apellidos} onChange={this.handleUserInput}/>
                <input type="number" name="id_Cliente" placeholder="Id Usuario" value={this.state.id_Cliente} onChange={this.handleUserInput}/>

                <input type="button" name="next" disabled={!this.state.formValidNext} className="next action-button" value="Next" />
            </fieldset>
            <fieldset>
                <h2 className="fs-title">Crear Usuario</h2>
                <input  type="email" name="correo" placeholder="Correo" value={this.state.correo} onChange={this.handleUserInput}/>
                <input  type="text" name="usuario" placeholder="Usuario" value={this.state.correo} onChange={this.handleUserInput}/>

                <input className={`${this.errorClass(this.state.formErrors.password)}`} type="password" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleUserInput}/>
                <input type="button" name="previous" className="previous action-button" value="Previous" />
                <input type="submit" disabled={!this.state.formValid} name="submit" className="submit action-button" onClick={this.enviarDatos}  value="Submit" />
            </fieldset>
        </form> 
        )
    }
}
