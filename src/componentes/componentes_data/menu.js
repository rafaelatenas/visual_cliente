import React from "react";
import { Link } from "react-router-dom";
import './componentes.css';
class menu extends React.Component {

    render(){
        return(
            <section className="menu" id="menu-des">
                <ul>
                    <li> <a href="#">ELEMENTO DE LISTA</a> </li>
                    <li> <a href="#">ELEMENTO DE LISTA</a> </li>
                    <li> <a href="#">ELEMENTO DE LISTA</a> </li>
                    <li> <a href="#">ELEMENTO DE LISTA</a> </li>
                    <li> <a href="#">ELEMENTO DE LISTA</a> </li>
                    <li> <Link to={'/'}> Salir </Link></li>
                </ul>
            </section>
        )
    }
}
export default menu;
