import React, {useRef, useEffect} from 'react';

let videoWidth;
let videoHeight;

const MyComponent = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

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

    return (
        <div className="wrapper">
            <video ref={videoRef}
                   style={{position: "absolute", width:"100%"}}/>
                <canvas ref={canvasRef} width={videoWidth} height={videoHeight}
                        style={{zIndex: 1, position: "absolute", width:"100%"}}/>
        </div>
    )


}
export {MyComponent};
