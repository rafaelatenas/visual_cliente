import React from "react";
// import { $ } from "react-jquery-plugin";
import { Link } from "react-router-dom";
import Logoatenas from "../../../landing/Images/ats_logo.png";
import '../admin.css';



class MenuAdmin extends React.Component{

    componentDidMount(){
          

        const tooltip = document.querySelectorAll('.tooltip')
        const lista = document.querySelector('.lista')
        for (let w = 0; w < lista.children.length; w++) {

            let tooltipTop = (((lista.children[w].getBoundingClientRect().height - tooltip[w].getBoundingClientRect().height)/2) + lista.children[w].getBoundingClientRect().top);
            tooltip[w].style.top = `${tooltipTop}px`;
        }

        const tooltipH = document.querySelector('.tooltipH');
        const headerlogo  = document.querySelector('.header-logo');
        console.log(headerlogo.getBoundingClientRect().height);
        const tooltipHTop = (headerlogo.getBoundingClientRect().height/3)
        tooltipH.style.top = `${tooltipHTop}px`;
    }

    render(){

        return(
            <nav className="sidebar-navigation">
                    <div className="header-logo">
                            <img src={Logoatenas} alt="Logo Atenas"></img>
                            <span className="tooltipH">Panel Administrativo Atenas</span>
                    </div>
                    <ul className="lista">
                        
                        <li>
                            <Link to={'/management/panel/createUser'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#000" d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"/></svg></Link>
                            <span className="tooltip">Gestion de Usuarios</span>
                        </li>
                        <li >
                            <Link to={'/management/panel/createPerfil'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#000" d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z"/></svg></Link>
                            <span className="tooltip">Gestion de Perfiles</span>
                        </li>
                        <li>
                            <Link to={'CreateUser'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/></svg></Link>
                            <span className="tooltip">Contacts</span>
                        </li>
                        <li>
                            <Link to={'CreateUser'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/></svg></Link>
                            <span className="tooltip">Fax</span>
                        </li>
                        <li>
                            <Link to={'/'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/></svg></Link>
                            <span className="tooltip">Cerrar Sesion</span>
                        </li>
                    </ul>
            </nav>
        )
    }

}

export default MenuAdmin;