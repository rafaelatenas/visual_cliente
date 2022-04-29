import React, {useEffect, useState} from 'react';
//import './App.css';
import axios from 'axios';

import { makeStyles } from '@mui/styles';

import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ReactDOM from 'react-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '35%',
    height: '60%',
    padding:'2%',
    border: '1.3px solid #000',
    background: '#ffefd5',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '95%'
  }
}));

function ListarUsuarios() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    nombre: '',
    empresa:'',
    lanzamiento: '',
    unidades_vendidas: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  var token=localStorage.getItem('token');

  const peticionGet=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarUsuarios',{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response=>{
      setData(response.data.data);
      console.log(response.data.data)
    })
  }

   const peticionPost=async()=>{
     await axios.get(process.env.REACT_APP_API_ENDPOINT+'ListarUsuarios',{
       headers: {
         'Authorization': `Bearer ${token}`
       },
     })
     .then(response=>{
       setData(data.concat(response.data))
       abrirCerrarModalInsertar()
     })
   }

  // const peticionPut=async()=>{
  //   await axios.put(baseUrl+consolaSeleccionada.id, consolaSeleccionada)
  //   .then(response=>{
  //     var dataNueva=data;
  //     dataNueva.map(consola=>{
  //       if(consolaSeleccionada.id===consola.id){
  //         consola.nombre=consolaSeleccionada.nombre;
  //         consola.lanzamiento=consolaSeleccionada.lanzamiento;
  //         consola.empresa=consolaSeleccionada.empresa;
  //         consola.unidades_vendidas=consolaSeleccionada.unidades_vendidas;
  //       }
  //     })
  //     setData(dataNueva);
  //     abrirCerrarModalEditar();
  //   })
  // }

  // const peticionDelete=async()=>{
  //   await axios.delete(baseUrl+consolaSeleccionada.id)
  //   .then(response=>{
  //     setData(data.filter(consola=>consola.id!==consolaSeleccionada.id));
  //     abrirCerrarModalEliminar();
  //   })
  // }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  // const downloadExcel=()=>{
  //   const newData = studentData.map(row =>{
  //      delete row.tableData
  //     return row
  //   })
  //   const worksheet=XLSX.utils.json_to_sheet(newData)
  //   const workBook=XLSX.utils.book_new()
  //   XLSX.utils.book_append_sheet(workBook, worksheet,"DataUsuarios")
  //   //Buffer
  //   let buf=XLSX.write(workBook, {bookType:"xlsx" , type:"buffer"})
  //   //Binary string
  //   XLSX.write(workBook,{bookType:"xlsx", type: "binary"})
  //   //Download
  //   XLSX.writeFile(workBook, "StudentsData.xlsx")
  // }
  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <ul id="progressbar">
        <li className="active"></li>
        <li></li>
      </ul>

      <h3>Agregar Nueva Consola</h3>
      
      <fieldset>
        <TextField type='text' name="nombres" className={styles.inputMaterial} label="Nombres" onChange={handleChange}/>
        <br />
        <TextField type='text' name="apellidos" className={styles.inputMaterial} label="Apellidos" onChange={handleChange}/>
        <br />
        <TextField type='number' name="idUsuario" className={styles.inputMaterial} label="Id Usuario" onChange={handleChange}/>
        <br />
        <TextField type='email' name="correo" className={styles.inputMaterial} label="Correo Electrónico" onChange={handleChange}/>
        <br />

        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <div align="right">
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
      </fieldset>

      <fieldset>
        <TextField type='email' name="usuario" className={styles.inputMaterial} label="Usuario" onChange={handleChange}/>
        <br />
        <TextField type='password' name="contraseña" className={styles.inputMaterial} label="Contraseña" onChange={handleChange}/>
        <br />
        <TextField name="lanzamiento" className={styles.inputMaterial} label="Lanzamiento" onChange={handleChange}/>
        <br />
        <TextField name="idPerfil" className={styles.inputMaterial} label="Id Perfil" onChange={handleChange}/>
        <br /><br />
        
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <div align="right">
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </fieldset>
    </div>
  );
 

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Consola</h3>
      <div className='agruparEdit'>
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.id_usuario}/>
        <br />
        <TextField name="empresa" className={styles.inputMaterial} label="Empresa" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.usuario}/>
        <br />
        <TextField name="lanzamiento" className={styles.inputMaterial} label="Lanzamiento" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombres}/>
        <br />
        <TextField name="unidades_vendidas" className={styles.inputMaterial} label="Unidades Vendidas" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellidos}/>
        <br /><br />
      </div>
      <div align="right">
        {/* <Button color="primary" onClick={()=>peticionPut()}>Editar</Button> */}
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la consola <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ? </p>
      <div align="right">
        {/* <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button> */}
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
     <TableContainer style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Nombre</TableCell>
             <TableCell>Empresa</TableCell>
             <TableCell>Año de Lanzamiento</TableCell>
             <TableCell>Unidades Vendidas (millones)</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(consola=>(
             <TableRow key={consola.id_usuario}>
               <TableCell>{consola.id_usuario}</TableCell>
               <TableCell>{consola.usuario}</TableCell>
               {/* <TableCell>{consola.nombres}</TableCell>
               <TableCell>{consola.apellidos}</TableCell>
               <TableCell>{consola.correo}</TableCell> */}
               <TableCell>
                    <ModeEditIcon className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Editar')} />
        
                 {/* <Edit className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Editar')}/> */}
                 &nbsp;&nbsp;&nbsp;
                 {/* <Delete  className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Eliminar')}/> */}
                 </TableCell> 
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  );
}

