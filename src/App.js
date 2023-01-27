import React, { useState } from 'react';
import {RecoilRoot} from 'recoil';
import Header from './Header';
import { EditorComponent } from "./EditorComponent.js";
import MemesComponents from "./MemesComponents";
import './css/styles.css';

function App() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <RecoilRoot>
                <Header />
                <div className="grid-container">
                    <EditorComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                    <MemesComponents isPlaying={isPlaying} />
                </div>
            </RecoilRoot>
        </div>
    );
}

export default App;
