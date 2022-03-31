import React from "react";
//import '../../landing/Js/administracion';
import './admin.css';


class Admin extends React.Component {

    render(){
        return(
            <>
                <div className="cuerpo-modificable">
                    <div className="bottons-menu">
                        <img style= {{visibility: 'hidden;'}} id="cancel-menu" src="./landing/favicon/times-solid.svg" alt="Cancel Menu Icon"></img>
                        <img style= {{visibility: 'visible;'}} id="abrir-menu" src="./landing/favicon/bars-solid-movile.svg" alt="Menu Icon"></img>
                    </div>
                    <section  style= {{visibility: 'hidden'}} id='aa' className="contenedor-opciones">

                        <article className="boton crear"></article>

                        <aside className="contenedor contenedor-creacion">
                        {/* <table id="example" className="display" width="100%"></table> */}
                        </aside>

                        <article className="boton consultar"></article>

                        <aside className="contenedor contenedor-consultas">
                        <table id="example" className="display" style={{width:'100%'}}></table>

                        </aside>

                    </section>
                </div>
                <section id="mensaje">
                </section>
                <aside id="modal" style= {{display: 'none;'}}>
                    <img id="cerrar" src="/landing/favicon/times-solid.svg" alt="Cerrar Modal"></img>
                    <section id="texto_modal"></section>
                </aside>
                <section className="menu-completo menu_min menu-des" id="menu-des">
                    <div className="usuario-atenas">
                        <img className="logo-atenas" src="./landing/Images/ats_logo.png" alt="Atenas Logo"></img>
                        <p className="texto_desaparece m1 nombre-usuario">Usuario Único</p>
                    </div>
                    <hr style= {{width: '90%', border: 'none;', height:'.35%;', background: '#575756;'}} ></hr>
                    <ul className="lista_menu">
                        <li> 
                            <img  title="Mantenimiento Usuario" src="/landing/favicon/gear-solid.svg" alt="Configuraciones"></img>
                            <div ClassName="tooltip">
                            </div>
                            <p ClassName="texto_desaparece m1">Mantenimiento Usuario</p>
                        </li>
                        <li> 
                            <img src="" alt=""></img>
                            <div ClassName="tooltip">
                            </div>
                            <p ClassName="texto_desaparece m1">Elemento de Lista</p>
                        </li>
                        <li> 
                            <img src="" alt=""></img>
                            <div ClassName="tooltip">
                            </div>
                            <p ClassName="texto_desaparece m1">Elemento de Lista</p>
                        </li>
                        <li> 
                            <img src="" alt=""></img>
                            <div className="tooltip">
                            </div>
                            <p className="texto_desaparece m1">Elemento de Lista</p>
                        </li>
                        <li> 
                            <img src="" alt=""></img>
                            <div className="tooltip">
                            </div>
                            <p className="texto_desaparece m1">Elemento de Lista</p>
                        </li>
                        <li>
                            <img title="Cerrar Sesión" src="./landing/favicon/arrow-right-log-out-solid.svg" alt="Salir"></img>
                        </li>
                    </ul>
                </section>
                <script src="https://cdn.datatables.net/v/dt/dt-1.11.5/datatables.min.js"></script>
            </>
        )
    }
    componentDidMount(){
         const scriptTable = document.createElement("script");
         scriptTable.src = "https://cdn.datatables.net/v/dt/dt-1.11.5/datatables.min.js";
         scriptTable.async = true;
         document.body.appendChild(scriptTable);

         const scriptJquery = document.createElement("script");
         scriptJquery.src = "https://code.jquery.com/jquery-3.6.0.min.js";
         scriptJquery.integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=";
         scriptJquery.crossOrigin ="anonymous"
         scriptJquery.async = true;
         document.body.appendChild(scriptJquery);



         
    }
}
export default Admin