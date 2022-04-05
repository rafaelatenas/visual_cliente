import React from "react";
import './admin.css';
import MenuAdmin from "./componentesAdmin/menuAdmin";

class Admin extends React.Component {
        
    render(){
        
        return(
            <><section className="cuerpo-modificable">
                
            </section>
            <MenuAdmin/>
            </>
                // <script src="https://cdn.datatables.net/v/dt/dt-1.11.5/datatables.min.js"></script>
            
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

