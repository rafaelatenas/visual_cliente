import * as React from 'react';
import './data.css'
import { styled, useTheme } from '@mui/material/styles';
import { Box,Drawer,CssBaseline,Toolbar, List,Typography,Divider,IconButton, ListItem, ListItemText } from '@material-ui/core';
import { Menu, TagFaces,ExpandMore, Inbox,Mail, ArrowBack, Search } from '@material-ui/icons';
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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

  const top100Films =[
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  ];

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
const [tiempo, setTiempo] = React.useState([]);
console.log(tiempo)
const [data, setData]=useState([]);
const [regiones, setRegiones] = React.useState([]);
const [productos, setProductos] = React.useState([]);
const [indicadores, setIndicadores] = React.useState([]);
const [canales, setCanales] = React.useState([]);
const [selected, setSelected] = React.useState([]);

/* */
const [value, setValue] = useState([]);


const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    switch (event.target.name) {
      case 'Periodos':
        setPeriodos(
        typeof value === 'string' ? value.split(',') : value,
        );
        break;
      case 'Regiones':
        setRegiones(
        typeof value === 'string' ? value.split(',') : value,
        );
        break;
      case 'Productos':
        setProductos(
        typeof value === 'string' ? value.split(',') : value,
        );
        break;
      case 'Indicadores':
        setIndicadores(
        typeof value === 'string' ? value.split(',') : value,
        );
        break;
      case 'Canales':
        setCanales(
        typeof value === 'string' ? value.split(',') : value,
        );
        break;
      default:
        break;
    }
    for (let i = 0; i < names.length; i++) {
      if (event.target.value[i] === "All") {
      setPeriodos(selected.length === names.length ? [] : names);
       return;
     }
    }
     
  };


  const isAllSelected = names.length > 0 && selected.length === names.length;

const openo = Boolean(anchorEl);
const id = openo ? 'simple-popover' : undefined;
// const selectItem = names.map((name)=>{
//   return(
//     <MenuItem key={name} value={name}>
//       <Checkbox checked={periodos.indexOf(name) > -1} />
//         <ListItemText primary={name}/>
//     </MenuItem>
//   )
// })





  // const handlaaChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   if (value === "all") {
  //     setSelected(selected.length === names.length ? [] : names);
  //     return;
  //   }
  //   // added below code to update selected options
  //   const list = [...selected];
  //   const index = list.indexOf(value);
  //   index === -1 ? list.push(value) : list.splice(index, 1);
  //   setSelected(list);
  //   console.log(list)
  // };


  // const listItem = names.map((name) => {
  //   return (
  //     <MenuItem key={name}>
  //       <Checkbox
  //         value={name}
  //         onChange={handlaaChange}
  //         checked={selected.indexOf(name) > -1}
  //       />
  //       <ListItemText primary={name}/>
  //     </MenuItem>
  //   );
  // });


   const [searchText, setSearchText] = useState("");

   const containsText = (text, searchText) => 
   text.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1;

   const displayedOptions = React.useMemo (
     () => names.filter((name) => containsText(name, searchText)),
     [searchText],

   );

