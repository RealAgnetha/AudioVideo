import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box'
import './css/styles.css';
import { imageListState, timeState} from './atoms';
import { useRecoilState } from 'recoil';


function Meme({ url, name, id }) {
    const [imageList, setImageList] = useRecoilState(imageListState);
    const [displayGif1Initially, setDisplayGif1Initially] = useState(true);
    const [time, setTime] = useRecoilState(timeState);
    const [loadImage, setLoadImage] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    let foundGif;
    let gif;

    function uploadImage(img, id) {
        setLoadImage(true);
        if (img !== null) {
            var image = new Image();
            image.src = img;
            let newArr = [...imageList];
            let scaling = 1;
            if (image.width > 400) scaling = 400 / image.width;
            newArr.push({ "id": id, group: "image", "src": image.src, "x": x, "y": y, width: image.width * scaling, height: image.height * scaling, startTime: 0, endTime: 5000 });
            setImageList(newArr);
            setLoadImage(false);
            setDisplayGif1Initially(false);
        }
    }

    for (let i = 0; i < imageList.length; i++) {
        if (imageList[i].id === id) foundGif = imageList[i];
    }

    if (displayGif1Initially) {
        gif = 
        <Resizable
        width={width}
        height={height}
        minWidth={50}
        minHeight={50}
        maxWidth={200}
        maxHeight={200}>
            <Draggable id={id} position={{ x: x, y: y }}
                onStop={(event, dragElement) => {
                    setX(dragElement.x);
                    setY(dragElement.y);
                    uploadImage(url, id);
                }} style={{ zIndex: 2 }}>
                <img draggable="false" display="inline-block" src={url} alt={name} className="equal-size" />
            </Draggable>
        </Resizable>
    } else {
        if (foundGif != null && time > foundGif.startTime && time < foundGif.endTime) {
            gif = 
            <Resizable
                width={width}
                height={height}
                minWidth={50}
                minHeight={50}
                maxWidth={200}
                maxHeight={200}>
            <Draggable id={id} position={{ x: x, y: y }}
                onStop={(event, dragElement) => {
                    setX(dragElement.x);
                    setY(dragElement.y);
                }} style={{ zIndex: 2 }}>
                <img draggable="false" display="inline-block" src={url} alt={name} className="equal-size" />
            </Draggable>
            </Resizable>
        } else {
            gif = <div />
        }
    }

    return (
        <div className="cell">
            {gif}
        </div>
    );
}

export default Meme;
