import React, {useRef, useEffect, useState} from 'react';

const Test = () => {
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [fileSelected, setFileSelected] = useState(false) //when file has been selected, change state

    const [img, setImg] = useState(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (!img) {
            return;
        }
        // Set interval for the gif
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        // Set interval to draw gif to canvas every 50 milliseconds
        const id = setInterval(() => {
            context.drawImage(img, x, y, width, height);
        }, 50);
        setIntervalId(id);
    }, [img, x, y, width, height]);


    const handleDrop = (e) => {
        e.preventDefault();
        const newImg = new Image();
        newImg.src = e.dataTransfer.getData('text/plain');

        // Get the position of the canvas element
        const canvasRect = canvasRef.current.getBoundingClientRect();

        // Calculate the position on the canvas where the image should be inserted
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;
        const width = newImg.width;
        const height = newImg.height;

        setImg(newImg);
        setX(x);
        setY(y);
        setWidth(width);
        setHeight(height);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    }

    const handleFileSelect = () => {
        const file = fileInputRef.current.files[0];
        console.log(file); // Log the selected file
        videoRef.current.src = URL.createObjectURL(file);
        console.log(videoRef.current.src); // Log the src of the video element
        setFileSelected(true);
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
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}                width={videoRef.current ? videoRef.current.offsetWidth : 0}
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
            />
        </div>
    );

};

export {Test};
