import * as React from 'react';
import './data.css'
import { styled, useTheme } from '@mui/material/styles';
import { Box,Drawer,CssBaseline,Toolbar, List,Typography,Divider,IconButton, ListItem, ListItemText, ClickAwayListener } from '@material-ui/core';
import { Menu, TagFaces,ExpandMore, Inbox,Mail, ArrowBack, Search, SettingsRemoteOutlined } from '@material-ui/icons';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Avatar, Chip, FormControlLabel, InputAdornment, ListSubheader, MenuItem, Stack, Tooltip } from '@mui/material';
import { Paper, Button} from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank} from '@material-ui/icons';
import { TextField } from '@mui/material';
import Header from '../componentes_data/header'
import { Checkbox } from '@mui/material';
import { InputLabel } from '@mui/material';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import MultiSelectCanales from '../componentes_data/MultiSelectCanales';
import MultiSelectSemanas from '../componentes_data/MultiSelectSemanas';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, periodos, theme) {
  return {
    fontWeight:
      periodos.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


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

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  /*DATA Provisional*/

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  

/* Elementos de Menú*/
const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

/* Elementos de Selección */
const [periodos, setPeriodos] = React.useState([])
/* Periodos y Data*/
const [tiempoReporte, settiempoReporte] = React.useState([]);
const [data, setData]=useState([]);
/*Canales*/
const [canales, setCanales] = React.useState([]);

const [regiones, setRegiones] = React.useState([]);
const [productos, setProductos] = React.useState([]);
const [indicadores, setIndicadores] = React.useState([]);

const [selected, setSelected] = React.useState([]);

const openo = Boolean(anchorEl);
const id = openo ? 'simple-popover' : undefined;

const seleccionarPeriodo=(parametro)=>{
  settiempoReporte(parametro)
}
   const [valuee, setValuee] = useState([]);
   var token=localStorage.getItem('token');
   const peticionSemanas=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarSemana',{
       headers: {
         'Authorization': `Bearer ${token}`
       },
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
       headers: {
         'Authorization': `Bearer ${token}`
       },
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

  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleToggleOption = selectedOptions =>
    setSelectedOptions(selectedOptions);
  const handleClearOptions = () => setSelectedOptions([]);
  const handleSelectAll = isSelected => {
    if (isSelected) {
      setSelectedOptions(data);
    } else {
      handleClearOptions();
    }
  }

   if(selectedOptions.length>=1){
    // axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarCanal',{
    //      headers: {
    //        'Authorization': `Bearer ${token}`
    //      },
    //   })
    //   .then(response=>{
    //     setCanales(response.data.data);
    //     console.log(response.data)
    //     console.log(response.data.data)
    //   }).catch(error=>{
    //     console.log(error.response.data.message);
    //     console.log(error.response.status);
    //     console.log(error.response.headers); 
    //   })
  
   }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Toolbar style={{marginLeft:'1%',width:'15%',height:'10%',padding:'0',justifyContent:'space-around'}}>
        <IconButton
            style={{margin:'0',padding:'0',background:'#F6B232', borderRadius:'.3em',width:'auto',height:'50%'}}
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
          <IconButton  style={{margin:'0',padding:'0',background:'#F6B232',borderRadius:'.3em', width:'auto', height:'50%'}} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <Menu  style={{fontSize:'35px',fill:'#fff'}}/> : <Menu style={{fontSize:'35px',fill:'#fff'}}/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <Accordion style={{margin:'0',padding:'5% 0',width:'85%',height:'auto', boxShadow:'none'}}>
          <AccordionSummary style={{minHeight:'30px',margin:'0 2.5%',color:'#03508f',width:'95%', border:'.1em solid #000', borderRadius:'1.5em'}}
            expandIcon={<ExpandMore style={{fill:'#03508f'}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{margin:'0'}}>Mis Selecciones</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p:' 0 0 5%',
                m: 0,
                overflowY:'scroll'
              }}
              component="ul"
            >
              {chipData.map((data) => {
                let icon;
                if (data.label === 'React') {
                  icon = <TagFaces/>;
                }
                return (
                  <ListItem style={{width:'auto',paddingLeft:'1%',paddingRight:'1%'}} key={data.key}>
                    <Chip style={{background:'#F6B232', color:'#fff'}}
                      icon={icon}
                      label={data.label}
                      onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                    />
                  </ListItem>
                );
              })}
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
            <Link className='buttonPopover' href='./' style={{textAlign:'center' ,textDecoration:'none', width:'90%', borderRadius:'1.5em'}}>
              <ListItemText>Salir</ListItemText>
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
              peticionSemanas()}} style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>SEMANAL</Button>
              <Button className='botonreporte' onClick={()=>{
              var parametro = 'Meses'
              seleccionarPeriodo(parametro)
              peticionMeses()}} style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>MENSUAL</Button>
              <Button className='botonreporte' onClick={()=>{
              var parametro = 'Trimestres'
              seleccionarPeriodo(parametro)
              peticionMeses()}} style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>TRIMESTRAL</Button>
              <Button className='botonreporte' onClick={()=>{
              var parametro = 'Semestres'
              seleccionarPeriodo(parametro)
              peticionMeses()}} style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>SEMESTRAL</Button>
          </CardActions>
      </Card>
      
      <Main open={open}>
        <div className="Contenedordata"> 
          <section className="container-of-table">
            <Header></Header>
              <article className="table-of-data">
                <div className="cards-of-data">
                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>PERÍODOS</InputLabel>
                    <FormControl sx={{width: '100%'}}>
                    
                        <MultiSelectSemanas
                          items={data}
                          variant
                          openOnFocus={true}
                          label={tiempoReporte}
                          placeholder="Seleccione un Reporte"
                          selectAllLabel="Marcas Todos"
                          selectedValues={selectedOptions}
                          onToggleOption={handleToggleOption}
                          onClearOptions={handleClearOptions}
                          onSelectAll={handleSelectAll}
                        />
                      
                    </FormControl>
                  </Box>
                  
                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>CANALES</InputLabel>
                    <FormControl sx={{width: '100%'}}>
                      <MultiSelectCanales
                        items={canales}
                        variant
                        label={tiempoReporte}
                        placeholder="Placeholder for textbox"
                        selectAllLabel='0'
                        selectedValues={selectedOptions}
                        onToggleOption={handleToggleOption}
                        onClearOptions={handleClearOptions}
                        onSelectAll={handleSelectAll}
                      />
                    </FormControl> 
                  </Box>

                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel style={{width:'auto'}}>REGIONES</InputLabel>
                      
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
                <div>{periodos}</div>
              </article>
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