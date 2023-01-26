import React, {useCallback, useEffect, useRef, useState} from 'react';
import {playState, timeState, videoListState, zoomState} from './atoms';
import {useRecoilState} from 'recoil';
import TimePanel from './Timepanel';


const EditorComponent = React.memo(({isPlaying, setIsPlaying}) => {
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [fileSelected, setFileSelected] = useState(false) //when file has been selected, change state
    const [progress, setProgress] = useState(0); // current progress of the video, in percent
    const [videoList, setVideoList] = useRecoilState(videoListState);
    const [img, setImg] = useState(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [play, setPlay] = useRecoilState(playState);
    const [time, setTime] = useRecoilState(timeState);
    const [zoom, setZoom] = useRecoilState(zoomState)

    let intervalId;


    useEffect(() => {
        if (!img) return;
        // clear the interval when component unmount or component update.
        return () => clearInterval(intervalId);
    }, [img]);

    useEffect(() => {
        if (!img) return;
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
        const url = URL.createObjectURL(file);
        videoRef.current.src = url;
        // create a hidden video element 
        const video = document.createElement('video');
        // set the file object URL as the src of the video element
        video.src = url;
        // get video/audio duration when it's available
        video.addEventListener('loadedmetadata', () => {
            console.log(`Duration: ${video.duration.toFixed(2)}s`);
            let duration = video.duration * 1000;
            setVideoList([{
                id: 0,
                "src": URL.createObjectURL(fileInputRef.current.files[0]),
                file: fileInputRef.current.files[0],
                duration: duration,
                "x": null,
                "y": null,
                startTime: 0,
                endTime: duration,
                trimmStart: 0.0,
                trimmEnd: 0.0
            }]);
            setZoom(duration);
        });
        setFileSelected(true);
    };

    const handleClick = useCallback(() => {
        if (!isPlaying) {
            videoRef.current.play();
            setPlay(play);
        } else if (isPlaying) {
            videoRef.current.pause();
            setPlay(!play);
        }
        setIsPlaying(prevState => !prevState);
    });

    //stellt sicher, dass canvas in der richtigen groesse geladen wird nachdem video fertig geladen ist
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;
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
        setTime(videoRef.current.currentTime * 1000);
        console.log(videoRef.current.currentTime * 1000);
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
                    id="videoid"
                    ref={videoRef}
                    className={`video-style ${fileSelected ? 'file-selected' : 'file-not-selected'}`}
                    onTimeUpdate={handleTimeUpdate}
                />


                <div className="controls-container"
                     style={{
                         display: fileSelected ? "block" : "none"
                     }}>
                    {!isPlaying && (
                        <button onClick={handleClick}>Play</button>
                    )}
                    {isPlaying && (
                        <button onClick={handleClick}>Pause</button>
                    )}
                </div>
                <TimePanel
                    style={{
                        display: fileSelected ? "block" : "none"
                    }}/>
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