import axios from "axios";
import React from "react";
import { $ } from "react-jquery-plugin";
// import Swal from "sweetalert2";

class ListarUsuarios extends React.Component{

    constructor(props) {
        super(props)
          this.state = {
            Usuarios: [],            
    }}

    componentDidMount(){
        var token=localStorage.getItem('token');
        axios.get(process.env.REACT_APP_API_ENDPOINT+'ListarUsuarios',{
            headers: {
              'Authorization': `Bearer ${token}`
            },
          })
          .then((res) => {
            console.log(res.data.data);  
            this.setState({Usuarios: res.data.data});
          })
          .catch((error) => {
            console.error(error)
            console.log(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers); 
            // const Toast = Swal.mixin({
            //     toast: true,
            //     icon: 'error',
            //     title: ''+error.response.data.message+'',
            //     confirmButtonText: `Ok`,
            //     position: 'top-right',
            //     iconColor: 'white',
            //     showConfirmButton: true,
            //   })                    
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
                  <th>ID</th>
                  <th>Email</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Telefonos</th>
                  <th>País</th>
                  <th>Cliente</th>
                  <th>Nivel</th>
                </tr>
              </thead>
             
              {/* <tbody>
              {this.state.Usuarios.map((usuario) => {
                return (              
                     <tr>
                      <td>{usuario.idUser}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.Nombres}</td>
                      <td>{usuario.Apellidos}</td>
                      <td>{usuario.telefono}</td>
                      <td>{usuario.pais}</td>
                      <td>{usuario.Cliente}</td>
                      <td>{usuario.nivel}</td>
                    </tr>
                  
                )
              })}
              </tbody> */}
            </table>           
        )
      }
}
export default ListarUsuarios;