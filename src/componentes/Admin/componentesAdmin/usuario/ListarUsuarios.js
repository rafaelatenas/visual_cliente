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
        });
        
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
        editarElementos=(e)=>{
          document.getElementById('BoxActualizar').style.display='block'
          document.getElementById('pantalla').style.opacity='.3'

          var editando = false;
          if (editando === false) {
           // var nodoContenedorForm = document.getElementById('contenedorForm'); //Nodo DIV
            var nodosTr = document.getElementsByTagName('tr')
            var herramientas = document.querySelectorAll('.herramientas');
            var tag;
            var algo = document.getElementById('BoxActualizar')
            let nuevoHtml = '';

            for (let i = 1; i < herramientas.length; i++) {
              const padre = herramientas[i].parentNode;
              const idPadre = herramientas[i].parentNode.id;
              const hijo = document.getElementById(idPadre).children;

                if (e.target){
                  tag = e.target.getAttribute("id");
                  if (idPadre === tag) {
                  console.log(hijo[0].textContent)

                  nuevoHtml += 
                       ` 
                       <input type="text" name="nombres" placeholder="nombres" value=${hijo[1].textContent} onChange={this.handleUserInput} />
                       <input type="text" name="apellidos" placeholder="apellidos" value=${hijo[2].textContent} onChange={this.handleUserInput} />
                       <input type="email" name="correo" placeholder="Correo" value=${hijo[3].textContent} onChange={this.handleUserInput} />
                       <input type="text" name="usuario" placeholder="Usuario" value=${hijo[4].textContent} onChange={this.handleUserInput} />
                       <select name="Ind_Activo" value={"Estado de Usuario"}>
                         <option >Activo</option>
                         <option>Inactivo</option>
                       </select>
                       `
                 algo.innerHTML= nuevoHtml
                  }
                }
            }
            
          }
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
                                    <tr id={usuario.id_usuario}>
                                        <td className="id">{usuario.id_usuario}</td>
                                        <td className="usuarios" title={usuario.usuario}>{usuario.usuario}</td>
                                        <td className="nombres">{usuario.nombres}</td>
                                        <td className="apellidos">{usuario.apellidos}</td>
                                        <td className="correos" title={usuario.correo}>{usuario.correo}</td>
                                        <td className="fechas" title={new Date(usuario.fecha_creacion).toLocaleString()}>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
                                        <td id="indicador" className="Ind_Activo">
                                          {this.state.Usuarios.map((usuario) => {
                                            if (usuario.Ind_Activo === true) {
                                              return(
                                                <img src={editar}></img>
                                              )
                                            }else{
                                              return(
                                                <img src={historial}></img>
                                              )
                                            }
                                          })}
                                        </td>
                                        <td id="check-2" className="Ind-US-Activo ">
                                          {this.state.Usuarios.map((usuario) => {
                                            if (usuario.Ind_Us_Activo === true) {
                                              return(
                                                <img src={editar}></img>
                                              )
                                            }else{
                                              return(
                                                <img src={historial}></img>
                                              )
                                            }
                                          })}
                                        </td>
                                        <td className="herramientas">
                                          <div id={usuario.id_usuario} className="contenedor-herramientas">
                                            <button className="editar"  onClick={this.editarElementos}>
                                              <img src={historial} title="nombres" alt="imagen"></img>
                                            </button>

                                            <button onClick={this.editarElementos}>
                                              <img id={usuario.id_usuario} src={editar} alt="imagen"></img>
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