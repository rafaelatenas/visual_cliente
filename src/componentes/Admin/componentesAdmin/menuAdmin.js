import React from "react";
import { $ } from "react-jquery-plugin";
import { Link } from "react-router-dom";
import cerrarSesion from "../../../landing/favicon/arrow-right-log-out-solid.svg";
import Users from "../../../landing/favicon/users-solid.svg";
import Logoatenas from "../../../landing/Images/ats_logo.png";
import '../admin.css';



class MenuAdmin extends React.Component{

    componentDidMount(){
        $('ul li').on('click', function() {
            $('li').removeClass('active');
            $(this).addClass('active');
        });
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
                            <img src={Logoatenas}></img>
                            <span className="tooltipH">Panel Administrativo Atenas</span>
                    </div>
                    <ul className="lista">
                        
                        <li className="active">
                            <Link to={'/management/panel/createUser'}><img src={Users}></img></Link>
                            <span className="tooltip">Gestion de Usuarios</span>
                        </li>
                        <li>
                            <Link to={'CreateUser'}><img src={cerrarSesion}></img></Link>
                            <span className="tooltip">Devices</span>
                        </li>
                        <li>
                            <Link to={'CreateUser'}><img src={cerrarSesion}></img></Link>
                            <span className="tooltip">Contacts</span>
                        </li>
                        <li>
                            <Link to={'CreateUser'}><img src={cerrarSesion}></img></Link>
                            <span className="tooltip">Fax</span>
                        </li>
                        <li>
                            <Link to={'/'}><img src={cerrarSesion}></img></Link>
                            <span className="tooltip">Cerrar Sesion</span>
                        </li>
                    </ul>
            </nav>
        )
    }

}

export default MenuAdmin;