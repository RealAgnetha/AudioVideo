import Draggable from "react-draggable";

function GifPlayer({ gifUrl, stillUrl, isPlaying }) {

    return (
        <>
            <Draggable>
                <img className="equal-size" draggable="false" src={isPlaying ? gifUrl : stillUrl} />
            </Draggable>
        </>
    );
}

export default GifPlayer;
