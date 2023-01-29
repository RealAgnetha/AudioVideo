import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import './css/styles.css';
import { imageListState, timeState, videoListState } from './atoms';
import { useRecoilState } from 'recoil';

function Meme({ url, name, id }) {
    const [imageList, setImageList] = useRecoilState(imageListState);
    const [inInitialState, setInInitialState] = useState(true);
    const [time, setTime] = useRecoilState(timeState);
    const [loadImage, setLoadImage] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [videoList, setVideoList] = useRecoilState(videoListState);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    let foundGif;
    let gif;

    function uploadImage(img, id) {

        //check if the default null-element is still in videoList -> no video has been uploaded -> return
        if (videoList[0].src == null) {
            setX(0);
            setY(0);
        } else {
            //add the image to the imageList
            setLoadImage(true);
            if (img !== null) {
                let image = new Image();
                image.src = img;
                let newArr = [...imageList];
                let scaling = 1;
                if (image.width > 400) scaling = 400 / image.width;
                newArr.push({ "id": id, group: "image", "src": image.src, "x": x, "y": y, width: image.width * scaling, height: image.height * scaling, startTime: time - 1, endTime: time + 5000 });
                setImageList(newArr);
                setLoadImage(false);
                setInInitialState(false);
            }
        }
    }

    //write this meme component on the foundGif variable, if it has been added to the imageList
    for (let i = 0; i < imageList.length; i++) {
        if (imageList[i].id === id) foundGif = imageList[i];
    }

    //if this component is rendered initally or the initalState bool is set to true
    // -> display the image and call uploadImage after it has been dragged from its initial position
    if (inInitialState) {
        gif =
        <Resizable 
            width={width} 
            height={height} 
            onResizeStop={(event, direction, ref, d) => {
                setWidth(width + d.width);
                setHeight(height + d.height);
            }}
        >
            <Draggable id={id}
                position={{ x: x, y: y }}
                onStop={(event, dragElement) => {
                    setX(dragElement.x);
                    setY(dragElement.y);
                    uploadImage(url, id);
                }}
                style={{ zIndex: 2 }}
            >
                <img draggable="false" src={url} alt={name} className="equal-size" />
            </Draggable>
        </Resizable>
    } else {
        //display the following img if it is in the imageList
        //and the current time of the video overlaps with the playtime of the image
        if (foundGif != null && time > foundGif.startTime && time < foundGif.endTime) {
            gif =
            <Resizable 
                width={width} 
                height={height} 
                onResizeStop={(event, direction, ref, d) => {
                    setWidth(width + d.width);
                    setHeight(height + d.height);
                }}
            >
                <Draggable id={id}
                    position={{ x: x, y: y }}
                    onStop={(event, dragElement) => {
                        setX(dragElement.x);
                        setY(dragElement.y);
                    }}
                    style={{ zIndex: 2 }}>
                    <img draggable="false" src={url} alt={name} className="equal-size" />
                </Draggable>
            </Resizable>
        } else {
            if (foundGif != null && (time < foundGif.startTime - 1 || time > foundGif.endTime)) {
                gif = 
                <Resizable 
                    width={width} 
                    height={height} 
                    onResizeStop={(event, direction, ref, d) => {
                        setWidth(width + d.width);
                        setHeight(height + d.height);
                    }}
                >
                    <Draggable id={id} position={{ x: 0, y: 0 }}
                        onStop={(event, dragElement) => {
                            setX(dragElement.x);
                            setY(dragElement.y);
                        }} style={{ zIndex: 2 }}>
                        <img id="hidden" draggable="false" src={url} alt={name} className="equal-size" />
                    </Draggable>
                </Resizable>
            } else {
                //if this component is not found in the imageList set it to its initial state
                setX(0);
                setY(0);
                setInInitialState(true);
            }
        }
    }

    return (
        <div className="cell">
            {gif}
        </div>
    );
}

export default Meme;
