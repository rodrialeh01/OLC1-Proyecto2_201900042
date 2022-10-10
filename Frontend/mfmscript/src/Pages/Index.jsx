import React from "react";
import EditordeTexto from "../Components/EditordeTexto";
import Consola from "../Components/Consola";
import NavBar from "../Components/NavBar";
import '../Components/NavBarStyle.css'

function Index(){
    
    return(
        <>
        <div className="wrapper">
        <NavBar></NavBar>
        <EditordeTexto></EditordeTexto>
        <Consola></Consola>
        </div>
        </>
    )
}

export default Index;