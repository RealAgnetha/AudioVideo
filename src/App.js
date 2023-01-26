import React, { useState } from 'react';
import MemesComponents from "./MemesComponents";
import { EditorComponent } from "./EditorComponent.js";
import {RecoilRoot} from 'recoil';import Header from './Header';
import './css/styles.css';
import TimePanel from './Timepanel';

function App() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <RecoilRoot>
                <Header />
                <div className="grid-container">
                    <EditorComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                    <MemesComponents isPlaying={isPlaying} />
                    <TimePanel />
                </div>
            </RecoilRoot>
        </div>
    );
}

export default App;
