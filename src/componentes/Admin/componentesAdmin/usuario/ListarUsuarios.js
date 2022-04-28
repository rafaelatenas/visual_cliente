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
        Usuarios:[],
        num:''
      }
    }

    editEmployee(id){
      console.log(id);
      var token=localStorage.getItem('token');
      axios.get(process.env.REACT_APP_API_ENDPOINT+"ListarUsuariosId/"+id+"",{
        headers: {
          'Authorization': `Bearer ${token}`
          },
        }).then(result => {
         console.log(result.data.data);        
        console.log(result.data.data[0].id_usuario);        
        //console.log(result.data.usuario);        
      }).catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
          console.log(err.response.status);
          console.log(err.response.headers);        
        }
      })
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

  
    editarElementos(id) {
      console.log(id);
      var token=localStorage.getItem('token');
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
                                          <button onClick={ () => this.editEmployee(usuario.id_usuario)} className="btn btn-info">Update </button>
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


