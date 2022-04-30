import React, {useEffect, useState} from 'react';
//import './App.css';
import axios from 'axios';
import './listarUsuarios.css'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import { Edit , Delete, Check, Close} from '@material-ui/icons';
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
    apellidos:'',
    correo: '',
    usuario: '',
    id_usuario:'',

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
        <TextField name="id_usuario" className={styles.inputMaterial} label="ID Usuario" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.id_usuario}/>
        <br />
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombre}/>
        <br />
        <TextField name="apellidos" className={styles.inputMaterial} label="Apellidos" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellidos}/>
        <br />
        <TextField name="correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo}/>
        <br />
        <TextField name="usuario" className={styles.inputMaterial} label="Usuario" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo}/>
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
     <TableContainer  style={{display: 'flex',flexDirection:'column' , tableLayout:'fixed', width:'100%', height:'370px', fontFamily:'Lucida Sans Demibold Roman'}}>
       <Table style={{display: 'flex',flexDirection:'column'}}>
         <TableHead>
           <TableRow>
             <TableCell style={{textAlign:'center'}}>ID Usuario</TableCell>
             <TableCell>Usuario</TableCell>
             <TableCell>Nombres</TableCell>
             <TableCell>Apellidos</TableCell>
             <TableCell>Correo</TableCell>
             <TableCell>Fecha de Creacion</TableCell>
             <TableCell>Usuario Confirmado</TableCell>
             <TableCell>Usuario Activo</TableCell>
             <TableCell>Fechad de Modificacion</TableCell>

           </TableRow>
         </TableHead>

         <TableBody className='tableContainer' style={{overflowY:'scroll'}}>
           {data.map(consola=>(
             <TableRow style={{overflowY:'scroll', width:'100%'}} key={consola.id_usuario}>
               <TableCell>{consola.id_usuario}</TableCell>
               <TableCell>{consola.usuario}</TableCell>
               <TableCell>{consola.nombres}</TableCell>
               <TableCell>{consola.apellidos}</TableCell>
               <TableCell>{consola.correo}</TableCell>
               <TableCell>{new Date(consola.fecha_creacion).toLocaleDateString()}</TableCell>
               <TableCell>{consola.Ind_Activo ? <Check></Check> : <Close></Close> }</TableCell>
               <TableCell>{consola.Ind_Us_Activo ? <Check></Check> : <Close></Close> }</TableCell>
               <TableCell>{new Date(consola.fecha_creacion).toLocaleDateString()}</TableCell>
               
               {/* <TableCell>{consola.nombres}</TableCell>
               <TableCell>{consola.apellidos}</TableCell>
               <TableCell>{consola.correo}</TableCell> */}
               <TableCell>
                <Edit className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Editar')}/>
                <Delete  className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Eliminar')}/>
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

