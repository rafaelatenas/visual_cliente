import { Drawer,Tooltip,Chip,IconButton,Divider,Accordion,AccordionSummary,Typography,List,Paper } from "@material-ui/core"
import { ListItem,ListItemText,Link,Button,Popover,Avatar, AccordionDetails,Toolbar,Card, CardHeader, CardActions } from "@mui/material"
import { ExpandMore , Menu} from "@mui/icons-material"
import {Stack} from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/styles";
import React from "react";

let icon;

export function DrawerComponent(open){
    const styles= useStyles();
    return(
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
            open={open.open}
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
                <IconButton  style={{margin:'0',padding:'0',background:'#F6B232',borderRadius:'.3em', width:'12%',height:'50%'}} onClick={open.handleDrawerClose}>
                    <Menu style={{fontSize:'35px',fill:'#fff',width:'auto',height:'auto'}}/>
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
                        <ListItem style={{width:'auto',paddingLeft:'1%',paddingRight:'1%'}} key={open.key}>
                            <Chip style={{background:'#F6B232', color:'#fff'}}
                                icon={icon}
                                label={open.label}
                                onDelete={open.handleDelete(open.chipData)}
                            />
                        </ListItem>
                    </Paper>
                </AccordionDetails>
            </Accordion>
            <Divider style={{width:'90%', background: 'rgb(0 0 0 / 38%)'}}/>
            <Divider style={{width:'90%', background: 'rgb(0 0 0 / 38%)'}}/>
            <List className={styles.list}>
                <ListItem className={styles.listItem}>
                    <div className={styles.popOver}>
                        <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={open.id} variant="contained" onClick={open.handleClick}>
                        WOP
                        </Button>
                        <Popover
                            style={{width:'100%'}}
                            id={open.id}
                            open={open.openo}
                            anchorEl={open.anchorEl}
                            onClose={open.handleClose}
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
                    <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={open.id} variant="contained" onClick={open.handleClick}>Retail Scanning</Button>
                    <Popover
                        id={open.id}
                        open={open.openo}
                        anchorEl={open.anchorEl}
                        onClose={open.handleClose}
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
                    <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={open.id} variant="contained" onClick={open.handleClick}>Home Pantry</Button>
                    <Popover
                        id={open.id}
                        open={open.openo}
                        anchorEl={open.anchorEl}
                        onClose={open.handleClose}
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
                    <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={open.id} variant="contained" onClick={open.handleClick}>CI</Button>
                    <Popover
                        id={open.id}
                        open={open.openo}
                        anchorEl={open.anchorEl}
                        onClose={open.handleClose}
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
                    <Button className='buttonPopover' style={{width:'100%', borderRadius:'1.5em'}} aria-describedby={open.id} variant="contained" onClick={open.handleClick}>Execution</Button>
                    <Popover
                        id={open.id}
                        open={open.openo}
                        anchorEl={open.anchorEl}
                        onClose={open.handleClose}
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
    )  
}

export function BotonUsuario(open){
    return(
        <Toolbar style={{marginLeft:'1%',width:'15%',height:'10%',padding:'0',justifyContent:'space-around'}}>
            <IconButton
                style={{margin:'0',padding:'0',background:'#F6B232', borderRadius:'.3em',width:'auto'}}
                color="inherit"
                aria-label="open drawer"
                onClick={open.handleDrawerOpen}
                edge="start"
                sx={{mr: 2, ...(open && { display: 'none' }) }}
            >
                <Menu  style={{fontSize:'35px',fill:'#fff'}}/>
            </IconButton>
            <Stack style={{width:'70%', height:'100%', justifyContent:'center'}}>
                <Tooltip title={localStorage.getItem('Login')} arrow placement="right">
                    <Chip
                        style={{background:'#fff', color:'#03508f'}}
                    avatar={<Avatar></Avatar>}
                    label={localStorage.getItem('Login')}
                    variant="outlined"
                    ></Chip>
            </Tooltip>
            </Stack>
        </Toolbar>
    )
}

export function CardComponents(peticionSemanas){
    const styles= useStyles();
    return(
        <Card className='reporte' style={{borderRadius:'1.5em'}}>
            <CardHeader style={{padding:'10% 0 5%', color:'#03508f', fontSize:'1em'}} title="REPORTE"/>
            <Divider style={{width:'70%', background: 'rgb(0 0 0 / 38%)'}}/>
            <CardActions style={{display:'flex', padding:'0', flexDirection:'column', width:'80%'}}>
                <Button style={{ background: peticionSemanas.botonreporte.semanas? '#F6B232': '#03508f'}} onClick={()=>{
                    var parametro = 'Semanas'
                    peticionSemanas.seleccionarPeriodo(parametro)
                    peticionSemanas.peticionSemanas()
                    peticionSemanas.DeletePeriodo()
                }} className={styles.botonReportes}>SEMANAL</Button>
            <Button className={styles.botonReportes} onClick={()=>{
                    var parametro = 'Meses'
                    peticionSemanas.seleccionarPeriodo(parametro)
                    peticionSemanas.peticionMeses()
                    peticionSemanas.DeletePeriodo()
                }} style={{ background: peticionSemanas.botonreporte.meses? '#F6B232': '#03508f'}}>MENSUAL</Button>
            <Button className={styles.botonReportes} onClick={()=>{
                    var parametro = 'Trimestres'
                    peticionSemanas.seleccionarPeriodo(parametro)
                    peticionSemanas.peticionMeses()
                    peticionSemanas.DeletePeriodo()
                }} style={{ background: peticionSemanas.botonreporte.trimestres? '#F6B232': '#03508f'}}>TRIMESTRAL</Button>
            <Button className={styles.botonReportes} onClick={()=>{
                    var parametro = 'Semestres'
                    peticionSemanas.seleccionarPeriodo(parametro)
                    peticionSemanas.peticionMeses()
                    peticionSemanas.DeletePeriodo()
                }} style={{ background: peticionSemanas.botonreporte.semestres? '#F6B232': '#03508f'}}>SEMESTRAL</Button>
            </CardActions>
        </Card>
    )
}
const drawerWidth = 15;
const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: '30%',
        height: '40%',
        minHeight:'300px',
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
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection:'row-reverse',
    alignItems: 'center',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-evenly',
    width:'100%'
}));