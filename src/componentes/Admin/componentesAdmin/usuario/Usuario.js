import React from "react";
import './Usuario.css';
import MenuAdmin from "../menuAdmin";
import ListarUsuarios from "./ListarUsuarios";
import CrearUsuario from "./crearUsuario";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

class Usuario extends React.Component{

    constructor(props) {
        super(props)
          this.state = {
            formErrors: {
                nombres:'',
                apellidos:'',
                correo: '',
                password: '',
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

        //--- Para botón Submit ---//
        this.setState({formValid: this.state.nombresValid && this.state.apellidosValid && this.state.correoValid && this.state.passwordValid });

      }
      handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => { this.validateField(name, value) });
      }
      actualizarDatos=(e)=>{

        // (async () => {

        //     const { value: password } = await Swal.fire({
        //       title: 'Enter your password',
        //       input: 'password',
        //       inputLabel: 'Password',
        //       inputPlaceholder: 'Enter your password',
        //       inputAttributes: {
        //         autocapitalize: 'off',
        //         autocorrect: 'off'
        //       }
        //     })

        //     if (password) {
        //       Swal.fire(`Entered password: ${password}`)
        //     }

        //     })()


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

      var datosActualizar={
        "usuario":correo,
        "correo":correo,
        "password":password,
        "nombres":nombres,
        "apellidos":apellidos,
        "id_perfil": id_Cliente,
        "id_Cliente": id_Cliente
      }

      console.log(datosActualizar)
      console.log('http:localhost:3005/VisorCliente_Api/UpdateUsuarios',{datosActualizar});

        let reqOptions = {
          url: "http://localhost:3005/VisorCliente_Api/UpdateUsuarios",
          method: "POST",
          data: datosActualizar,
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

        // Inicio de animación y efecto de despliegue de las opciones de administrador
        const botones = document.querySelectorAll('.boton');
        const contenedores = document.querySelectorAll('.contenedor')

            for (let j = 0; j < botones.length; j++) {
                botones[j].addEventListener('click',()=>{

                const HeightCreacion = contenedores[j].clientHeight === 0

                switch (HeightCreacion) {
                    case true:
                        setTimeout(() => {
                            botones[j].style.borderBottomRightRadius= '0em';
                            botones[j].style.borderBottomLeftRadius= '0em';
                        }, 100);

                        contenedores[j].style.borderTopRightRadius= '0em'
                        contenedores[j].style.borderTopLeftRadius= '0em'
                        contenedores[j].style.borderBottomRightRadius= '0.3em'
                        contenedores[j].style.borderBottomLeftRadius= '0.3em'

                      contenedores[j].animate([
                          {height:'75%'},
                      ],{
                          fill:'forwards',
                          duration: 1400
                      });
                      break;

                    case false:
                            setTimeout(() => {
                                botones[j].style.borderBottomRightRadius= '0.3em';
                                botones[j].style.borderBottomLeftRadius= '0.3em';
                            }, 1400);

                      contenedores[j].animate([
                          {height:'0%'},
                      ],{
                          fill:'forwards',
                          duration: 1400
                      });

                      break;

                    default:
                        break;
                }


                const contenedorConsulta = document.querySelector('.contenedor-consultas')
                const botonConsulta = document.querySelector('.consultar')
                const contenedorCreacion = document.querySelector('.contenedor-creacion')
                const botonCreacion = document.querySelector('.crear')

                if (contenedorCreacion.clientHeight > 0) {
                    setTimeout(() => {
                        botonCreacion.style.borderBottomRightRadius= '0.3em';
                        botonCreacion.style.borderBottomLeftRadius= '0.3em';
                    }, 1400);

                    contenedorCreacion.animate([
                        {height:'0%'},
                    ],{
                        fill:'forwards',
                        duration: 1400
                    });
                }

                if (contenedorConsulta.clientHeight > 0) {
                    console.log(botones[j])
                    setTimeout(() => {
                        botonConsulta.style.borderBottomRightRadius= '0.3em';
                        botonConsulta.style.borderBottomLeftRadius= '0.3em';
                    }, 1400);

                    contenedorConsulta.animate([
                        {height:'0%'},
                    ],{
                        fill:'forwards',
                        duration: 1400
                    });
                }
            })
            }
        // Fin de animación y efecto de despliegue de las opciones de administrador
    }

    render(){
        return(
            <>
            <div className="Contenedorcompleto">
            
                <aside style={{display:"none"} } id="BoxActualizar">
                    <section id="texto_Atualizaciones">
                        <h2>Actualizar Datos de Usuario</h2>

                        <input type="text" name="nombres" placeholder="nombres" value={this.state.nombres} onChange={this.handleUserInput}/>
                        <input type="text" name="apellidos" placeholder="apellidos" value={this.state.apellidos} onChange={this.handleUserInput}/>

                        <input  type="email" name="correo" placeholder="Correo" value={this.state.correo} onChange={this.handleUserInput}/>
                        <input  type="text" name="usuario" placeholder="Usuario" value={this.state.correo} onChange={this.handleUserInput}/>

                        <select name="Ind_Activo" value={"Estado de Usuario"}>
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                        <select name="Ind_Activo" value={"Estado de Usuario"}>
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                        <input type="submit" disabled={!this.state.formValid} name="submit" className="submit action-button" onClick={this.enviarDatos}  value="Submit" />
            
                    </section>
                </aside>
            
             
            <MenuAdmin />
            <section id="pantalla" className="contenedor-opciones">
                <article className="boton crear"></article>

                <aside className="contenedor contenedor-creacion">
                    <CrearUsuario/>
                </aside>

                <article className="boton consultar"></article>

                <aside className="contenedor contenedor-consultas">
                    <ListarUsuarios/>
                </aside>

            </section>
            </div>
            </>

        )
    }

}

export default Usuario;