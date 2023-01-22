import React, {useState} from 'react';
import '../css/styles.css';
import Draggable from 'react-draggable';
import {MyComponent} from "./MyComponent";
import GifPlayer from "./GifPlayer";

class MemeData extends React.Component {

    // handleDrag = (e) => {
    //     e.dataTransfer.setData('text/plain', e.target.src);
    // }

    render = () => {
        return (
            <div className="wrapperForMemes">
                <p>Memes</p>

                <Draggable id="dragGif1"
                bounds="canvas">
                    <img draggable="false" src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat" className="equal-size"/>
                </Draggable>
                <Draggable bounds="canvas">
                    <img draggable="false" src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses" className="equal-size" />
                </Draggable>
                <GifPlayer
                    gifUrl="memes/cat2.gif" stillUrl="memes/cat2_still.png" isPlaying={this.props.isPlaying} />
            </div>
        );
    }
}

export default MemeData;
