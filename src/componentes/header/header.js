import cerrar from '../../landing/favicon/arrow-right-log-out-solid.svg';
import atenas_logo from '../../landing/Images/ats_logo-blanco-elises-.png';
import logo_atenas from '../../landing/Images/ats_logo-elise-blanca.png';
import './header.css';
function header() {
    return(
    <header>
            <div className='components-header'>
                <img className='logo-atenas' src={logo_atenas} alt="Logo Atenas"></img>
                <img className='Logo-atenas' src={atenas_logo} alt="Logo Atenas"></img>
                <div id="opciones_usuario" className='cerrarsession'>
                    <button>
                        <a href="../login/login"> <img src={cerrar} alt="Cerrar"></img> Cerrar</a>
                    </button>
                </div>
                
                <div className='content-user'>
                </div>
        </div>
    </header>
    
    )
}
export default header;
