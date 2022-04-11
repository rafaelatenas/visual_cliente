import React from "react";
import { Link } from "react-router-dom";
import './componentes.css';
class menu extends React.Component {

    render(){
        return(
            <section className="menu" id="menu-des">
                <ul>
                    <li> <Link to={'/'}> Salir </Link></li>
                    <li> <Link to={'/'}> Salir </Link></li>
                    <li> <Link to={'/'}> Salir </Link></li>
                    <li> <Link to={'/'}> Salir </Link></li>
                    <li> <Link to={'/'}> Salir </Link></li>
                    <li> <Link to={'/'}> Salir </Link></li>
                </ul>
            </section>
        )
    }
}
export default menu;
