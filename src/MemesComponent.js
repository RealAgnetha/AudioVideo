import React, { useEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import Draggable from 'react-draggable';
import GifPlayer from "./GifPlayer";
import './css/styles.css';
import { imageListState, videoListState, textListState, playState, timeState, editState, zoomState, elementState } from './atoms';
import { useRecoilState } from 'recoil';


function MemesComponent({ isPlaying }) {
    const wrapperRef = useRef(null);
    const canvasRef = useRef < HTMLDivElement > null;
    const [imageList, setImageList] = useRecoilState(imageListState);
    const [displayGif1Initially, setDisplayGif1Initially] = useState(true);
    const [time, setTime] = useRecoilState(timeState);
    const [loadImage, setLoadImage] = useState(false)
    const [x, setX]= useState(0)
    const [y, setY]= useState(0)

    useEffect(() => {
        const ps = new PerfectScrollbar(wrapperRef.current, {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 20,
            thumbMinSize: 30,
            thumbMaxSize: 60,
            thumbColor: '#F5FFFA',
            trackColor: '#F5FFFA'
        });
        return () => ps.destroy();
    }, []);

    const handleDrag = (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    }

    function uploadImage(img, id) {
        setLoadImage(true)
        if (img !== null) {
            var image = new Image();
            image.src = img

            let newArr = [...imageList]
            let scaling = 1
            if (image.width > 400) {
                scaling = 400 / image.width
            }
            newArr.push({ "id": id, group: "image", "src": image.src, "x": x, "y": y, width: image.width * scaling, height: image.height * scaling, startTime: 0, endTime: 5000 })
            setImageList(newArr);
            setLoadImage(false)

            setDisplayGif1Initially(false);
        }
        //setElement(imageList.length)
    }

    /*function shouldimageberendered(gifToRender) {
        let foundGif;
        for (let i = 0; i < imageList.length; i++) {
            if (imageList[i].id == gifToRender) foundGif = imageList[i];
        }

        if (displayGif1Initially || (foundGif != null && time > foundGif.startTime && time < foundGif.endTime)) {
            return "inline-block"
        } else {
            return "none"
        }
    }*/

    let gif1;
    let foundGif;
    for (let i = 0; i < imageList.length; i++) {
        if (imageList[i].id == 0) foundGif = imageList[i];
    }
    if (displayGif1Initially) {
        gif1 = <Draggable id="dragGif1" position={{x: x, y:y}}
                    onStop={(event, dragElement) => {
                            setX(dragElement.x);
                            setY(dragElement.y);
                            uploadImage("https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif", 0);
                        }} style={{zIndex: 2}}>
            <img draggable="false" display="inline-block" src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat" className="equal-size" />
        </Draggable>
    } else {
        if (foundGif != null && time > foundGif.startTime && time < foundGif.endTime) {
            gif1 = <Draggable id="dragGif2" position={{x: x, y:y}}
            onStop={(event, dragElement) => {
                    setX(dragElement.x);
                    setY(dragElement.y);
                }} style={{zIndex: 2}}>
                <img draggable="false" display="inline-block" src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat" className="equal-size" />
            </Draggable>
        } else {
            gif1 = <div />
        }
    }

    //TODO: img2 hack broken, wird immer größer je mehr elemente
    return (
        <div className="right-side">
            <h1>GIFs</h1>
            <div className="wrapper-memes" ref={wrapperRef}>
                {/*<img src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat"*/}
                {/*     draggable={true}*/}
                {/*     className="equal-size img2" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.tenor.com/spSgkqK707kAAAAM/ok-all.gif" alt="thumbs up"*/}
                {/*     draggable={true} className="equal-size" onDragStart={handleDrag}/>*/}


                {/*<img src="https://media.tenor.com/e8O3ysG8kHMAAAAd/dance-dancing.gif" alt="disco kid"*/}
                {/*     draggable={true} className="equal-size" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.tenor.com/8XNZFtwJxscAAAAM/reverse-card-uno.gif" alt="reverse uno card"*/}
                {/*     draggable={true} className="equal-size" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.tenor.com/3QNUdJR3PUgAAAAj/twitch-youngmulti.gif" alt="literally fire"*/}
                {/*     draggable={true} className="equal-size" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.tenor.com/BP70qe8X0J8AAAAM/crycat-crying-cat.gif" alt="crying cat ok"*/}
                {/*     draggable={true} className="equal-size" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.tenor.com/pEMrIYO4dKgAAAAM/is-this-a-pigeon-meme.gif" alt="is this a pigeon"*/}
                {/*     draggable={true} className="equal-size" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses"*/}
                {/*     draggable={true}*/}
                {/*     className="equal-size" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif" alt="Cat that goes OMG"*/}
                {/*     draggable={true}*/}
                {/*     className="equal-size" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.giphy.com/media/Rhhr8D5mKSX7O/giphy.gif" alt="Judge Judy judging you"*/}
                {/*     draggable={true}*/}
                {/*     className="equal-size" onDragStart={handleDrag}/>*/}
                {/*<img src="https://media.giphy.com/media/F3BeiZNq6VbDwyxzxF/giphy.gif" alt="Stanley from The Office"*/}
                {/*     draggable={true} className="equal-size" onDragStart={handleDrag}/>*/}

                {/*<img src="https://media.giphy.com/media/dS1rQkeAlZbmo/giphy.gif" alt="lol dont care"*/}
                {/*     draggable={true} className="equal-size" onDragStart={handleDrag}/>*/}

                {gif1}

                <Draggable bounds={{ width: "60%", height: "56.25%", float: "left", position: "relative" }}>
                    <img draggable="false" src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses" className="equal-size" />
                </Draggable>

                <GifPlayer gifUrl="memes/cat2.gif" stillUrl="memes/cat2_still.png" isPlaying={isPlaying} />
            </div>
        </div>
    );
}

export default MemesComponent;
