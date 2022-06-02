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
    width: '40%',
    height: '40%',
    padding:'2%',
    border: '1.3px solid #000',
    background: '#ffefd5',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1em'
  },
  inputMaterial:{
    width: '95%'
  }}))

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

export default function DATA() {
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
console.log(selectedOptions3)
  /*SubRegionres*/
  const [selectedSubregiones, setSelectedSubregiones] = useState([]);

const openo = Boolean(anchorEl);
const id = openo ? 'simple-popover' : undefined;


  var token=localStorage.getItem('token');
  /*Funciones de Listar PERÍODOS 😄*/
  const peticionSemanas=async()=>{
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
    };

  /*Funciones de Listar REGIONES 😄*/

    /*Funcion onChange del combo Regiones */
    const handleRegiones = (event) => {
      const value =event.target.value;
      setSelectedOptions3(value);
      console.log(value)
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
    const [totalVnzla, setTotalVnzla]=React.useState(false)
    const isAllRegion = data.length > 0 && selectedOptions1.length === data.length;
    const OptionSubRegion = SubRegion.map((item)=>(
      <MenuItem key={item.id} value={item.id}>
        <Checkbox checked={selectedOptions2.indexOf(item.id) > -1} />
        <ListItemText sx={{fontSize:'1em'}} primary={item.nombre} />
      </MenuItem>
    ))
    const OptionRegiones = region.map((item) => {
      console.log(item.id===0)
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
    const [chipData, setChipData] = React.useState([{
      
    }]);
    console.log(chipData)
    const [ids, setIds] = React.useState({})
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
    }
    const [modalSelect, setModalSelect]=useState(false);
    const abrirCerrarModalSelect=()=>{
      setModalSelect(!modalSelect);
    }
    const bodyMySelect=(
      <div style={{width:'40%'}} className={styles.modal}>
        <h2 style={{textAlign:'center'}}>Crear Filtro de Selección</h2>
        <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around'}} className='agruparEdit'>
          <div style={{width:'40%'}} className='grupoEdit'>
            <TextField name="nombre" className={styles.inputMaterial} type='text' onChange={handleChip} value={chipData && chipData.nombre} label="Nombre del Filtro" placeholder='Escriba el nombre de sus Selecciones'/>
          </div>
          <div align="bottom">
            <Button color="primary" onClick={()=>GuardarSelecciones()}>Guardar</Button>
            <Button onClick={()=>abrirCerrarModalSelect()}>Cancelar</Button>
          </div>
        </div>
      </div>
    )
    const DeletePeriodo =()=>{ 
      if(selectedOptions1 !== []){
        setSelectedOptions1([])
      }
    }
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
            <Paper
              sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', listStyle: 'none', p:' 0 0 5%', m: 0}}
              component="ul"
            >
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
        <List style={{width:'80%', display:'inline-flex', flexDirection:'column'}}>
          <ListItem style={{padding:'5% 0', justifyContent:'center'}}>
            <div className='divPopover' style={{width:'90%', borderRadius:'1.5em'}}>
            <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={id} variant="contained" onClick={handleClick}>
              WOP
            </Button>
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
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem style={{padding:'5% 0', justifyContent:'center'}}>
            <div className='divPopover' style={{width:'90%', borderRadius:'1.5em'}}>
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
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem style={{padding:'5% 0', justifyContent:'center'}}>
            <div className='divPopover' style={{width:'90%', borderRadius:'1.5em'}}>
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
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem style={{padding:'5% 0', justifyContent:'center'}}>
            <div className='divPopover' style={{width:'90%', borderRadius:'1.5em'}}>
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
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          </ListItem>

          <ListItem style={{padding:'5% 0', justifyContent:'center'}}>
            <div className='divPopover' style={{width:'90%', borderRadius:'1.5em'}}>
            <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={id} variant="contained" onClick={handleClick}>Execution</Button>
              <Popover
                id={id}
                open={openo}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom',horizontal: 'center',}}
              >
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link href='./home' style={{textDecoration:'none'}}>
                    <ListItemText>WOP</ListItemText>
                  </Link>
                </ListItem>
              </Popover>
            </div>
          
          </ListItem>

          <ListItem style={{padding:'5% 0', justifyContent:'center'}}>
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
            <Button className='botonreporte' onClick={()=>{
              var parametro = 'Semanas'
              seleccionarPeriodo(parametro)
              peticionSemanas()
              DeletePeriodo()
              }} style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>SEMANAL</Button>
              <Button className='botonreporte' onClick={()=>{
              var parametro = 'Meses'
              seleccionarPeriodo(parametro)
              peticionMeses()
              DeletePeriodo()
              }} style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>MENSUAL</Button>
              <Button className='botonreporte' onClick={()=>{
              var parametro = 'Trimestres'
              seleccionarPeriodo(parametro)
              peticionMeses()
              DeletePeriodo()
              }
              } style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>TRIMESTRAL</Button>
              <Button className='botonreporte' onClick={()=>{
              var parametro = 'Semestres'
              seleccionarPeriodo(parametro)
              peticionMeses()
              DeletePeriodo()
              }} style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>SEMESTRAL</Button>
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
                    <FormControl sx={{width: '100%'}} className={classes.formControl}>
                      <InputLabel style={{background: 'rgb(247, 244, 244)', width:'auto'}} id="mutiple-select-label">{tiempoReporte}</InputLabel>
                      <Select
                        labelId="mutiple-select-label"
                        multiple
                        value={selectedOptions1}
                        open={op}
                        onChange={handlePeriodos}
                        onClose={handleClosee}
                        onOpen={handleOpen}
                        renderValue={(selected) =>{ console.log(selected)
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
                        <MenuItem value="all" classes={{root: isAllSelectedede ? classes.selectedAll : ""}}>
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
                    <FormControl sx={{width: '100%'}} className={classes.formControl}>
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
                        <MenuItem value={parseInt(ID_Cliente)}>
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
                  <FormControl sx={{width: '100%'}} className={classes.formControl}>
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
                    {/* <FormControl style={{overflow:'visible'}} sx={{width: '100%'}}>
                    <InputLabel style={{overflow:'visible'}} id="demo-simple-select-label">Regiones</InputLabel>
                      <Select 
                        multiple
                        value={selectedOptions3} 
                        onChange={handleRegiones}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        input={<OutlinedInput label="Tag"/>}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip style={{fontSize:'.7em'}} key={value} label={value}/>
                              ))} 
                            </Box>
                          )}
                        MenuProps={MenuProps}
                        >
                          {OptionRegiones}
                      </Select>
                    </FormControl>   */}
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
              <button onClick={abrirCerrarModalSelect}><Save/>Guardar</button>
              <button id="process">Procesar</button>
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