const seleccionarPeriodo=(parametro)=>{
  setTiempo(parametro)
}
   const [valuee, setValuee] = useState([]);
   var token=localStorage.getItem('token');
   const peticionGet=async()=>{
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
const icon = <CheckBoxOutlineBlank fontSize=" style={{width:'auto'}}small" />;
const checked = <CheckBox fontSize="small" />;
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
              var parametro = 'semanas'
              seleccionarPeriodo(parametro)
              peticionGet()}} style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'4% 0 2%', padding:'10%'}}>SEMANAL</Button>
            <Button className='botonreporte' style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'2% 0', padding:'10%'}}>MENSUAL</Button>
            <Button className='botonreporte' style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'2% 0', padding:'10%'}}>TRIMESTRAL</Button>
            <Button className='botonreporte' style={{color:'#fff',background:'#03508f', borderRadius:'1.5em', width:'90%', margin:'2% 0 4%', padding:'10%'}}>SEMESTRAL</Button>
          </CardActions>
      </Card>
      
      <Main open={open}>
        <div className="Contenedordata"> 
          <section className="container-of-table">
            <Header></Header>
              <article className="table-of-data">
                <div className="cards-of-data">
                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel style={{width:'auto'}}>{tiempo}</InputLabel>
                      <MultiSelectSemanas
                        items={data}
                        // getOptionDisabled={getOptionDisabled}
                        label={tiempo}
                        placeholder="Placeholder for textbox"
                        selectAllLabel="Select all"
                        onChange={setValuee}
                      />
                    </FormControl> 
                  </Box>
                  
                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel style={{width:'auto'}}>CANALES</InputLabel>
                      <Select labelId="multiple-checkbox-label" id="multiple-checkbox" name='Canales' multiple value={canales} onChange={handleChange} input={<OutlinedInput label="Tag"/>}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value}/>
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={canales.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> 
                  </Box>

                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel style={{width:'auto'}}>REGIONES</InputLabel>
                      <Select labelId="multiple-checkbox-label" id="multiple-checkbox" name='Regiones' multiple value={regiones} onChange={handleChange} input={<OutlinedInput label="Tag"/>}
                        renderValue={(selected) => (
                          <Box id='boxChip' sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value}/>
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={regiones.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>  
                  </Box>

                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel style={{width:'auto'}}>PRODUCTOS</InputLabel>
                      <Select labelId="multiple-checkbox-label" id="multiple-checkbox" name='Productos' multiple value={productos} onChange={handleChange} input={<OutlinedInput label="Tag"/>}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value}/>
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={productos.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel style={{width:'auto'}}>INDICADORES</InputLabel>
                      <Select labelId="multiple-checkbox-label" id="multiple-checkbox" name='Indicadores' multiple value={indicadores} onChange={handleChange} input={<OutlinedInput label="Tag"/>}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value}/>
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={indicadores.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
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




// class DataReport extends React.Component {

//     componentDidMount(){
//         // const data_of_tittle = "Servicio proporcionado por la API";

//         // window.document.title = ('|Atenas|' + ' ' + data_of_tittle);

//         //--- Temporal a ser cambiado con función dinámica que obtenga los valores de la API ---//
//         var seleccion_opciones = document.getElementById('select-options'); //-- Card de selección de opciones --//
//         var titutlo_opciones;
//         titutlo_opciones = document.createElement('h3');
//         titutlo_opciones.innerHTML = 'REPORTE'; //-- Contendrá el valor leído mediante la api para sustituirse según el servicio.
//         titutlo_opciones.id = 'tittle-services-options'
//         seleccion_opciones.appendChild(titutlo_opciones);
        
//         var container_opciones;
//         container_opciones = document.createElement('div');
//         container_opciones.id = 'services-options';
//         seleccion_opciones.appendChild(container_opciones);

//         const prueba = [
//             'SEMANAL',
//             'MENSUAL',
//             'TRIMESTRAL',
//             'SEMESTRAL'
//         ]

//     var opciones_servicios = document.getElementById('services-options');

//     for (let q = 0; q < prueba.length; q++) {
//         const elementprueba = prueba[q];
        
//         var opciones
//         opciones = document.createElement('button');
//         opciones.className = 'opciones'
//         opciones.id = `option_${q+1}`;
//         opciones.innerHTML = elementprueba;
//         opciones_servicios.appendChild(opciones);


//         var opciones_periodo =  document.querySelectorAll('.opciones')
            
//     //provicional va a cambiar por el elemento HTML que se asigne para la sección de periodos//
//         const provicional =  document.querySelector('.cards-of-data');

//         opciones_periodo[q].addEventListener('click',()=>{

//         const cuenta_provicional = provicional.childElementCount;
//             var provicional_prueba;
//             switch (cuenta_provicional) {
//                 case 0:
//                     provicional_prueba = document.createElement('p');
//                     provicional_prueba.className = 'provicional_prueba';
//                     provicional_prueba.id = `option_${q+1}`;
//                     provicional_prueba.innerHTML = elementprueba;
//                     provicional.appendChild(provicional_prueba);
//                     break;

//                 case 1:
//                     provicional.removeChild(provicional.children[0]);
                    
//                     provicional_prueba = document.createElement('p');
//                     provicional_prueba.className = 'provicional_prueba';
//                     provicional_prueba.id = `option_${q+1}`;
//                     provicional_prueba.innerHTML = elementprueba;
//                     provicional.appendChild(provicional_prueba);
//                     break;
//                 default:
//                     break;
//             }

//         })

//     }



//     var menu = document.getElementById('menu');
//     var cancel_menu = document.getElementById('cancel-menu');
//     var menu_desplegable = document.getElementById('menu-des');

//     var button_selecciones = document.getElementById('button_selecciones');
//     var selecciones = document.getElementById('selecciones');

//     var container_table = document.querySelector('.container-of-table');

//     // var documentbody = (document.body.className  === 'button_selecciones');

//     if (menu.style.visibility === 'visible') {
//         menu.addEventListener('click', () => {

//             //-- Cerrar Selecciones si se hace click en abrir menú --//
//                 if (document.body.className  === 'button_selecciones'){
//                     document.querySelector(".arrowSeleccionts").animate([
//                     { transform: "rotate(0deg)" }
//                 ], {
//                     duration: 2400,
//                     fill: 'forwards'
//                 })
//                 selecciones.animate([

//                     { height: '0%' }
                    
//                 ], {
//                     duration: 2400,
//                     fill: 'forwards'
//                 });
//                 }

//                 container_table.addEventListener('click',()=>{
//                     menu_desplegable.animate([
//                         {transform: 'translateX(-100%)'}
//                     ],{
//                         fill:'forwards',
//                         duration:2400
//                     })
            
//                     cancel_menu.style.visibility = "hidden";
//                     menu.style.visibility = "visible"
//                 })
//         });
        
//     }

    

//     //---- Menu de Selecciones ----//

//     button_selecciones.addEventListener('click', () => {
//         document.body.classList.toggle('button_selecciones');
//         console.log(document.body.className  === 'button_selecciones')

//         if (document.body.className === 'button_selecciones') {
//             //---Animación rotar Flecha ---///
//             document.querySelector(".arrowSeleccionts").animate([
//                     { transform: "rotate(180deg)" }
//                 ], {
//                     duration: 2400,
//                     fill: 'forwards'
//                 })
//                 //-- Animación para boton de seleeciones ---//
                
//             selecciones.animate([
//                     { height: '80%' }
//                 ], {
//                     duration: 2400,
//                     fill: 'forwards'
//                 })
        
//         } else {
//             document.querySelector(".arrowSeleccionts").animate([
//                 { transform: "rotate(0deg)" }
//             ], {
//                 duration: 2400,
//                 fill: 'forwards'
//             })

//             selecciones.animate([
//                 { height: '0%' }
                
//             ], {
//                 duration: 2400,
//                 fill: 'forwards'
//             });
//         }
//     })






// const query = new URLSearchParams(window.location.search)
// const params = query.get('name')
// console.log(params)

// document.addEventListener("DOMContentLoaded", e => {
//     fetchData()
// })


// const fetchData = async() => {
//     try {
//         const res = await fetch('http://localhost:3001/apiCurso/listarServicios')
//         const data = await res.json()
//         banderillas(data)

//     } catch (error) {
//         console.log(error)
//     }
// }
// const banderillas = data => {
//     data.forEach(item => {
//         let servicios = item.servicio
//         console.log(servicios)
//     })
// }

    
//     } 

//     render(){
//         return(
//             <div className="Contenedordata"> 
//                 <section className="container-of-table">
//                    <Header /> 
//                     <article className="table-of-data">
//                         <div className="cards-of-data">

//                         </div>
//                     </article>
//                     <button id="process" type="submit"><a href="./view-data.html">Process</a> </button>
//                 </section>



//                 <aside id="drop-down">
//                     <BotonUser />
//                     <section className="container-selecciones">
//                         <button id="button_selecciones" className="button_selecciones">
//                             <h3>Mis Selecciones</h3>
//                             <i className="arrowSeleccionts" >
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="" d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5
//                                     32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg></i>
//                         </button>
//                         <div id="selecciones" className="selecciones">
//                         </div>
//                     </section>

//                     <section className="reports-or-categories">
//                         <article id="select-options"></article>
//                     </section>
//                     <button id="previous">
//                         <Link to={'/home'}><img src={previo}alt="Previous Page"></img></Link>
                        
//                     </button>


//                 </aside>
//                 <Menu/>
//             </div>
            
//         )
//     }
// }

// export default DataReport;