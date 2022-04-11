import axios from "axios";
import React from "react";
import { $ } from "react-jquery-plugin";
import './listarUsuarios.css'
import Swal from "sweetalert2";
import imagen from "../../landing/favicon/times-solid.svg"

class ListarUsuarios extends React.Component{

    constructor(props) {
        super(props)
          this.state = {
            Usuarios: [],            
    }}

    componentDidMount(){
        // var token=localStorage.getItem('token');
        //  axios.get(process.env.REACT_APP_API_ENDPOINT+'ListarUsuarios',{
        //     //   headers: {
        //     //     'Authorization': `Bearer ${token}`
        //     //   },
        //    })
        //    .then((res) => {
        //      console.log(res.data);  
        //      this.setState({Usuarios: res.data.data});
        //    })
        //    .catch((error) => {
        //      console.error(error)
        //      console.log(error.response.data.message);
        //      console.log(error.response.status);
        //      console.log(error.response.headers); 
        //     //   const Toast = Swal.mixin({
        //     //       toast: true,
        //     //       icon: 'error',
        //     //       title: ''+error.response.data.message+'',
        //     //       confirmButtonText: `Ok`,
        //     //       position: 'top-right',
        //     //       iconColor: 'white',
        //     //       showConfirmButton: true,
        //     //     })                    
        //    })  }

        const MySwal = Swal
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


          //initialize datatable
    $(document).on(function () {
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
    

    render() {
        return (             
            <table id="TableUsuarios" className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th >ID</th>
                        <th id="Usuario">Usuario</th>
                        <th id="Nombres">Nombres</th>
                        <th id="Apellidos">Apellidos</th>
                        <th id="Correo">Correo</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Modificación</th>
                        <th>Nivel</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.Usuarios.map((usuario) => {
                        console.log(usuario)
                        
                        switch (usuario.Ind_Activo) {
                            case true:
                                console.log(232)
                                break;
                            case false:
                                console.log(123)
                                break;
                            default:
                                break;
                        }
                        switch (usuario.Ind_Us_Activo) {
                            case true:
                                console.log(789)
                                break;
                            case false:
                                console.log(987)
                                break;
                            default:
                                break;
                        }

                    return (              
                        <tr>
                            <td style={{width:'5%'}}>{usuario.id_usuario}</td>
                            <td style={{width:'10%'}}>{usuario.usuario}</td>
                            <td style={{width:'15%'}}>{usuario.nombres}</td>
                            <td style={{width:'15%'}}>{usuario.apellidos}</td>
                            <td style={{width:'26%'}} >{usuario.correo}</td>
                            <td title={new Date(usuario.fecha_creacion).toLocaleString()}>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
                            <td>
                                <img src={imagen} title="nombres" alt="imagen"></img>
                                <img src={imagen} title="nombres" alt="imagen"></img>
                                <img src={imagen} title="nombres" alt="imagen"></img>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>           
        )
      }
}
export default ListarUsuarios;