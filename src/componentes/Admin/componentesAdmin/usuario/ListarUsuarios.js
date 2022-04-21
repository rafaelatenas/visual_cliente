import axios from "axios";
import React from "react";
import './listarUsuarios.css'
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

import editar from "../../../../landing/favicon/editar-user.svg"
import historial from "../../../../landing/favicon/historial.svg"

class ListarUsuarios extends React.Component{

    constructor(props) {
        super(props)
          this.state = {
            Usuarios: [],
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


    componentDidMount() {
        //Listar Usuario//
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
        axios.get('http://localhost:3005/VisorCliente_Api/ListarUsuarios')
            .then(res => {
                this.setState({ Usuarios: res.data.data });

            })
            .catch((error) => {
                console.error(error)
                console.log(error.response.data.message);
                console.log(error.response.status);
                console.log(error.response.headers);
                toast.fire({
                icon: 'error',
                title: ''+error.response.data.message+'',
                confirmButtonText: `Ok`,
                })
            })
              document.getElementById('pantalla').addEventListener('click',()=>{
                  document.getElementById('BoxActualizar').style.display='none'
                  document.getElementById('pantalla').style.opacity='1'
              })
    }

        //Editar Usuario//

    

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
        prueba=(e)=>{
           document.getElementById('BoxActualizar').style.display='block'
           document.getElementById('pantalla').style.opacity='.3'
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

    render() {

        return (
            <>

                <table id="TableUsuarios" className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th className="id">ID</th>
                                <th className="usuarios">Usuario</th>
                                <th className="nombres">Nombres</th>
                                <th className="apellidos">Apellidos</th>
                                <th className="correos">Correo</th>
                                <th className="fechas">Creación</th>
                                <th className="Ind_Activo">Activo</th>
                                <th className="Ind-US-Activo">Usuario Activo</th>
                                <th className="herramientas">Herramientas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Usuarios.map((usuario) => {
                                console.log(usuario);

                                return (
                                    <tr>
                                        <td className="id">{usuario.id_usuario}</td>
                                        <td className="usuarios" title={usuario.usuario}>{usuario.usuario}</td>
                                        <td className="nombres">{usuario.nombres}</td>
                                        <td className="apellidos">{usuario.apellidos}</td>
                                        <td className="correos" title={usuario.correo}>{usuario.correo}</td>
                                        <td className="fechas" title={new Date(usuario.fecha_creacion).toLocaleString()}>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
                                        <td className="Ind_Activo">
                                            <button></button>
                                        </td>
                                        <td id="check-2" className="Ind-US-Activo ">

                                        </td>
                                        <td className="herramientas">
                                            <div className="contenedor-herramientas">
                                                <button>
                                                    <img src={historial} title="nombres" alt="imagen"></img>
                                                </button>

                                                <button onClick={this.prueba}>
                                                    <img src={editar} title="nombres" alt="imagen"></img>
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                </table>
            </>
        )
      }
}
export default ListarUsuarios;