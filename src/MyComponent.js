import React, {useRef, useEffect, useState} from 'react';

let videoWidth;
let videoHeight;

const MyComponent = () => {
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

    const handleTimeUpdate = () => {
        // Calculate the progress of the video, in percent
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progress);
    };

    const handleProgressBarClick = (event) => {
        // Calculate the new time based on the clicked position on the progress bar
        const newTime = (event.clientX - progressBarRef.current.offsetLeft) / progressBarRef.current.offsetWidth;
        videoRef.current.currentTime = newTime * videoRef.current.duration;
    };

    const handleProgressBarMouseDown = () => {
        setIsDragging(true);
    };

    const handleDocumentMouseMove = (event) => {
        if (!isDragging) {
            return;
        }

        // Calculate the new time based on the current mouse position
        const newTime = (event.clientX - progressBarRef.current.offsetLeft) / progressBarRef.current.offset
    }


    return (
        <div className="wrapper">
            {!fileSelected && (
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    style={{ zIndex: 2}}
                    onChange={handleFileSelect}
                />

            )}
            <video ref={videoRef} /*controls*/ style={{ flex: 1, display: fileSelected ? "block" : "none" }}
            onTimeUpdate={handleTimeUpdate}
            />
            <canvas
                ref={canvasRef}
                width={videoWidth}
                height={videoHeight}
                style={{ zIndex: 1, position: "absolute", width: "100%" }}
            />

            <div
                ref={progressBarRef}
                className="progress-bar"
                style={{ width: `${progress}%`, height: "10px", backgroundColor: "blue" }}
                onClick={handleProgressBarClick}
                onMouseDown={handleProgressBarMouseDown}

            />
            <div className="edit_video" style={{ display: fileSelected ? "block" : "none" }}>                {!isPlaying && (
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
