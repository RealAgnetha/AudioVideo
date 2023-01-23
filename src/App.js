// import MemeData from "./components/MemeData";
// import {MyComponent} from "./components/MyComponent.js";
import React, { useState, useCallback } from 'react';
import MemesComponent from "./MemesComponent";
import {EditorComponent} from "./EditorComponent.js";
import GifPlayer from "./GifPlayer";
import Header from './Header';
import './css/styles.css';

function App() {

    const [isPlaying, setIsPlaying] = useState(false);
    // const handleClick = useCallback(() => setIsPlaying(prevState => !prevState),[]);


    return (
        <div className="App">
            {/*<MyComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />*/}
            {/*<MemeData isPlaying={isPlaying} />*/}
            <Header />
            <div className="grid-container">
                <EditorComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
                <MemesComponent isPlaying={isPlaying}/>
            </div>
        </div>
    );
}

export default App;
