import * as React from 'react';
import './data.css'
import { styled, useTheme } from '@mui/material/styles';
import { Box,Drawer,CssBaseline,Toolbar, List,Typography,Divider,IconButton, ListItem, ListItemText, Input } from '@material-ui/core';
import { Menu,ExpandMore, ArrowBack, Save} from '@material-ui/icons';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Chip,  MenuItem, Stack, Tooltip } from '@mui/material';
import { Paper, Button, TextField, FormControl, Select, InputLabel, Checkbox} from '@mui/material';
import Header from '../componentes_data/header'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '16%',
    },
  },
};
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '30%',
    height: '40%',
    padding:'2%',
    border: '1.3px solid #000',
    background: '#ffefd5',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1em',
    display:'inline-flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  agrupar:{
    display: 'flex',
    width: '100%',
    height:'40%',
    justifyContent: 'space-between',
    flexDirection:'column',
    overflow:'visible'
  },
  inputMaterial:{
    width: '95%',
    height:'100%'
  },
  list:{
    width:'80%',
    display:'inline-flex',
    flexDirection:'column'
  },
  listItem:{
    padding:'5% 0', justifyContent:'center',width:'auto'
  },
  popOver:{
    width:'90%', borderRadius:'1.5em', background:'transparent'
  },
  buttons:{
    position: 'absolute', top: '90%', right: '3%', width: '30%', justifyContent:'space-around',height:'5%'
  },
  botonReportes:{
    color:'#fff !important', borderRadius:'1.5em !important', width:'90% !important', margin:'4% 0 2% !important', padding:'10% !important'
  }
}))

var ID_Cliente = sessionStorage.getItem('Id_Cliente')

const drawerWidth = 15;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    width:'80%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft:0 ,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft:`${drawerWidth-5}%` ,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection:'row-reverse',
  alignItems: 'center',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-evenly',
  width:'100%'
}));

const MySwal = withReactContent(Swal)
const toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

