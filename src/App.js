import React from 'react';
import MemesComponent from "./MemesComponent";
import {EditorComponent} from "./EditorComponent.js";
import {Header} from './Header';
import './css/styles.css';

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="grid-container">
                <EditorComponent/>
                <MemesComponent/>
            </div>
        </div>
    );

}

export default App;