export default ListarUsuarios;

// class ListarUsuarios extends React.Component{

//   constructor(props) {
//     super(props)            
//       this.state = {
//         Usuarios:[],
//         idUsuario:'',
//         Nombres:[]
//       }
//     }


    


//   componentDidMount() {
//         //Listar Usuario//
//         const MySwal = withReactContent(Swal)
//         const toast = MySwal.mixin({
//         toast: true,
//         position: 'top=end',
//         showConfirmButton: false,
//         timer: 10000,
//         timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.addEventListener('mouseenter', Swal.stopTimer)
//             toast.addEventListener('mouseleave', Swal.resumeTimer)
//           }
//         });
        
//         var token=localStorage.getItem('token');
//         axios.get(process.env.REACT_APP_API_ENDPOINT+'ListarUsuarios',{
//           headers: {
//             'Authorization': `Bearer ${token}`
//           },
//         })
//           .then(res => {
//             this.setState({ Usuarios: res.data.data });
//             resultado(res.data.data)
//           })

//           .catch((error) => {
//                 console.error(error)
//                 console.log(error.response.data.message);
//                 console.log(error.response.status);
//                 console.log(error.response.headers);
//                 toast.fire({
//                 icon: 'error',
//                 title: ''+error.response.data.message+'',
//                 confirmButtonText: `Ok`,
//                 })
//           })
//         document.getElementById('pantalla').addEventListener('click',()=>{
//           document.getElementById('BoxActualizar').style.display='none'
//           document.getElementById('pantalla').style.opacity='1'
//         });
//         const resultado = data => {
//           const elementoHTML = document.getElementById('boton');

//           for (const iterator of data) {
//             console.log(iterator)
//             ActivoUS =  iterator.Ind_Us_Activo
//             let Activo = '';
//             switch (ActivoUS) {
//               case true:
//                 Activo +=`           
//                 <img src=${check} class="boton" alt="Usuario Activo"></img>
//               ` 
//               elementoHTML.innerHTML = Activo;
//                 break;
//                 case false:
//                   Activo +=`           
//                   <img src=${check} class="boton" alt="Usuario Activo"></img>
//                 ` 
//                 elementoHTML.innerHTML = Activo;
//                   break;
//               default:
//                 break;
//             }
            
