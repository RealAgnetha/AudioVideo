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
                    <EditorComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                    <MemesComponents isPlaying={isPlaying} />
                    <TimePanel
                        style={{
                           margin: "-50px"
                        }}/>
                </div>
            </RecoilRoot>
        </div>
    );
}

export default App;
