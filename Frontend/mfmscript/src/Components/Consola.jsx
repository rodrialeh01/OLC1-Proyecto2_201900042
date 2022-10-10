import React from "react";
import './Consola.css';

function Consola(){
    return(
        <div className='consola' id="consola">
            <textarea readOnly  className="texta"></textarea>
        <br /> 
        </div>
    )
}

export default Consola