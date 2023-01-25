import React, {useRef, useEffect, useState, useCallback} from 'react';

const EditorComponent = React.memo(({ isPlaying, setIsPlaying }) => {
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const progressBarRef = useRef(null);
    const [fileSelected, setFileSelected] = useState(false) //when file has been selected, change state
    // const [isPlaying, setIsPlaying] = useState(false); // state for play/pause button
    const [progress, setProgress] = useState(0); // current progress of the video, in percent
    const [isDragging, setIsDragging] = useState(false); // flag to indicate if progress bar is being dragged

    const [img, setImg] = useState(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    let intervalId;

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

    const handlePlayClick = useCallback(() => {
        if (!isPlaying){
            videoRef.current.play();

        }
        else if (isPlaying) {
            videoRef.current.pause();
        }
        setIsPlaying(prevState => !prevState);
    });

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

    return (
        <div className="left-side">
            <div ref={wrapperRef} className="wrapper-video">
                <canvas
                    ref={canvasRef}
                    className={`canvas-style ${fileSelected ? 'file-selected' : 'file-not-selected'}`}
                    width={videoRef.current ? videoRef.current.offsetWidth : 0}
                    height={videoRef.current ? videoRef.current.offsetHeight : 0}
                />
                <video
                    ref={videoRef}
                    className={`video-styles ${fileSelected ? 'file-selected' : 'file-not-selected'}`}
                    /*controls*/
                />
                <div className="edit_video"
                     style={{
                         display: fileSelected ? "block" : "none"
                     }}>

                    {!isPlaying && (
                        <button onClick={handlePlayClick}>Play</button>
                    )}
                    {isPlaying && (
                        <button onClick={handlePlayClick}>Pause</button>
                    )}
                </div>
            </div>
            <div className="file-select">
                {!fileSelected && (
                    <label htmlFor="fileInput">Upload your video </label>
                )}
                {fileSelected && (
                    <label htmlFor="fileInput">Upload new video </label>
                )}
                <input
                    id="fileInput"
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    style={{zIndex: 2}}
                    onChange={handleFileSelect}
                />
            </div>
        </div>
    );

});

export {EditorComponent};