//           }
//           const Ind_US_Activo =  document.querySelectorAll('.Ind-US-Activo ')
//           for (let w = 0; w < (Ind_US_Activo.length -1); w++) {
//             const elementoHTML = Ind_US_Activo[w+1];
//             var ActivoUS = data[w].Ind_Us_Activo;
//             let Activo = '';
//             if (ActivoUS === true) {
//               Activo +=`           
//                 <img src=${check} class="boton" alt="Usuario Activo"></img>
//               ` 
//               elementoHTML.innerHTML = Activo;

//             } else {
//               Activo +=`           
//                 <img src=${eliminar} class="boton" alt="Usuario Activo"></img>
//               ` 
//               elementoHTML.innerHTML = Activo;
//             }
//           }
          
//           const Ind_Activo =  document.querySelectorAll('.Ind_Activo')
//           for (let w = 0; w < (Ind_Activo.length -1); w++) {
//             const elementoHTML = Ind_Activo[w+1];
//             var ActivoIND = data[w].Ind_Activo;
//             let Activo = '';
//             if (ActivoIND === true) {
//               Activo +=`           
//                 <img src=${check} class="boton" alt="Usuario Activo"></img>
//               ` 
//               elementoHTML.innerHTML = Activo;

//             } else {
//               Activo +=`           
//                 <img src=${eliminar} class="boton" alt="Usuario Activo"></img>
//               ` 
//               elementoHTML.innerHTML = Activo;
//             }
//           }
//         }
//         $(document).on(function () {
//           setTimeout(function(){
//           $('#TableUsuarios').DataTable(
//               {
//                   "order": [[ 0, "asc" ]],
//                   "lengthMenu": [
//                       [10, 25, 50, 100, -1],
//                       [10, 25, 50, 100, "All"]
//                   ],
//                   "language": {
//                       "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
//                   },
                  
//                   "bDestroy": true,                        
//                   "autoWidth": true,
//                   "responsive": true,
//                   "dom": '<"top"lBf>rt<"bottom"ip>',
//                   "buttons": ['excelHtml5','csvHtml5','print'],
//               }
//           );
//            } ,1000);
//       });



     
//   }

  
//   validateField(fieldName, value) {
//       let fieldValidationErrors = this.state.formErrors;
//       let nombresValid= this.state.nombresValid;
//       let apellidosValid= this.state.apellidosValid;
//       let correoValid = this.state.correoValid;
//       let passwordValid = this.state.passwordValid;
//       //let id_usuarioValid = this.state.id_usuarioValid;

//      const MySwal = withReactContent(Swal)
//      const toast = MySwal.mixin({
//        toast: true,
//        position: 'top-end',
//        showConfirmButton: false,
//        timer: 10000,
//        timerProgressBar: true,
//        didOpen: (toast) => {
//            toast.addEventListener('mouseenter', Swal.stopTimer)
//            toast.addEventListener('mouseleave', Swal.resumeTimer)
//         }
//      });  

//      switch(fieldName) {

//           case 'nombres':
//             nombresValid = value.length >= 6;
//             fieldValidationErrors.Nombres = nombresValid ? '' : ' es demasiado corto';
            
//             break;
//             case 'apellidos':
//                 apellidosValid = value.length >= 6;
//                 fieldValidationErrors.Apellidos = apellidosValid ? '' : ' es demasiado corto';
//             break;  
//           case 'correo':
//             correoValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
//             fieldValidationErrors.correo = correoValid ? '' : ' es invalido';
//             toast.fire({
//               icon: 'error',
//               title: ''+fieldValidationErrors.correo+'',
//               confirmButtonText: `Ok`,
//             })
//             break;
//           case 'password':
//             passwordValid = value.length >= 6;
//             fieldValidationErrors.Password = passwordValid ? '': ' es demasiado corto';
//             break;
//         //   case 'Confirmacionpassword':
//         //     confirmacionpasswordValid = value.length >= 6;
//         //     fieldValidationErrors.Confirmacionpassword = confirmacionpasswordValid ? '': ' es demasiado corto';
//         //     break;  
//           default:
//             break;

