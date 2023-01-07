import React, {useRef, useEffect, useState} from 'react';

let videoWidth;
let videoHeight;

const MyComponent = () => {
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const progressBarRef = useRef(null);
    const [fileSelected, setFileSelected] = useState(false) //when file has been selected, change state
    const [isPlaying, setIsPlaying] = useState(false); // state for play/pause button
    const [progress, setProgress] = useState(0); // current progress of the video, in percent
    const [isDragging, setIsDragging] = useState(false); // flag to indicate if progress bar is being dragged


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

    //stellt sicher, dass canvas in der richtigen groesse geladen wird nachdem video fertig geladen ist
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) {
            return;
        }

        // Set the width and height of the canvas to the offsetWidth and offsetHeight of the video
        canvas.width = video.offsetWidth;
        canvas.height = video.offsetHeight;

        // Add an event listener for the 'loadedmetadata' event of the video
        video.addEventListener("loadedmetadata", () => {
            // Set the width and height of the canvas to the offsetWidth and offsetHeight of the video
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
        });
    }, [videoRef, canvasRef]);

    const handleTimeUpdate = () => {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    };

    const handleProgressBarClick = (e) => {
        const percent = (e.clientX - progressBarRef.current.offsetLeft) / progressBarRef.current.offsetWidth;
        videoRef.current.currentTime = percent * videoRef.current.duration;
    };

    const handleProgressBarMouseDown = () => {
        setIsDragging(true);
    };

    const handleProgressBarMouseUp = () => {
        setIsDragging(false);
    };

    const handleProgressBarMouseMove = (e) => {
        if (!isDragging) {
            return;
        }
        const percent = (e.clientX - progressBarRef.current.offsetLeft) / progressBarRef.current.offsetWidth;
        videoRef.current.currentTime = percent * videoRef.current.duration;
    };

    return (
        <div
            ref={wrapperRef}
            className="wrapper"
            style={{width: "60%", height: "56.25%", float: "left", position: "relative"}}
        >
            {!fileSelected && (
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    style={{zIndex: 2}}
                    onChange={handleFileSelect}
                />
            )}
            <canvas
                ref={canvasRef}
                width={videoRef.current ? videoRef.current.offsetWidth : 0}
                height={videoRef.current ? videoRef.current.offsetHeight : 0}
                style={{
                    zIndex: 2,
                    position: "absolute",
                    display: fileSelected ? "block" : "none",
                }}
            />
            <video
                ref={videoRef}
                /*controls*/
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    display: fileSelected ? "block" : "none",
                }}
                onTimeUpdate={handleTimeUpdate}
            />

            <div className="edit_video"
                 style={{
                     display: fileSelected ? "block" : "none", padding: "20px"
                 }}>
                <div
                    ref={progressBarRef}
                    className="progress-bar"
                    style={{
                        width: `${progress}%`,
                        height: "10px",
                        backgroundColor: "#444444",
                        position: "relative",
                        bottom: "10px",
                        left: 0,
                        cursor: "pointer",
                    }}
                    onMouseDown={handleProgressBarMouseDown}
                    onMouseMove={handleProgressBarMouseMove}
                    onMouseUp={handleProgressBarMouseUp}
                    onMouseLeave={handleProgressBarMouseUp}
                    onClick={handleProgressBarClick}
                />
                {!isPlaying && (
                    <button onClick={handlePlayClick}>Play</button>
                )}
                {isPlaying && (
                    <button onClick={handlePauseClick}>Pause</button>
                )}

            </div>
        </div>
    );

};

export {MyComponent};
