import React from "react";
import './Usuario.css';
import MenuAdmin from "./menuAdmin";
import { $ } from "react-jquery-plugin";
import ListarUsuarios from "../ListarUsuarios";
import CrearUsuario from "./crearUsuario";
// import Swal from "sweetalert2";
// import axios from "axios";
// import withReactContent from 'sweetalert2-react-content';

class Usuario extends React.Component{

    


    componentDidMount(){
        // Inicio de animación del formulario
        var current_fs, next_fs, previous_fs;
        var left, opacity, scale;
        var animating; 

        $(".next").on('click',(function(){
            if(animating) return false;
            animating = true;
            
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
            
            next_fs.show(); 
            current_fs.animate({opacity: 0}, {
                step: function(now, mx) {
                    
                    scale = 1 - (1 - now) * 0.2;
                    
                    left = (now * 50)+"%";
                    opacity = 1 - now;
                    current_fs.css({
                'transform': 'scale('+scale+')',
                'position': 'absolute',
                'top': '15%'
            });
                    next_fs.css({'left': left, 'opacity': opacity});
                }, 
                duration: 800, 
                complete: function(){
                    current_fs.hide();
                    animating = false;
                }, 
                easing: 'easeInOutBack'
            });
        }));

        $(".previous").on('click',(function(){
            if(animating) return false;
            animating = true;
            
            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();
            
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
            
            previous_fs.show(); 
            current_fs.animate({opacity: 0}, {
                step: function(now, mx) {
                    scale = 0.8 + (1 - now) * 0.2;
                    left = ((1-now) * 50)+"%";
                    opacity = 1 - now;
                    current_fs.css({'left': left});
                    previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
                }, 
                duration: 800, 
                complete: function(){
                    current_fs.hide();
                    animating = false;
                }, 
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
        }));

        $(".submit").on('click',(function(){
            return false;
        }))

        // Fin de la animación del formulario

        // Inicio de animación y efecto de despliegue de las opciones de administrador
        const botones = document.querySelectorAll('.boton');
        const contenedores = document.querySelectorAll('.contenedor')
        
            for (let j = 0; j < botones.length; j++) {
                botones[j].addEventListener('click',()=>{

                const HeightCreacion = contenedores[j].clientHeight === 0

                switch (HeightCreacion) {
                    case true:
                        setTimeout(() => {
                            botones[j].style.borderBottomRightRadius= '0em';
                            botones[j].style.borderBottomLeftRadius= '0em';
                        }, 100);

                        contenedores[j].style.borderTopRightRadius= '0em'
                        contenedores[j].style.borderTopLeftRadius= '0em'
                        contenedores[j].style.borderBottomRightRadius= '0.3em'
                        contenedores[j].style.borderBottomLeftRadius= '0.3em'
                   
                      contenedores[j].animate([
                          {height:'75%'},
                      ],{
                          fill:'forwards',
                          duration: 1400
                      });
                      break;

                    case false:
                            setTimeout(() => {
                                botones[j].style.borderBottomRightRadius= '0.3em';
                                botones[j].style.borderBottomLeftRadius= '0.3em';
                            }, 1400);
                      
                      contenedores[j].animate([
                          {height:'0%'},
                      ],{
                          fill:'forwards',
                          duration: 1400
                      });

                      break;
                    
                    default:
                        break;
                }


                const contenedorConsulta = document.querySelector('.contenedor-consultas')
                const botonConsulta = document.querySelector('.consultar')
                const contenedorCreacion = document.querySelector('.contenedor-creacion')
                const botonCreacion = document.querySelector('.crear')

                if (contenedorCreacion.clientHeight > 0) {
                    setTimeout(() => {
                        botonCreacion.style.borderBottomRightRadius= '0.3em';
                        botonCreacion.style.borderBottomLeftRadius= '0.3em';
                    }, 1400);
              
                    contenedorCreacion.animate([
                        {height:'0%'},
                    ],{
                        fill:'forwards',
                        duration: 1400
                    });
                }

                if (contenedorConsulta.clientHeight > 0) {
                    console.log(botones[j])
                    setTimeout(() => {
                        botonConsulta.style.borderBottomRightRadius= '0.3em';
                        botonConsulta.style.borderBottomLeftRadius= '0.3em';
                    }, 1400);
              
                    contenedorConsulta.animate([
                        {height:'0%'},
                    ],{
                        fill:'forwards',
                        duration: 1400
                    });
                }
            })
            }
        // Fin de animación y efecto de despliegue de las opciones de administrador    
    }

    render(){
        return(
            <>
            <div className="Contenedorcompleto">
            <MenuAdmin />
            <section className="contenedor-opciones">
                <article className="boton crear"></article>

                <aside className="contenedor contenedor-creacion">
                    <CrearUsuario/>
                </aside>

                <article className="boton consultar"></article>

                <aside className="contenedor contenedor-consultas">
                    <ListarUsuarios/>
                </aside>

            </section>
            </div>
            </>
            
        )
    }

}

export default Usuario;