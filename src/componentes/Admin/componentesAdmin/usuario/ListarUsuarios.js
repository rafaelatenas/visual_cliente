import axios from "axios";
import React from "react";
import './listarUsuarios.css'
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import editar from "../../../../landing/favicon/editar-user.svg"
import historial from "../../../../landing/favicon/historial.svg"
import check from "../../../../landing/favicon/check-solid.svg"
import eliminar from "../../../../landing/favicon/eliminar-user.svg"


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
        axios.get('http://localhost:3005/VisorCliente_Api/ListarUsuarios')
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
        
    }
        
        editarElementos=(e)=>{
          document.getElementById('BoxActualizar').style.display='block'
          document.getElementById('pantalla').style.opacity='.3'

          var editando = false;
          if (editando === false) {
            var herramientas = document.querySelectorAll('.herramientas');
            var tag;
            var contenedorActualizar = document.getElementById('BoxActualizar')
           

            for (let i = 1; i < herramientas.length; i++) {
              const idPadre = herramientas[i].parentNode.id;
              const hijo = document.getElementById(idPadre).children;

                if (e.target){
                  tag = e.target.getAttribute("id");
                  if (idPadre === tag) {
                  
                   
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