export default function DATA(){
  const styles= useStyles();
  const theme = useTheme();
  /*Control del Drawer*/
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  /* Elementos de Menú*/
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showMenuItem, setShowMenuItem] = React.useState({
    periodo:false,
    canal:false,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /* Periodos y DataSemanal*/
  const [tiempoReporte, settiempoReporte] = React.useState([]);
  const seleccionarPeriodo=(parametro)=>{
      settiempoReporte(parametro)
  }

  const classes = useStyles();
  const [data, setData]=useState([]);
  const [selectedOptions1, setSelectedOptions1] = useState([]);
  const [ChipPeriodo, setChipPeriodo] = useState([]);

  /*Canales*/
  const [canal, setCanal]=useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  /*Regiones*/
  const [region, setRegion]=useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);
    /*SubRegionres*/
    const [selectedSubregiones, setSelectedSubregiones] = useState([]);

  const openo = Boolean(anchorEl);
  const id = openo ? 'simple-popover' : undefined;

  var token=localStorage.getItem('token');
  /*Funciones de Listar PERÍODOS 😄*/
  const peticionSemanas=async()=>{
    setBotonreporte({semanas:true})
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarSemana',{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setData(response.data.data);
      console.log(response.data)
      console.log(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers); 
    })
  }
    
  const peticionMeses=async()=>{
    setBotonreporte({meses:true})
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarPeriodo',{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setData(response.data.data);
      console.log(response.data)
      console.log(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers); 
    })
  }

  const OptionPeriodo = data.map((option) => (
    <MenuItem key={option.id} value={(option.id)}>
      <ListItem>
        <Checkbox checked={(selectedOptions1.indexOf(option.id) > -1) || (selectedOptions1.indexOf(option) > -1)} />
      </ListItem>
      <ListItemText primary={option.nombre}/>
    </MenuItem>
  ))

  const controladorAll = ()=>{
    switch (true) {
      case data.length===0:
        setShowMenuItem({periodo:false})
        break;
      case tiempoReporte==='Trimestres':
        setShowMenuItem({periodo:false})
        break;
      case tiempoReporte==='Semestres':
        setShowMenuItem({periodo:false})
        break;
      default:
        setShowMenuItem({periodo:true})
        break;
    }
  }
    /*Control de Select PERÍODOS.*/
  const [op, setOp] = React.useState(false);
  const handleClosee = () => {
    setOp(false);
    if(selectedOptions1.length >= 1){
      peticionCanales()
    }
  };
  const handleOpen = () => {
    setOp(true);
    controladorAll()
  };

  /*Función onChange y Select ALL del combo Períodos*/
  const isAllSelectedede = data.length > 0 && selectedOptions1.length === data.length;

  const handlePeriodos = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedOptions1(selectedOptions1.length === data.length ? [] : data);
      return;
    }
    setSelectedOptions1(value);
  };

  /*Funciones de Listar CANALES 😄*/
    /*Funcion onChange del combo Canales*/

    const handleCanales = (event) => {
      const value =event.target.value;
      setSelectedOptions2(value);
    };  
    /* Funcion de Peticion Canal. Solo se hará la llamada de esta función según el controlador del select*/
    const peticionCanales=async()=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarCanal',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setCanal(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers); 
      })
    }
    const OptionCanales = canal.map((item) => (
      <MenuItem key={item.id} value={item.id}>
        <Checkbox checked={selectedOptions2.indexOf(item.id) > -1} />
        <ListItemText sx={{fontSize:'1em'}} primary={item.nombre} />
      </MenuItem>
    ))
    
    /*Control de Select CANALES.*/
    const [ope, setOpe] = React.useState(false);
    const CloseCanal =()=>{
      setOpe(false);
      if(selectedOptions2.length >= 1){
        peticionRegiones()
      }
    }
    const OpenCanal = () => {
      setOpe(true);
      controladorMiCadena()
    };

    const controladorMiCadena =()=>{
      switch (true) {
        case canal.length === 0:
            setShowMenuItem({canal:false})
          break;
        default:
          setShowMenuItem({canal:true})
          break;
      }
    }
  /*Funciones de Listar REGIONES 😄*/

    /*Funcion onChange del combo Regiones */
    const handleRegiones = (event) => {
      const value =event.target.value;
      setSelectedOptions3(value);
    };
    
    const [openRegiones, setOpenRegiones] = React.useState(false);
    const OpenRegion = () => {
      setOpenRegiones(true);
    };
    const CloseRegion = () => {
      setOpenRegiones(false);
    };

      /*Funcion onChange del combo SubRegiones */
    const [SubRegion, setSubRegion]= React.useState([])
    const peticionSubRegiones=async(value)=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarSubRegion/'+value,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response=>{
        setSubRegion(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers); 
      })
    }
    const handleSubRegiones = (event) => {
      const value =event.target.value;
      setSelectedSubregiones(value);
    };
   // const [totalVnzla, setTotalVnzla]=React.useState(false)
   // const isAllRegion = data.length > 0 && selectedOptions1.length === data.length;
    const OptionSubRegion = SubRegion.map((item)=>(
      <MenuItem key={item.id} value={item.id}>
        <Checkbox checked={selectedOptions2.indexOf(item.id) > -1} />
        <ListItemText sx={{fontSize:'1em'}} primary={item.nombre} />
      </MenuItem>
    ))
    const OptionRegiones = region.map((item) => {
      if(item.id!==0){
        return(
            <MenuItem key={item.id} value={item.id}>
              <Checkbox
                // classes={{ indeterminate: classes.indeterminateColor }}
              // checked={isAllRegion}
                // indeterminate={ selectedOptions3.length > 0 && selectedOptions3.length < region.length}
                checked={(selectedOptions3.indexOf(item.id) > -1) ||(selectedOptions3.indexOf(item) > -1)}
              />
              <ListItemText style={{overflow:'visible'}} id="demo-simple-select-label">{item.nombre}</ListItemText>
              <Select 
                multiple
                value={selectedSubregiones} 
                onChange={handleSubRegiones}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                input={<Input style={{width:'100%',position: 'absolute'}} label="Tag"/>}
                MenuProps={MenuProps}
              >
                {OptionSubRegion}
              </Select>
            </MenuItem>
      )
      }
      return(
        <MenuItem key={item.id} value={item.id}>
          <Checkbox
            // classes={{ indeterminate: classes.indeterminateColor }}
          // checked={isAllRegion}
            // indeterminate={ selectedOptions3.length > 0 && selectedOptions3.length < region.length}
            checked={(selectedOptions3.indexOf(item.id) > -1) ||(selectedOptions3.indexOf(item) > -1)}
          />
          <ListItemText style={{overflow:'visible'}} id="demo-simple-select-label">{item.nombre}</ListItemText>
          <Divider style={{width:'100%',position: 'absolute',top:'97%', height:'3%', background:'#00000061'}}/>
        </MenuItem>
      )
    })
  
    /* Funcion de Peticion Regiones. Solo se hará la llamada de esta función según el controlador del select*/
    const peticionRegiones=async()=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarRegion',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setRegion(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers); 
      })
    }

    /*Mis Selecciones*/
    const [chipData, setChipData] = React.useState({
      nombre:'',
      id:''
    });
    const [disable, setDisable] = React.useState(true)
    const handleDelete = (chipToDelete) => () => {
      setChipData((chips) => (chips.nombre !== chipToDelete.key));
    };
    
    const handleChip=(e)=>{
      let ids;
      const {name, value}=e.target;
      if(selectedOptions1.length === data.length){
        let result = selectedOptions1.reduce((acc,cur) => {
          let {id} = cur;
          let ex = acc.find(x => x.id === id);
            if(!ex){ex = id;acc.push(ex);}
            return acc;
        }, [])
        ids=result.concat(selectedOptions2,selectedOptions3).join('*')
        setChipData({[name]: value,id:ids})
      }else{
        ids=selectedOptions1.concat(selectedOptions2,selectedOptions3).join('*')
        setChipData({[name]: value,id:ids})
      }

    }
    const GuardarSelecciones =()=>{
      abrirCerrarModalSelect()
      setChipData({nombre:[]})
    }
    
    const [modalSelect, setModalSelect]=useState(false);
    const [isSelected, setIsSelected]=useState({
      selectedOptions1:false,
      selectedOptions2:false,
      selectedOptions3:false
    });
    const abrirCerrarModalSelect=()=>{
      switch (true) {
        case selectedOptions1.length === 0:
          setIsSelected({selectedOptions1:true})
          toast.fire({
            icon: 'error',
            title: 'No ha Seleccionado un Período',
            confirmButtonText: `Ok`,
          })
          break;
        case selectedOptions2.length === 0:
          setIsSelected({selectedOptions2:true})
          toast.fire({
            icon: 'error',
            title: 'No ha Seleccionado un Canal',
            confirmButtonText: `Ok`,
          })
          break;
        case selectedOptions3.length === 0:
          setIsSelected({selectedOptions3:true})
          toast.fire({
            icon: 'error',
            title: 'No ha Seleccionado una Región',
            confirmButtonText: `Ok`,
          })
          break;
        default:
          setModalSelect(!modalSelect);
          setIsSelected({selectedOptions1:false, selectedOptions2:false, selectedOptions3:false})
          break;
      }
    }
    const bodyMySelect=(
      <div style={{width:'25%', height:'40%', justifyContent:'space-around'}} className={styles.modal}>
        <h1 style={{textAlign:'center'}}>Crear Filtro de Selección</h1>
        <div className={styles.agrupar}>
          <div style={{width:'100%', overflow:'visible'}} className='grupoEditar'>
            <TextField name="nombre" className={styles.inputMaterial} type='text' onChange={handleChip} value={chipData && chipData.nombre} label="Nombre del Filtro" placeholder='Escriba el nombre de sus Selecciones'/>
          </div>
          <Stack direction="row" justifyContent={'flex-end'} spacing={2}>
            <Button style={{background:"#2FAC6A"}} variant="contained" onClick={()=>GuardarSelecciones()}>Guardar</Button>
            <Button variant="contained"  onClick={()=>abrirCerrarModalSelect()}>Cancelar</Button>
          </Stack>
        </div>
      </div>
    )
    const DeletePeriodo =()=>{ 
      if(selectedOptions1 !== []){
        setSelectedOptions1([])
      }
    }

    const [botonreporte, setBotonreporte]=useState({
      semanas:false,
      meses:false,
      trimestres:false,
      semestres:false
    })
