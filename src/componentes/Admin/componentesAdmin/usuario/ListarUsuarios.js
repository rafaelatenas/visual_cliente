import axios from "axios";
import React from "react";
import './listarUsuarios.css'
import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import withReactContent from 'sweetalert2-react-content'
import editar from "../../../../landing/favicon/editar-user.svg"
import historial from "../../../../landing/favicon/historial.svg"
import check from "../../../../landing/favicon/check-solid.svg"
import eliminar from "../../../../landing/favicon/eliminar-user.svg"
import ReactDOM from 'react-dom';
import { $ } from "react-jquery-plugin";

class ListarUsuarios extends React.Component{

    constructor(props) {
        super(props)            
          this.state = {
            Usuarios: [],
            formErrors: {
                nombres:'',
                apellidos:'',
                correo: '',
                Ind_Activo: '',
                Ind_Us_Activo:'',
            },
                nombresValid: false,
                apellidosValid: false,
                correoValid: false,
                id_usuarioValid: false,
                nivelValid: false,
                clienteValid: false,
                formValid: false,
                nombres:'',
                apellidos:'',
                correo:'',
                usuario:'',
                id_Cliente:'',
                Ind_Activo: '',
                Ind_Us_Activo:'',
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
        
        var token=localStorage.getItem('token');
        axios.get(process.env.REACT_APP_API_ENDPOINT+'ListarUsuarios',{
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
          .then(res => {
            this.setState({ Usuarios: res.data.data });
            resultado(res.data.data)
            console.log(res.data.data)
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
        const resultado = data => {
          const Ind_US_Activo =  document.querySelectorAll('.Ind-US-Activo ')
          for (let w = 0; w < (Ind_US_Activo.length -1); w++) {
            const elementoHTML = Ind_US_Activo[w+1];
            var ActivoUS = data[w].Ind_Us_Activo;
            let Activo = '';
            if (ActivoUS === true) {
              Activo +=`           
                <img src=${check} class="boton" alt="Usuario Activo"></img>
              ` 
              elementoHTML.innerHTML = Activo;

            } else {
              Activo +=`           
                <img src=${eliminar} class="boton" alt="Usuario Activo"></img>
              ` 
              elementoHTML.innerHTML = Activo;
            }
          }
          
          const Ind_Activo =  document.querySelectorAll('.Ind_Activo')
          for (let w = 0; w < (Ind_Activo.length -1); w++) {
            const elementoHTML = Ind_Activo[w+1];
            var ActivoIND = data[w].Ind_Activo;
            let Activo = '';
            if (ActivoIND === true) {
              Activo +=`           
                <img src=${check} class="boton" alt="Usuario Activo"></img>
              ` 
              elementoHTML.innerHTML = Activo;

            } else {
              Activo +=`           
                <img src=${eliminar} class="boton" alt="Usuario Activo"></img>
              ` 
              elementoHTML.innerHTML = Activo;
            }
          }
        }
        $(document).ready(function () {
          setTimeout(function(){
          $('#TableUsuarios').DataTable(
              {
                  "order": [[ 0, "asc" ]],
                  "lengthMenu": [
                      [10, 25, 50, 100, -1],
                      [10, 25, 50, 100, "All"]
                  ],
                  "language": {
                      "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                  },
                  "bDestroy": true,                        
                  "autoWidth": true,
                  "responsive": true,
                  "dom": '<"top"lBf>rt<"bottom"ip>',
                  "buttons": ['excelHtml5','csvHtml5','print'],
              }
          );
           } ,1000);
      });
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
      this.setState({formValid: this.state.nombresValid && this.state.apellidosValid && this.state.correoValid });
    }
    
    handleUserInput = (e) => {
      const name = 'nombres';
      var value = e.target.value;
      console.log(value)
      
      this.setState({[name]: value},() => { this.validateField(name, value)});
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
      const {correo,nombres,apellidos,id_Cliente}=this.state;
      
      var datosEnviar={
        "usuario":correo,
        "correo":correo,
        "nombres":nombres,
        "apellidos":apellidos,
        "id_perfil": id_Cliente,
        "id_Cliente": id_Cliente
      }

      console.log(datosEnviar)       
      console.log('http:localhost:3005/VisorCliente_Api/UpdateUsuarios',{datosEnviar});
    
        let reqOptions = {
          url: "http://localhost:3005/VisorCliente_Api/UpdateUsuarios",
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
   
        
    editarElementos=(e)=>{ 

      document.getElementById('BoxActualizar').style.display = 'block';
      document.getElementById('pantalla').style.opacity = '.3';
  
      
      // var editando = false;
      // if (editando === false) {
      //   var herramientas = document.querySelectorAll('.herramientas');
      //   var tag;
  
  
      //   for (let i = 1; i < herramientas.length; i++) {
      //     const idPadre = herramientas[i].parentNode.id;
      //     const hijo = document.getElementById(idPadre).children;
      //     if (e.target) {
      //       tag = e.target.getAttribute("id");
      //       if (idPadre === tag) {
              
      //          const section = React.createElement('section', { id: 'texto_Actualizaciones' }, [
      //            React.createElement('h2', {}, 'Actualizar Datos de Usuario'),
                
      //              React.createElement('input', { type: 'text', name: 'id', placeholder: 'Id Usuario', defaultValue:parseInt(hijo[0].textContent)}),

      //              React.createElement('input', { type: 'text',id:'nombre' , name: 'nombres', placeholder: 'Nombres', value:this.state.nombres, onChange:(this.handleUserInput)}),

      //              React.createElement('input', { type: 'text', name: 'apellidos', placeholder: 'Apellidos', value:(hijo[3].textContent), onChange:(this.handleUserInput)}),
      //              React.createElement('input', { type: 'email', name: 'correo', placeholder: 'Correo', value:(hijo[4].textContent), onChange:(this.handleUserInput)}),
      //              React.createElement('input', { type: 'text', name: 'usuario', placeholder: 'Usuario', value:(hijo[4].textContent), onChange:(this.handleUserInput)}),
      //              React.createElement('input', { type: 'submit', name:'submit', disabled:(!this.validateForm), onClick:this.enviarDatos}),
      //          ]);
              
      //         ReactDOM.render(
      //           section,
      //           document.getElementById('BoxActualizar')
      //         );
                
              
      //       }
              
  
            
      //     }
      //   }
  
      // }
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
                                
                                return (
                                    <tr id={usuario.id_usuario}>
                                        <td className="id">{usuario.id_usuario}</td>
                                        <td className="usuarios" title={usuario.usuario}>{usuario.usuario}</td>
                                        <td className="nombres">{usuario.nombres}</td>
                                        <td className="apellidos">{usuario.apellidos}</td>
                                        <td className="correos" title={usuario.correo}>{usuario.correo}</td>
                                        <td className="fechas" title={new Date(usuario.fecha_creacion).toLocaleString()}>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
                                        <td id="indicador" className="Ind_Activo">
                                        </td>
                                        <td id="check-2" className="Ind-US-Activo ">
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


