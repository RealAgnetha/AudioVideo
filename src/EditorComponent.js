import React, {useEffect, useRef, useState} from 'react';
import Timeline from 'react-visjs-timeline'

import './css/styles.css';

const EditorComponent = () => {
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const timelineRef = useRef(null);
    //todo hier bin ich
    const [timelineData, setTimelineData] = useState([]);


    const [fileSelected, setFileSelected] = useState(false) //when file has been selected, change state
    const [isPlaying, setIsPlaying] = useState(false); // state for play/pause button
    const [progress, setProgress] = useState(0); // current progress of the video, in percent
    //const [isDragging, setIsDragging] = useState(false); // flag to indicate if progress bar is being dragged
    const [img, setImg] = useState(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [layers, setLayers] = useState([]); // state for layers

    useEffect(() => {
        console.log('layers state:', layers);
        //...
    }, [layers])


    const [isDragging, setIsDragging] = useState(false); // flag to indicate if progress bar is being dragged
    const [selectedLayer, setSelectedLayer] = useState(null); // state for the selected layer
    const timelineStyle = {
        scrollLeft: progress,
    };
    let intervalId;

    const [draggedImage, setDraggedImage] = useState(null);


    const handleDrop = (e) => {
        e.preventDefault();
        const img = document.createElement('img');
        img.src = e.dataTransfer.getData('text/plain');
        setDraggedImage(img);

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
        setLayers([...layers, {img, x, y, width, height}])
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

        videoRef.current.addEventListener('durationchange', () => {
            if (fileSelected && videoRef.current.duration > 0) {
                setTimelineData([{start: 0, end: videoRef.current.duration}]);
            }
        });
    };


    const handlePlayClick = () => {
        // When the play button is clicked, play the video and update the state
        videoRef.current.play();
        setIsPlaying(true);

        //todo timeline:
        const updateTimeline = () => {
            setTimelineData([{start: 0, end: videoRef.current.duration, current: videoRef.current.currentTime}])
        }
        setInterval(updateTimeline, 100)

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

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    }

    const generateTimelineData = () => {
        const duration = videoRef.current.duration;
        const intervals = duration / 10;
        let timelineData = [];
        for (let i = 0; i < intervals; i++) {
            const start = i * 10;
            const end = start + 10;
            timelineData.push({start, end});
        }
        setTimelineData(timelineData);
    }

    const handleTimeUpdate = () => {
        const progress = videoRef.current.progress;
        setProgress(progress);
        setProgress(progress / videoRef.current.duration * 100);
    }

    useEffect(() => {
        if (fileSelected) {
            generateTimelineData();
        }
    }, [fileSelected])
    useEffect(() => {
        if (fileSelected) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
        }
        return () => {
            videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, [fileSelected])


    const [options, setOptions] = useState({});

    useEffect(() => {
        if (fileSelected && videoRef.current.duration > 0) {
            const options = fileSelected && videoRef.current.duration > 0
                ? {
                    width: '100%',
                    height: '200px',
                    stack: false,
                    start: 0,
                    end: videoRef.current.duration,
                    zoomMin: 100,
                    type: 'box',
                }
                : {}

            setTimelineData([{start: 0, end: videoRef.current.duration}]);
            setOptions(options);
        }
    }, [fileSelected]);


    return (
        <div className="left-side">
            <div ref={wrapperRef} className="wrapper-video">
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
                    className={`video-styles ${fileSelected ? 'file-selected' : 'file-not-selected'}`}
                    /*controls*/
                />
                <div className="edit_video"
                     style={{
                         display: fileSelected ? "block" : "none"
                     }}>
                    <Timeline ref={timelineRef}
                              options={options}
                              items={timelineData}
                              clickHandler={() => console.log('clicked')}
                    />

                    {!isPlaying && (
                        <button onClick={handlePlayClick}>Play</button>
                    )}
                    {isPlaying && (
                        <button onClick={handlePauseClick}>Pause</button>
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
};

export {EditorComponent};
