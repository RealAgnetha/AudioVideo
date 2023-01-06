import React, {useRef, useEffect, useState} from 'react';

let videoWidth;
let videoHeight;

const MyComponent = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [fileSelected, setFileSelected] = useState(false) //when file has been selected, change state
    const [isPlaying, setIsPlaying] = useState(false); // state for play/pause button


    useEffect(() => {
        const video = videoRef.current;
        video.style.width = `${video.offsetWidth}px` * 2;
        video.style.height = `${video.offsetHeight}px` * 2;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const drawFrame = () => {
            context.drawImage(video, 0, 0, videoWidth, videoHeight);
            requestAnimationFrame(drawFrame);
        }
        drawFrame();
    }, []);

    const handleFileSelect = () => {
        const file = fileInputRef.current.files[0];
        console.log(file); // Log the selected file
        videoRef.current.src = URL.createObjectURL(file);
        console.log(videoRef.current.src); // Log the src of the video element
        setFileSelected(true);
    };

    const handlePlayClick = () => {
        // When the play button is clicked, play the video and update the state
        videoRef.current.play();
        setIsPlaying(true);
    };

    const handlePauseClick = () => {
        // When the pause button is clicked, pause the video and update the state
        videoRef.current.pause();
        setIsPlaying(false);
    };

    return (
        <div className="wrapper">
            {!fileSelected && ( // Only show the input if the file has not been selected
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                />
            )}
            <video ref={videoRef} controls style={{position: "absolute", width: "100%"}}/>
            <div style={{ position: "relative", zIndex: 1 }}>
                {!isPlaying && (
                    <button onClick={handlePlayClick}>Play</button>
                )}
                {isPlaying && (
                    <button onClick={handlePauseClick}>Pause</button>
                )}
            </div>

            <canvas
                ref={canvasRef}
                width={videoWidth}
                height={videoHeight}
                style={{zIndex: 1, position: "absolute", width: "100%"}}
            />
        </div>
    );
};

export {MyComponent};
