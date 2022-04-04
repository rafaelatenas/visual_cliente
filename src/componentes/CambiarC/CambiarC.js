import React from 'react';
import ReactDOM from 'react-dom';
import eye_slash from '../../landing/favicon/eye-slash-solid.svg';
import eye_solid from '../../landing/favicon/eye-solid.svg';
import Login from '../Login/login';
import './CambiarC.css';


class CambiarC extends React.Component{

    render(){
        return(
            <section className='contenedorcambio'>
                <div className='cambiarC'>
                    <article className='encabezado'>

                    </article>
                
                    <form className='formcambio'>
                        <div className='formcontraseña'>
                            <input id='contraseña' type='password' className='contraseña'></input>
                        </div>
                        <div className='formconfirmar'>
                            <input id='confirmar' type='password' className='contraseña confirmar'></input>
                            <img id="solid" onClick={mostrarC} className='eye' src={eye_solid} alt="Mostrar Contraseña"></img>
                            <img  id="slash" onClick={mostrarC} className='eye' style={{visibility:'hidden'}} src={eye_slash} alt="Mostrar Contraseña"></img>    
                        </div>
                        <button onClick={activado} 
                                className='enviarform' 
                                type='submit'>Confirmar</button>
                    </form>  
                </div>
                
                
            </section>
        )
    };
};
export default CambiarC;


function mostrarC() {
    var password = document.getElementById("contraseña");
    var confirmarPass = document.getElementById("confirmar");
    const solid = document.getElementById('solid');
    const slash = document.getElementById('slash');
console.log(password.type)
    if (password.type === "password") {
        password.type = "text";
        confirmarPass.type = "text";
        slash.style.visibility = "visible";
        solid.style.visibility = "hidden"
    }else {
        password.type = "password";
        confirmarPass.type = "password";
        solid.style.visibility = "visible"
        slash.style.visibility = "hidden"
    }
   };
function activado() {
    ReactDOM.render(
        <Login to='./login'/>,
        document.getElementById('root')
    );
}