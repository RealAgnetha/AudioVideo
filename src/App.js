import React, { useState } from 'react';
import {RecoilRoot} from 'recoil';
import {Header} from './Header';
import { EditorComponent } from "./EditorComponent.js";
import MemesComponents from "./MemesComponents";
import './css/styles.css';
import TimePanel from "./Timepanel";

function App() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <RecoilRoot>
                <Header />
                <div className="grid-container">
                    <div className="left-element-1">
                        <EditorComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                    </div>
                    <div className="left-element-2">
                        <TimePanel/>
                    </div>
                    <div className="right-element">
                        <MemesComponents isPlaying={isPlaying} />
                    </div>
                </div>
            </RecoilRoot>
        </div>
    );
}

export default App;
