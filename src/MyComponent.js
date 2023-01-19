import React, {useRef, useEffect, useState} from 'react';
import './css/styles.css';

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

    const [img, setImg] = useState(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const progressBarStyle = {
        width: `${progress}%`,
    };

    let intervalId;

    const handleDrop = (e) => {
        e.preventDefault();
        const img = document.createElement('img');
        img.src = e.dataTransfer.getData('text/plain');

        // Get the position of the canvas element
        const canvasRect = canvasRef.current.getBoundingClientRect();

        // Calculate the position on the canvas where the image should be inserted
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;
        const width = img.width;
        const height = img.height;

        setImg(img);
        setX(x);
        setY(y);
        setWidth(width);
        setHeight(height);

    }

    useEffect(() => {
        if (!img) {
            return;
        }
        // clear the interval when component unmount or component update.
        return () => clearInterval(intervalId);
    }, [img]);

    useEffect(() => {
        if (!img) {
            return;
        }
        // Set interval for the gif
        intervalId = setInterval(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.drawImage(img, x, y, width, height);
        }, 50);
    }, [img, x, y, width, height]);

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

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    }

    return (
        <div
            ref={wrapperRef}
            className="wrapper-video"
        >
            <div className="file_select">
                {!fileSelected && (
                    <label>Upload your video: </label>
                )}
                {fileSelected && (
                    <label>Upload new video: </label>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    style={{zIndex: 2}}
                    onChange={handleFileSelect}
                />
            </div>
            <canvas
                ref={canvasRef}
                className={`canvas-style ${fileSelected ? 'file-selected' : 'file-not-selected'}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
                width={videoRef.current ? videoRef.current.offsetWidth : 0}
                height={videoRef.current ? videoRef.current.offsetHeight : 0}

            />
            <video
                ref={videoRef}
                className={`video-style ${fileSelected ? 'file-selected' : 'file-not-selected'}`}
                /*controls*/
                onTimeUpdate={handleTimeUpdate} className="video-styles"
            />
            <div className="edit_video"
                 style={{
                     display: fileSelected ? "block" : "none"
                 }}>
                <div
                    ref={progressBarRef}
                    className="progress-bar-style"
                    style={progressBarStyle}
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