//       }

//       this.setState(
//         {
//           formErrors: fieldValidationErrors,
//           nombresValid:nombresValid,
//           apellidosValid:apellidosValid,
//           correoValid: correoValid,
//           passwordValid: passwordValid,
//         }, 
//         this.validateForm
//         );
//   }

//   errorClass(error) {
//       return(error.length === 0 ? '' : 'has-error');
//   }

//   validateForm() {
//       //--- Para botón Next ---//
//       this.setState({formValidNext: this.state.nombresValid && this.state.apellidosValid});

//       //--- Para botón Submit ---//
//       this.setState({formValid: this.state.nombresValid && this.state.apellidosValid && this.state.correoValid && this.state.passwordValid });

//   }
     
//   handleUserInput = (e) => {
//       const name = e.target.name;
//       const value = e.target.value;
//       this.setState({[name]: value});
//       console.log(value)
//   }  
//   editEmployee(id){

//       document.getElementById('BoxActualizar').style.display = 'block';
//       document.getElementById('pantalla').style.opacity = '.3';

//       console.log(id);
//       var token=localStorage.getItem('token');
//       axios.get(process.env.REACT_APP_API_ENDPOINT+"ListarUsuariosId/"+id+"",{
//         headers: {
//           'Authorization': `Bearer ${token}`
//           },
//         }).then(result => {
          

//           this.setState({ Nombres: result.data.data[0].nombres});
//        console.log(this.state.Nombres)

//        const elementoHTML = (
//         <input name="Nombres" id="Nombres" value={this.state.Nombres} onChange={this.handleUserInput} placeholder="Nombres"></input>
//         )
         
//         ReactDOM.render(
//           elementoHTML,
//           document.getElementById('BoxActualizar')
//         );

//       }).catch(err => {
//         if (err.response) {
//           console.log(err.response.data.message);
//           console.log(err.response.status);
//           console.log(err.response.headers);        
//         }
//       })
//       console.log(this.state.Nombres)
      
//   };
  
//   columns = [
    
//     {
//       name: 'ID',
//       selector: row => row.id_usuario,
//       sortable: true,
      
//     },
//     { 
//       name: 'Usuario',
//       selector: row => row.usuario,
//       sortable: true,
//       grow: 2,
//     },
//     {
//       name: 'Nombres',
//       selector: row => row.nombres,
//       sortable: true,
//       grow: 2,
//     },
//     { 
//       name: 'Apellidos',
//       selector: row => row.apellidos,
//       sortable: true,
//       grow: 2,
//     },
//     {
//       name: 'Correo',
//       selector: row => row.correo,
//       sortable: true,
//       grow: 2,
//     },
//     {
//       name: 'Creacion',
//       selector: row => new Date(row.fecha_creacion).toLocaleDateString(),
//       sortable: true,
//       //grow: 2,
      
//     },
//     {
      
//       cell: () => 
           
//       <button id="boton"></button>,
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//     {
      

//       cell: () => 
//       <div id="imgContenedor"></div>,      
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ]
  
//    MyComponent = () => (
//     <DataTable
//       columns={this.columns}
//     />
//   );   
       
//     render() {
      
//       return (
//           <>
//             <h1>Actualizar Datos de Usuario</h1>
//               <DataTable 
//                 columns={this.columns}
//                 data={this.state.Usuarios}
//                 fixedHeader
//                 fixedHeaderScrollHeight="300px"
//                 highlightOnHover
//                 pagination
//                 responsive
//                 subHeader
//                 subHeaderAlign="right"
//                 subHeaderWrap
//             />
//         </>
//       )
//     }
// }
// export default ListarUsuarios;


