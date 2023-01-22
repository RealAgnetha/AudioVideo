import MemeData from "./components/MemeData";
import {MyComponent} from "./components/MyComponent.js";
import GifPlayer from "./components/GifPlayer";
//import {Test} from "./Test.js";
import React, { useState, useCallback } from 'react';

function App() {

    const [isPlaying, setIsPlaying] = useState(false);
    // const handleClick = useCallback(() => setIsPlaying(prevState => !prevState),[]);


    return (
        <div className="App">
            <MyComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <MemeData isPlaying={isPlaying} />
        </div>
    );
}

export default App;
