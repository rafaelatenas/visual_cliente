import React from "react";
import logoatenas from '../../landing/Images/ats_logo-atenas.png';
import './componentes.css';

class Header extends React.Component{
    render(){
        return(
            <header className="logo">
                <img src={logoatenas}alt="Atenas Logo"></img>
            </header >
        )
    }

}

export default Header;