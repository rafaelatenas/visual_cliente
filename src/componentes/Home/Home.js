import React from "react";
import angle_down from '../../landing/favicon/angle-down-solid.svg';
import cerrar from '../../landing/favicon/arrow-right-log-out-solid.svg';
import user_gear from '../../landing/favicon/user-gear-solid.svg';
import atenas_logo from '../../landing/Images/ats_logo-blanco-elises-.png';
import logo_atenas from '../../landing/Images/ats_logo-elise-blanca.png';
import canales from '../../landing/Images/logo_canales-cadenas.jpg';
import './home.css';
import './movil';

class Home extends React.Component {
 
    componentDidMount(){
        var elements_menu = [
            0,
            1,
            2,
            3,
            4,
        ]
       
        var boton = [
            document.getElementById('menu_1'),
            document.getElementById('menu_2'),
            document.getElementById('menu_3'),
            document.getElementById('menu_4'),
            document.getElementById('menu_5')
        ]
        const elemento_desplegable = document.getElementsByClassName("deplegable");

        boton.forEach(item => {
            item.addEventListener('click',()=>{
                for (const j of elements_menu) {

                    var valor_boton = Array.from(item.id);
                    var valor_desplegable = Array.from(elemento_desplegable[j].id)
                    var comparador = valor_boton[5] === valor_desplegable[12];
                    var valor_elemento = elemento_desplegable[j].style.display;
                   
                    if (valor_elemento === "none" & comparador === true) {

                        elemento_desplegable[j].style.display = "block"
                    
                                const image_container = document.querySelectorAll('.image-container');
                                for (let w = 0; w < image_container.length; w++) {
                                    if (w===j) {
                                        elemento_desplegable[j].style.width=`${image_container[w].clientWidth}px`
                                        elemento_desplegable[j].style.left =`${image_container[w].getBoundingClientRect().left}px`  
                                    }
                                }
                                console.log(elemento_desplegable[j])
                                elemento_desplegable[j].animate([
                                    { opacity: '0' },
                                    { opacity: '1' }
                                ], {
                                    duration: 1000,
                                    fill: 'forwards',
                                });
                                console.log(boton[j])
                                boton[j].animate(
                                    [
                                        { transform: 'rotate(0deg)' },
                                        { transform: 'rotate(180deg)' }
                                    ], {
                                        duration: 700,
                                        fill: 'forwards'
                                    });
                    
                    
                    }else if (valor_elemento === "block") {
                        boton[j].animate(
                            [
                                { transform: 'rotate(180deg)' },
                                { transform: 'rotate(0deg)' }
                            ], {
                                duration: 700,
                                fill: 'forwards'
                            });
                        elemento_desplegable[j].animate([
                            { opacity: '1' },
                            { opacity: '0' }
                        ], {
                            duration: 1000,
                            fill: 'forwards',
                        })
                        setTimeout(() => {
                            elemento_desplegable[j].style.display = 'none'
                        }, 1000);
                    }
                }
             
            })
            
        });
        
        const opciones_usuario = document.getElementById('opciones_usuario');
        const contenedoropciones = document.getElementById('contenedoropciones');
        var contadorClick;
        var acumuladorClik = 0;

        opciones_usuario.addEventListener('click',()=>{

            acumuladorClik = acumuladorClik +1;
            contadorClick = contadorClick++;
            let iterador = acumuladorClik%2

            switch (iterador) {
                case 1:
                    contenedoropciones.animate([
                        {transform: 'scale(1)'}
                    ],
                    {
                        fill:'forwards',
                        duration:1200
                    }
                    )
                    document.querySelector('section').addEventListener('click', () => {
                        contenedoropciones.animate([
                            {transform: 'scale(0)'}
                        ],
                            {
                                fill:'forwards',
                                duration:1200
                            }
                        )
                    });
                    document.querySelector('footer').addEventListener('click', () => {
                        contenedoropciones.animate([
                            {transform: 'scale(0)'}
                        ],
                            {
                                fill:'forwards',
                                duration:1200
                            }
                        )
                    })
                    break;
            
                case 0:
                    contenedoropciones.animate([
                        {transform: 'scale(0)'}
                    ],
                    {
                        fill:'forwards',
                        duration:1200
                    }
                    )
                    break;
                    default:
                        break;   
            }
            console.log(contenedoropciones.style.transform)
            document.querySelector('section').addEventListener('click', () => {
                contenedoropciones.animate([
                    {transform: 'scale(0)'}
                ],
                    {
                        fill:'forwards',
                        duration:1200
                    }
                )
            });
            document.querySelector('footer').addEventListener('click', () => {
                contenedoropciones.animate([
                    {transform: 'scale(0)'}
                ],
                    {
                        fill:'forwards',
                        duration:1200
                    }
                )
            })
        });

        //--- Redireccionar a información de los servicios---//

        var prueba = [
            "Canales y Cadenas",
            "NSE",
            "Top Sku`s ",
            "Top Proveedores",
            "Categoría",
            "Ranking Categorías",
            "Omnibus",
            "valor 8",
            "valor 9",
        ]
        
        const slide = document.querySelectorAll(".slide")
        var texto_modal = document.getElementById('texto_modal')
        var modal = document.getElementById('modal')
        
        
        for (const iterador_slide of slide) {
            
            iterador_slide.addEventListener('click', () => {
                
                setTimeout(() => {
                    modal.style.display = "block"
                }, 500);
        
                for (const j of elements_menu) {
                    const elemento_desplegable = document.getElementsByClassName("deplegable");
        
                    var valor_elemento = elemento_desplegable[j].style.display;
        
                    if (valor_elemento === "block") {
                        boton[j].animate(
                            [
                                { transform: 'rotate(180deg)' },
                                { transform: 'rotate(0deg)' }
                            ], {
                                duration: 700,
                                fill: 'forwards'
                            });
                        elemento_desplegable[j].animate([
                            { opacity: '1' },
                            { opacity: '0' }
                        ], {
                            duration: 1000,
                            fill: 'forwards',
                        })
                        setTimeout(() => {
                            elemento_desplegable[j].style.display = 'none'
                        }, 1000);
                    }
                }
        
                for (let n = 0; n < prueba.length; n++) {
                    const elemento = n + 1;
                    var valor_imagen = iterador_slide.children[0].dataset.icon

                    if (`${valor_imagen}` === `${elemento}`) {
                        var p;
                        p = document.createElement('p');
                        p.classList = "prueba";
                        p.innerHTML = prueba[n];
                        texto_modal.appendChild(p);
                      
                    }
                    const numero_hijo = texto_modal.childElementCount;
                    if ((numero_hijo > 1)) {
                        texto_modal.removeChild(texto_modal.children[0]);
                    }
                }
            })
        
        
            const cerrar = document.getElementById('cerrar');
        
            cerrar.addEventListener('click', () => {
                
                setTimeout(() => {
                    modal.style.display = 'none'
                }, 500);
        
                modal.animate([
        
                    { opacity: '1' },
                    { opacity: '0' }
        
                ], {
        
                    duration: 500,
                    fill: 'forwards',
        
                })
        
                let childrenElements = texto_modal.childElementCount;
                const P = document.querySelector('.prueba')
                switch (childrenElements) {
        
                    case 1:
                        setTimeout(() => {
        
                            texto_modal.removeChild(P);
        
                        }, 500);
                        break;
                    default:
                        break;
                }
            })
        
        
            document.querySelector('section').addEventListener('click', () => {
        
                modal.style.display = "none"
        
            })
            document.querySelector('header').addEventListener('click', () => {
        
                modal.style.display = "none"
        
            })
        }

      //-- -- --carousel de animación footer-- -- -- //
        const pausa = document.querySelector(".slider");
        const slide_track = document.getElementById("slide-track");
        slide_track.style.width = `${window.screen.width*3}px`
        pausa.addEventListener('mouseover', () => {
            slide_track.style.animationPlayState = "paused"
        });
        pausa.addEventListener('mouseout', () => {
            slide_track.style.animationPlayState = "running"
        });  

    }
	render() {
 
		return(

            <>
             <header>
                <div className='components-header'>
                    <img className='logo-atenas' src={logo_atenas} alt="Logo Atenas"></img>
                    <img className='Logo-atenas' src={atenas_logo} alt="Logo Atenas"></img>
                    <div id="opciones_usuario" className='opciones'>
                        <button>
                            <img src={user_gear} alt="Cerrar"></img>
                        </button>
                    </div>
                    <div id="contenedoropciones" className="contenedoropciones">
                        <button>
                            <a href="../login/login"> <img src={cerrar} alt="Cerrar"></img> Salir</a>
                        </button>
                        <button>
                            <a href="../login/login"> <img src={cerrar} alt="Cerrar"></img>Contraseña</a>
                        </button>
                    </div>
                        
                    <div className='content-user'>
                    </div>
                </div>
            </header>
            <section className="container">
                <article className="gallery">
                    <div className="gallery-container">
                        <div className="gallery-item gallery-item-1" data-index="1" id="wop">
                            <button id="img_1" className="image-container"></button>
                            <img id="menu_1" src={angle_down} alt="Show Menu"></img>
                        </div>

                        <div className="gallery-item gallery-item-2" data-index="2" id="scanning">
                            <button id="img_2" className="image-container"></button>
                            <img id="menu_2" src={angle_down} alt="Show Menu"></img>
                        </div>

                        <div className="gallery-item gallery-item-3" data-index="3" id="home_pantry">
                            <button id="img_3" className="image-container"></button>
                            <img id="menu_3" src={angle_down} alt="Show Menu"></img>
                        </div>

                        <div className="gallery-item gallery-item-4" data-index="4" id="execution">
                            <button id="img_4" className="image-container"></button>

                            <img id="menu_4" src={angle_down} alt="Show Menu"></img>
                        </div>

                        <div className="gallery-item gallery-item-5" data-index="5" id="CI">
                            <button id="img_5" className="image-container"></button>

                            <img id="menu_5" src={angle_down} alt="Show Menu"></img>
                        </div>
                    </div>
                    <div className="gallery-controls"></div>
                </article>

                <aside style={{display:'none'}} className="deplegable" id="despelgable_1">
                    <div className="container-desplegable">
                        <div className="content-desplegable">
                            <div id="elementsWOP"></div>

                        </div>
                    </div>
                </aside>

                <aside style={{display:'none'}} className="deplegable" id="despelgable_2">
                    <div className="container-desplegable">
                        <div className="content-desplegable">
                            <div id="elementsRSc"></div>
                        </div>
                    </div>
                </aside>

                <aside style={{display:'none'}} className="deplegable" id="despelgable_3">
                    <div className="container-desplegable">
                        <div className="content-desplegable">
                            <div id="elementsHP"></div>
                        </div>
                    </div>
                </aside>

                <aside style={{display:'none'}} className="deplegable" id="despelgable_4">
                    <div className="container-desplegable">
                        <div className="content-desplegable">
                            <div id="elementsExc"></div>

                        </div>
                    </div>
                </aside>

                <aside style={{display:'none'}} className="deplegable" id="despelgable_5">
                    <div className="container-desplegable">
                        <div className="content-desplegable">
                            <div id="elementsCI"></div>

                        </div>
                    </div>
                </aside>
            </section>
            
            <aside id="modal"  style={{display:'none'}}>
                <img id="cerrar" src="/landing/favicon/times-solid.svg" alt="Cerrar Modal"></img>
                <section id="texto_modal"></section>
            </aside> 

             <footer>
                <div id="barUser" className="bar-user">
                    <img src="" alt=""></img>
                </div>
                <div className="modificables">
                    <div className="log_out">
                        <svg id="log_out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/>
                        </svg>
                    </div>
                    <div className="home">
                        <svg id="GOhome" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" className="svg-inline--fa fa-home fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path fill="" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3
                            0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12
                            12 0 0 0-1.7-16.93z">
                        </path>
                    </svg>
                    </div>
                    <div className="config">
                        <svg id="config" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path d="M425.1 482.6c-2.303-1.25-4.572-2.559-6.809-3.93l-7.818 4.493c-6.002 3.504-12.83 5.352-19.75 5.352c-10.71 0-21.13-4.492-28.97-12.75c-18.41-20.09-32.29-44.15-40.22-69.9c-5.352-18.06
                            2.343-36.87 17.83-45.24l8.018-4.669c-.0664-2.621-.0664-5.242 0-7.859l-7.655-4.461c-12.3-6.953-19.4-19.66-19.64-33.38C305.6 306.3 290.4 304 274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512H413.3c5.727 0 10.9-1.727
                            15.66-4.188c-2.271-4.984-3.86-10.3-3.86-16.06V482.6zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM610.5 373.3c2.625-14 2.625-28.5 0-42.5l25.75-15c3-1.625 4.375-5.125 3.375-8.5c-6.75-21.5-18.25-41.13-33.25-57.38c-2.25-2.5-6-3.125-9-1.375l-25.75
                            14.88c-10.88-9.25-23.38-16.5-36.88-21.25V212.3c0-3.375-2.5-6.375-5.75-7c-22.25-5-45-4.875-66.25 0c-3.25 .625-5.625 3.625-5.625 7v29.88c-13.5 4.75-26 12-36.88 21.25L394.4 248.5c-2.875-1.75-6.625-1.125-9 1.375c-15 16.25-26.5 35.88-33.13
                            57.38c-1 3.375 .3751 6.875 3.25 8.5l25.75 15c-2.5 14-2.5 28.5 0 42.5l-25.75 15c-3 1.625-4.25 5.125-3.25 8.5c6.625 21.5 18.13 41 33.13 57.38c2.375 2.5 6 3.125 9 1.375l25.88-14.88c10.88 9.25 23.38 16.5 36.88 21.25v29.88c0 3.375 2.375
                            6.375 5.625 7c22.38 5 45 4.875 66.25 0c3.25-.625 5.75-3.625 5.75-7v-29.88c13.5-4.75 26-12 36.88-21.25l25.75 14.88c2.875 1.75 6.75 1.125 9-1.375c15-16.25 26.5-35.88 33.25-57.38c1-3.375-.3751-6.875-3.375-8.5L610.5 373.3zM496 400.5c-26.75
                            0-48.5-21.75-48.5-48.5s21.75-48.5 48.5-48.5c26.75 0 48.5 21.75 48.5 48.5S522.8 400.5 496 400.5z"/></svg> </div>
                </div>
                <div className="complementary-buttons">

                    <div className="slider">
                        <div id="slide-track" className="slide-track">
                            <div className="slide">
                                <img src={canales} alt="Canales y Cadenas" data-icon="1" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_NSE.jpg" alt="NSE" data-icon="2" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_SKU`s.png" alt="Top Sku`s" data-icon="3" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_TOP-Proveedores.jpg" alt="Top Proveedores" data-icon="4" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_categorias.png" alt="Categorías" data-icon="5" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_ranking_categoria.png" alt="Ranking Categorías" data-icon="6" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_omnibus.png" alt="Omnibus" data-icon="7"/>                        </div>
                            <div className="slide">
                                <img src="../../landing/Images/Icon-Top_Marcas.png" alt="TOP Marcas" data-icon="8" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/Icon-Top_SKU.png" alt="TOP SKU 's" data-icon="9" />
                            </div>
                            <div className="slide">
                                <img src={canales} alt="Canales y Cadenas" data-icon="1" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_NSE.jpg" alt="NSE" data-icon="2" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_SKU`s.png" alt="Top Sku`s" data-icon="3" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_TOP-Proveedores.jpg" alt="Top Proveedores" data-icon="4" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_categorias.png" alt="Categorías" data-icon="5" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_ranking_categoria.png" alt="Ranking Categorías" data-icon="6" />
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/logo_omnibus.png" alt="Omnibus" data-icon="7"/>
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/Icon-Top_Marcas.png" alt="TOP Marcas" data-icon="8"/>
                            </div>
                            <div className="slide">
                                <img src="../../landing/Images/Icon-Top_SKU.png" alt="TOP SKU's" data-icon="9"/>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            
        </>
        )
        
    }
    
}

export default Home;


