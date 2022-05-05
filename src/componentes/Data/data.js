import * as React from 'react';
import './data.css'
import { styled, useTheme } from '@mui/material/styles';
import { Box,Drawer,CssBaseline,Toolbar } from '@material-ui/core';
import { List,Typography,Divider,IconButton} from '@material-ui/core';
import { Menu, ChevronLeft, ChevronRight } from '@material-ui/icons';
import {Inbox,Mail } from '@material-ui/icons';
import { ListItem, ListItemText } from '@material-ui/core';

const drawerWidth = 15;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
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
      marginLeft:`${drawerWidth}%` ,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu/>
          </IconButton>
        </Toolbar>
      <Drawer
        sx={{
          width: `${drawerWidth*2}%`,
          flexShrink: 0,
          
          '& .MuiDrawer-paper': {
            width: `${drawerWidth*2}%`,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
            hola
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem>hola</ListItem>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItem>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItem>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItem>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItem>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> 
      </Main>
    </Box>
  );
}

// import React from "react";
// import { Link } from 'react-router-dom';
// import previo from '../../landing/favicon/arrow-left-solid.svg';
// import BotonUser from "../componentes_data/botonuser";
// import Header from "../componentes_data/header";
// import Menu from "../componentes_data/menu";
// import './data.css';



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