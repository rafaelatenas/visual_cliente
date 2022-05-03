import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../usuario/listarUsuarios.css'
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, TextField} from '@material-ui/core';
import { Edit , Delete, Check, Close} from '@material-ui/icons';
import { DataGrid, GridToolbarExport } from '@mui/x-data-grid';

//* Componentes de Estilos *//
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
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

//* Funcion Pricipal del Componente*//
function ListarPerfiles() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    
    nombres: '',
    apellidos:'',
    correo: '',
    usuario: '',
    id_usuario:'',
    id_perfil:'',
    Ind_Activo:'',
    Ind_Us_Activo:'',
    id_cliente:'',
    clave:'',
  })

/* Funcion para el cambio de valores en tabla*/
  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
  }
/*Petición a la API LISTAR USUARIOS*/
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
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);   
    })
  }


/*Petición POST a la API UPDATE USUARIOS para cumplir la funcion de actualizar*/

  var datosEnviar={correo:consolaSeleccionada.correo, 
    nombres:consolaSeleccionada.nombres,
    apellidos:consolaSeleccionada.apellidos,
    id_usuario:consolaSeleccionada.id_usuario,
    id_perfil:consolaSeleccionada.id_perfil,
    usuario:consolaSeleccionada.usuario,
    clave:consolaSeleccionada.clave,
  } 
    const peticionPost=()=>{
       axios.post(process.env.REACT_APP_API_ENDPOINT+'UpdateUsuarios',{
         headers: {
           'Authorization': `Bearer ${token}`
         },
        datosEnviar
      })
      .then(response=>{
        console.log(response)
      })
    }
/*Petición POST a la API INACTIVAR USUARIOS para cumplir la funcion de "Eliminar"*/
  const peticionDelete=async()=>{
      await axios.post(process.env.REACT_APP_API_ENDPOINT+'InactivarUsuario/'+consolaSeleccionada.id_usuario,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response=>{
        console.log(response)
        setData(response.data.data.filter(consola=>consola.id_usuario!==consolaSeleccionada.id_usuario));
        abrirCerrarModalEliminar();
      }).catch(error=>{
        console.log(error);
      })
  }
/*Selecctor de modales y de rellenado de tabla de edición*/
  const seleccionarConsola=(thisRow, caso)=>{
    setConsolaSeleccionada(thisRow);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  /*Funciones para abrir y cerrar modales*/
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const currencies = [
    {value: 'true',
     label: 'Activo',
    },
    {value: 'false',
     label: 'Inactivo',
  }]

  const [currency, setCurrency] = React.useState({
      Ind_Activo:'',
  });

  const handleChangeselect = (event) => {
      setCurrency(event.target.value);
  };
/*Cuerpo del Modal de Edición*/
  const bodyEditar=(
    <div style={{width:'60%'}} className={styles.modal}>
      <h3 style={{textAlign:'center'}}>Editar Datos de Usuario</h3>
      <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around'}} className='agruparEdit'>
        <div style={{width:'40%'}} className='grupoEdit'>
          <TextField name="id_usuario" className={styles.inputMaterial} label="ID Usuario" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.id_usuario}/>
          <br />
          <TextField name="usuario" className={styles.inputMaterial} label="Usuario" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.usuario}/>
          <br />
          <TextField name="nombres" className={styles.inputMaterial} label="Nombres" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombres}/>
          <br />
          <TextField name="apellidos" className={styles.inputMaterial} label="Apellidos" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellidos}/>
          <br />
          <TextField name="correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo}/>
          <br /><br />
        </div>
        <div style={{width:'40%'}} className='grupoEdit'>
          <TextField name="id_perfil" className={styles.inputMaterial} label="ID Perfil" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.id_perfil}/>
          <br />
          <TextField name="Ind_Activo" 
          className={styles.inputMaterial}
          select 
          label="Usuario Activo"
          value={currency.Ind_Activo}
          onChange={handleChangeselect}
          SelectProps={{
            native: consolaSeleccionada.Ind_Activo,
          }}
          >
          {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
          ))}</TextField>
          <br />
          <TextField name="id_cliente" className={styles.inputMaterial} label="ID Cliente"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.id_cliente}/>
          <br />
          <TextField name="clave" className={styles.inputMaterial} label="Clave" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.clave}/>
          <br /><br />
      
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Guardar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
        </div>
      </div>
    </div>  
  )
/*Cuerpo del Modal de Borrado*/
  const bodyEliminar=(
    <div style={{textAlign:'center', display:'flex', justifyContent:'center', flexDirection:'column'}} className={styles.modal}>
      <p>¿Estás seguro que deseas eliminar al Usuario: <b>{consolaSeleccionada && consolaSeleccionada.usuario}</b>?</p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  )
 /*Columnas del Datatable*/ 
const colums = [
  { field: 'id_usuario', headerName: 'ID Usuario'},
  { field: 'id_perfil', headerName: 'ID Perfil'},
  { field: 'id_cliente', headerName: 'ID Cliente'},
  { field: 'usuario', headerName: 'Usuario'},
  { field: 'nombres', headerName: 'Nombres'},
  { field: 'apellidos', headerName: 'Apellidos'},
  { field: 'correo', headerName: 'Correo'},
  { field: 'fecha_creacion' , headerName: 'Fecha  de Creación'},
  {
    field: 'Ind_Us_Activo',
    headerName: 'Usuario Confirmado',
    sortable: false,
    renderCell: (params) => {
      var api = params.api;
      var thisRow = {};
        api
        .getAllColumns()
        .filter((c) => c.field !== '__check__' && !!c)
        .forEach(
          (c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          if (thisRow.Ind_Us_Activo === true) {
            return<Check></Check>
          }else{
            return<Close></Close>
          }
    }     
  },
  {
    field: 'Ind_Activo',
    headerName: 'Usuario Activo',
    sortable: false,
    renderCell: (params) => {
      var api = params.api;
      var thisRow = {};
        api
        .getAllColumns()
        .filter((c) => c.field !== '__check__' && !!c)
        .forEach(
          (c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          if (thisRow.Ind_Activo === true) {
            return<Check></Check>
          }else{
            return<Close></Close>
          }
  }
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      return[
      <Edit style={{cursor:'pointer'}} onClick={(e)=>{
        var api = params.api;
        var thisRow = {};
        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );
          seleccionarConsola(thisRow, 'Editar')
      }}/>,
       <Delete style={{cursor:'pointer'}} onClick={(e)=>{
         var api = params.api;
         var thisRow = {};
         console.log(thisRow)
         api
           .getAllColumns()
           .filter((c) => c.field !== '__check__' && !!c)
           .forEach(
             (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
           );
           seleccionarConsola(thisRow, 'Eliminar')             
       }}/>
      ]
    },
    
  },
  
]

/*HTML de React para el Datatable y los Modales*/ 
  return (
    <div className="App">
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={colums}
            rows={data}
            getRowId={(row) => row.id_usuario}
            editMode='row'
          ></DataGrid>
        </div>
      </div>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
        >{bodyEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
        >{bodyEliminar}
      </Modal>
    </div>
  );
}

export default ListarPerfiles;
