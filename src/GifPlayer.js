import React from 'react';
import Draggable from "react-draggable";

function GifPlayer({ gifUrl, stillUrl, isPlaying }) {

    return (
        <>
            <Draggable>
                <img className="equal-size" draggable="false" src={isPlaying ? gifUrl : stillUrl}  alt="alt text"/>
            </Draggable>
        </>
    );
}

export default GifPlayer;
