import React, {useEffect, useRef} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import Draggable from 'react-draggable';
import GifPlayer from "./GifPlayer";
import './css/styles.css';


function MemesComponent({isPlaying}) {
    const wrapperRef = useRef(null);
    const canvasRef = useRef < HTMLDivElement > null;


    useEffect(() => {
        const ps = new PerfectScrollbar(wrapperRef.current, {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 20,
            thumbMinSize: 30,
            thumbMaxSize: 60,
            thumbColor: '#F5FFFA',
            trackColor: '#F5FFFA'
        });
        return () => ps.destroy();
    }, []);

    const handleDrag = (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    }

    return (
        <div className="right-side">
            <h1>GIFs</h1>
            <div className="wrapper-memes" ref={wrapperRef}>

                {/*TODO
                Hey Paul,
                the reason the boundaries are off for the draggable element is that the bounds prop is set to "canvas".
                The bounds prop expects an object with left, top, right, bottom keys or a string "parent" or "self",
                but it is receiving a string "canvas" which is not a valid value.
                If you want the draggable elements to be constrained to the boundaries of the canvas,
                you should set the bounds to a DOM element or a reference of the canvas element.
                The resolved offsetParent in this case is probably the wrapper or the body even. */}
                <Draggable id="dragGif1" bounds="canvas" offsetParent={canvasRef.current}>
                    <img draggable="false" src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat" className="equal-size"/>
                </Draggable>
                <Draggable bounds={{left: -1200, top: -500, right: -600, bottom: -200}}>
                    <img draggable="false" src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses" className="equal-size" />
                </Draggable>

                <GifPlayer gifUrl="memes/cat2.gif" stillUrl="memes/cat2.gif" isPlaying={isPlaying} />
            </div>
        </div>
    );
}

export default MemesComponent;