console.log(botonreporte.semanas)
    let icon;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Toolbar style={{marginLeft:'1%',width:'15%',height:'10%',padding:'0',justifyContent:'space-around'}}>
        <IconButton
            style={{margin:'0',padding:'0',background:'#F6B232', borderRadius:'.3em',width:'auto'}}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu  style={{fontSize:'35px',fill:'#fff'}}/>
        </IconButton>
        <Stack style={{width:'70%', height:'100%', justifyContent:'center'}}>
          <Tooltip title={localStorage.getItem('Login')} arrow placement="right">
            <Chip 
              style={{background:'#fff', color:'#03508f'}}
              avatar={<Avatar>R</Avatar>}
              label={localStorage.getItem('Login')}
              variant="outlined"
            ></Chip>
          </Tooltip>
        </Stack>
      </Toolbar>
      <Drawer
        style={{borderTopRightRadius:'.5em',borderButtomRightRadius:'.5em'}}
        sx={{
          width: `${drawerWidth*2}%`,
          flexShrink: 0,
          borderTopRightRadius:'.5em',
          '& .MuiDrawer-paper': {
            width: `${drawerWidth*2}%`,
            boxSizing: 'border-box',
            borderTopRightRadius:'.5em',
            borderButtomRightRadius:'.5em'
          },
        }}
        variant="persistent"       
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Stack style={{width:'70%', height:'100%', justifyContent:'center'}}>
            <Tooltip title={localStorage.getItem('Login')} arrow placement="right">
              <Chip
                avatar={<Avatar>R</Avatar>}
                label={localStorage.getItem('Login')}
                variant="outlined"
              ></Chip>
            </Tooltip>
          </Stack>
          <IconButton  style={{margin:'0',padding:'0',background:'#F6B232',borderRadius:'.3em', width:'auto'}} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <Menu  style={{fontSize:'35px',fill:'#fff'}}/> : <Menu style={{fontSize:'35px',fill:'#fff'}}/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <Accordion style={{margin:'0',padding:'5% 0',width:'85%',height:'auto', maxHeight:'30%', boxShadow:'none'}}>
          <AccordionSummary style={{minHeight:'4%',color:'#03508f',width:'95%', border:'.1em solid #000', borderRadius:'1.5em'}}
            expandIcon={<ExpandMore style={{fill:'#03508f'}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{margin:'0'}}>Mis Selecciones</Typography>
          </AccordionSummary>
          <AccordionDetails style={{overfolwY:'scroll'}}>
            <Paper sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', listStyle: 'none', p:' 0 0 5%', m: 0}} component="ul">
              <ListItem style={{width:'auto',paddingLeft:'1%',paddingRight:'1%'}} key={chipData.nombre}>
                <Chip style={{background:'#F6B232', color:'#fff'}}
                      icon={icon}
                      label={chipData.nombre}
                  onDelete={handleDelete(chipData)}
                />
              </ListItem>
            </Paper>
          </AccordionDetails>
        </Accordion>
        <Divider style={{width:'90%', background: 'rgb(0 0 0 / 38%)'}}/>
        <List className={styles.list}>
          <ListItem className={styles.listItem}>
            <div className={styles.popOver}>
            <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={id} variant="contained" onClick={handleClick}>
              WOP
            </Button>
              <Popover
                style={{width:'100%'}}
                id={id}
                open={openo}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem className={styles.listItem}>
            <div className={styles.popOver}>
              <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={id} variant="contained" onClick={handleClick}>Retail Scanning</Button>
              <Popover
                id={id}
                open={openo}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem className={styles.listItem}>
            <div className={styles.popOver}>
              <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={id} variant="contained" onClick={handleClick}>Home Pantry</Button>
              <Popover
                id={id}
                open={openo}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem className={styles.listItem}>
            <div className={styles.popOver}>
            <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={id} variant="contained" onClick={handleClick}>CI</Button>
              <Popover
                id={id}
                open={openo}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem className={styles.listItem}>
            <div className={styles.popOver}>
            <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={id} variant="contained" onClick={handleClick}>Execution</Button>
              <Popover
                id={id}
                open={openo}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom',horizontal: 'center',}}
              >
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem className={styles.listItem}>
            <Link className='buttonPopover' href='./' style={{textAlign:'center' ,textDecoration:'none', width:'90%', borderRadius:'1.5em', padding:'1% 0'}}>
              <ListItemText>SALIR</ListItemText>
            </Link>
          </ListItem>
        </List>
      </Drawer>
      
      <Card className='reporte' style={{borderRadius:'1.5em'}}>
        <CardHeader style={{padding:'10% 0 5%', color:'#03508f', fontSize:'1em'}} title="REPORTE"/>
        <Divider style={{width:'70%', background: 'rgb(0 0 0 / 38%)'}}/>
        <CardActions style={{display:'flex', padding:'0', flexDirection:'column', width:'80%'}}>
          <Button style={{ background: botonreporte.semanas? '#F6B232': '#03508f'}} onClick={()=>{
              var parametro = 'Semanas'
              seleccionarPeriodo(parametro)
              peticionSemanas()
              DeletePeriodo()
            }} className={styles.botonReportes}>SEMANAL</Button>
          <Button className={styles.botonReportes} onClick={()=>{
              var parametro = 'Meses'
              seleccionarPeriodo(parametro)
              peticionMeses()
              DeletePeriodo()
            }} style={{ background: botonreporte.meses? '#F6B232': '#03508f'}}>MENSUAL</Button>
          <Button className={styles.botonReportes} onClick={()=>{
              var parametro = 'Trimestres'
              seleccionarPeriodo(parametro)
              peticionMeses()
              DeletePeriodo()
            }} style={{ background: botonreporte.trimestres? '#F6B232': '#03508f'}}>TRIMESTRAL</Button>
          <Button className={styles.botonReportes} onClick={()=>{
              var parametro = 'Semestres'
              seleccionarPeriodo(parametro)
              peticionMeses()
              DeletePeriodo()
            }} style={{ background: botonreporte.semestres? '#F6B232': '#03508f'}}>SEMESTRAL</Button>
        </CardActions>
      </Card>
      <Modal
        open={modalSelect}
        onClose={abrirCerrarModalSelect}
        >{bodyMySelect}
      </Modal>
      <Main open={open}>
        <div className="Contenedordata"> 
          <section className="container-of-table">
            <Header/>
              <article className="table-of-data">
                <div className="cards-of-data">
                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>PERÍODOS</InputLabel>
                    <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions1}>
                      <InputLabel style={{background: 'rgb(247, 244, 244)', width:'auto'}} id="mutiple-select-label">{tiempoReporte}</InputLabel>
                      <Select
                        labelId="mutiple-select-label"
                        multiple
                        value={selectedOptions1}
                        open={op}
                        onChange={handlePeriodos}
                        onClose={handleClosee}
                        onOpen={handleOpen}
                        renderValue={(selected) =>{
                          if(selected.length>=3 && selected.length<data.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`${selected.length} Opciones Marcadas`}/>)
                          }else if(selected.length === data.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`Todas Marcadas (${selected.length})`}/>)
                          }else if(selected.length<3){
                            return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) =>{  
                                for (let h = 0; h < data.length; h++) {
                                const element = data[h];
                                  if(element.id === value){
                                    return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                  }
                                }
                              })}
                            </Box>
                            )
                          }
                        }}
                        MenuProps={MenuProps}
                      >
                        <MenuItem value="all" classes={{root: isAllSelectedede ? classes.selectedAll : ""}} style={{ display: showMenuItem.periodo ? "flex" : "none" }}>
                        <ListItem>
                          <Checkbox
                            classes={{ indeterminate: classes.indeterminateColor }}
                            checked={isAllSelectedede}
                            indeterminate={ selectedOptions1.length > 0 && selectedOptions1.length < data.length}
                          />
                          </ListItem>
                          <ListItemText primary="Marcar Todo" classes={{ primary: classes.selectAllText }}/>
                        </MenuItem>
                          {OptionPeriodo}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>CANALES</InputLabel>
                    <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions2}>
                      <InputLabel style={{background: 'rgb(247, 244, 244)', width:'auto'}} id="mutiple-select-label">Canales</InputLabel>
                      <Select
                        labelId="mutiple-select-label"
                        multiple
                        open={ope}
                        onClose={CloseCanal}
                        onOpen={OpenCanal}
                        value={selectedOptions2}
                        onChange={handleCanales}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) =>{ 
                                for (let h = 0; h < canal.length; h++) {
                                const element = canal[h];
                                  if(element.id === value){
                                    return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                  }else if(value === parseInt(ID_Cliente)){
                                    return(<Chip style={{fontSize:'.7em'}} key={value} label="MI CADENA"/>)
                                  }
                                }
                              })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        <MenuItem value={parseInt(ID_Cliente)} style={{ display: showMenuItem.canal ? "flex" : "none" }}>
                          <ListItem>
                            <Checkbox style={{display:'block', padding:'0'}} checked={selectedOptions2.indexOf(parseInt(ID_Cliente)) > -1}/>
                          </ListItem>
                          <ListItemText sx={{fontSize:'1em'}} primary={'MI CADENA'} />
                        </MenuItem>
                        {OptionCanales}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>REGIONES</InputLabel>
                  <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions3}>
                      <InputLabel style={{background: 'rgb(247, 244, 244)', width:'auto'}} id="mutiple-select-label">Regiones</InputLabel>
                      <Select
                        labelId="mutiple-select-label"
                        multiple
                        open={openRegiones}
                        onClose={CloseRegion}
                        onOpen={OpenRegion}
                        value={selectedOptions3}
                        onChange={handleRegiones}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) =>{ 
                                console.log(selected)
                                
                                for (let h = 0; h < region.length; h++) {
                                const element = region[h];
                                  if(element.id === value && value !== 0){
                                    return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                  }else if (value === 0) {
                                  return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                  }
                                }
                              })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {OptionRegiones}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel style={{width:'auto'}}>PRODUCTOS</InputLabel>
                    </FormControl>
                  </Box>

                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel style={{width:'auto'}}>INDICADORES</InputLabel>
                    </FormControl> 
                  </Box>

                </div>
              </article>
              <Stack direction="row" className={styles.buttons}>
                <button id='save' style={{width:'35%'}} variant="contained" onClick={abrirCerrarModalSelect}>Guardar</button>
                <button id='process' style={{width:'35%'}} variant="contained">Procesar</button>
              </Stack>
              
          </section>
        </div>
      </Main>
      <Button className='atras'
        style={{background: 'transparent',position:'fixed',border:'0.2em solid #fff',minWidth:'50px', borderRadius:'50%'}} 
        variant="contained" href='./Home'>
          <ArrowBack style={{fontSize:'2.5em'}}></ArrowBack>
      </Button>
    </Box>
  );
  
}