import React from "react";
import Editor from "@monaco-editor/react"
import { useState } from "react";
import { useRef } from "react";

function EditordeTexto(){
    const[contentLanguaje, setContentLanguaje] = useState('')
    const editorRef = useRef(null)

    const handleEditorDidMount = (editor, monaco)=>{
        editorRef.current = editor
    }

    const handleSave= ()=>{
        console.log(editorRef.current.getValue())
    }
    return(
        <div style={{width:'50%', float:'left'}}>
        <Editor
            height='100vh'
            theme='vs-dark'
            defaultLanguage='java'
            value='//Welcome :D, Start your code here...'
            onChange={(value) => setContentLanguaje(value)}
            onMount={handleEditorDidMount}
        />
        </div>
    )
}

export default EditordeTexto