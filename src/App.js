import React, { useState, useCallback } from 'react';
import MemesComponent from "./MemesComponent";
import {EditorComponent} from "./EditorComponent.js";
import {Header} from './Header';
import './css/styles.css';

function App() {

    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <Header />
            <div className="grid-container">
                <EditorComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
                <MemesComponent isPlaying={isPlaying}/>
            </div>
        </div>
    );
}

export default App;
