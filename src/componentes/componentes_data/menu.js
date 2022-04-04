import React from "react";
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
                    <li> <a href="./index.html">Sign Out</a> </li>
                </ul>
            </section>
        )
    }
}
export default menu;
