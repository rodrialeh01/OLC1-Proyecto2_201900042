import React from "react";
import Editor from "@monaco-editor/react"
import { useState } from "react";
import { useRef } from "react";
import './Consola.css';
import './NavBarStyle.css'

function EditordeTexto(){
    const[contentLanguaje, setContentLanguaje] = useState('')
    const editorRef = useRef(null)

    const handleEditorDidMount = (editor, monaco)=>{
        editorRef.current = editor
    }

    const runDev= ()=>{
        console.log(editorRef.current.getValue())
        return editorRef.current.getValue()
    }
    return(
        <>
        <nav className="navbar navbar-icon-top navbar-expand-lg bg-dark" >
        <a className='titulo' style={{color:'white'}}><img  src="https://img.icons8.com/color/60/000000/source-code.png"/> MFMScript</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav ">
            <li className="nav-item">
                <a className="nav-link" href="#">
                <img src="https://img.icons8.com/windows/40/FFFFFF/add-file.png"/>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                <img src="https://img.icons8.com/fluency-systems-filled/40/FFFFFF/import-file.png"/>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                <img src="https://img.icons8.com/fluency-systems-regular/40/FFFFFF/save.png"/>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAACxElEQVRYhc2Yz0tUURTHP3eywIzIjFZCJUltoiHatIjCfmxkkKA2/YD6I4I2bfoDWvQDjElaF62llAqMVpL0g6RF5aIkJQ0ppzTLb4t3B2537pt5dxy1A8Pwzjv33M89c8557wykiKRdku5IGpe0qOwyJalX0uY031EiqSDpRwRASMYk7Y7Z1wRAdgIvgfVW9QkYAeYz+NsDuADTwFFjzIsYKBfmlnO6a5KaItZuDER0SlK+Xpj31smEpLVLWO8D7a21NhfQbbXfo8aYhVgY4FtA1wY8qhWhEExZ97sOEACl6NuAJ5L2x8Asp2wCHqRV2UrDQBKhfkmtKwEzl8FmB3DFV4b6TImkxwwaY47Hkkg6AlwGNni31gCdQIu9HjfGtNdyVrLlOBALkgG0zbYM2UP/IyuaM8aYaeB12v3VSOC00l8VmFRZDZg3wM9MlsuZwM4ezZLO/hcwaZL59SBWlPguAN0k/aUZmASeAfcMfKjtpAGREXQJ3gqU8vkluK4EcPlgBBcEC1VA3M+woOIZ1RAYGxEXZDEA4OsGlFbV9cIImgSjzibzgh7BTUf3VXBQMOgBnWk0zAnv9AWrzwmKgilB3uqaBUOO/UijYfq80xbL4bdA2x3bvIVz7Suf4EuAGfKcywLmPLu84EvA9nAjHwehMu0Btnm6c8CWgG1LI2EmvOtkgIMxT38RuB1Y/7lCs4Sf6ZKXwAece3nBVS+H+h37GcG6EMx3C/M4EqbDdtbyBoO2atxkLVqQbsGcm+xhp9I7CzMZO1HaFu8m5dNA1fR7ILPBSrIwvc5YekMxs3YSieEq7T/UjU+W14emgw7gFc5bPPCc6v9CPDTG9FmgVuAucKwGewk4b+B+9RNK3ZJmAwN8mixI6nIilBOcFowEojFjc6f6mOIBdUrqk/RR0p8MQLOSTlX4gXbBIUFBsC9YNVb+AvXjehvnfNBZAAAAAElFTkSuQmCC"/>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                <img src="https://img.icons8.com/windows/40/FFFFFF/genealogy.png"/>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                <img src="https://img.icons8.com/windows/40/FFFFFF/data-sheet.png"/>
                </a>
            </li>
            <li className="nav-item">
                <a onClick={runDev} role="button">
                <img src="https://img.icons8.com/fluency-systems-filled/50/2ECC71/play.png"/>
                </a>
            </li>
            </ul>
        </div>
        </nav>
        <div id="content" style={{width:'50%', float:'left'}}>
        <Editor
            size='30px'
            height='100vh'
            theme='vs-dark'
            defaultLanguage='java'
            value='//Welcome :D, Start your code here...'
            onChange={(value) => setContentLanguaje(value)}
            onMount={handleEditorDidMount}
        />
        </div>
        <div className='consola' id="consola">
            <textarea readOnly  className="texta"></textarea>
        <br /> 
        </div>
        </>
    )
}

export default EditordeTexto