import React, { useRef } from 'react';
import './css/styles.css';
import Meme from "./Meme";

function MemesComponent() {
    const wrapperRef = useRef(null);

    return (
        <div className="right-side">
            <h1>GIFs</h1>
            <div className="wrapper-memes" ref={wrapperRef}>
                <Meme url={"https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif"}
                    id={0}
                    name={"vibing cat"} />

                <Meme url={"https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif"}
                    id={1}
                    name={"sunglasses"} />

                <Meme url={"https://media.tenor.com/pEMrIYO4dKgAAAAM/is-this-a-pigeon-meme.gif"}
                    id={2}
                    name={"is this a pigeon"} />
            </div>
        </div>
    );
}

export default MemesComponent;
