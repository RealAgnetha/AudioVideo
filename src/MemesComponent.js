import React, { useEffect, useRef } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import './css/styles.css';

function MemesComponent() {
    const wrapperRef = useRef(null);
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

    return (
        <div className="right-side">
            <h1>Memes</h1>
            <div className="wrapper-memes" ref={wrapperRef}>
                <img src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat"
                     draggable={true}
                     className="equal-size img2" onDragStart={handleDrag} />
                <img src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses"
                     draggable={true}
                     className="equal-size" onDragStart={handleDrag} />
                <img src="https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif" alt="Cat that goes OMG"
                     draggable={true}
                     className="equal-size" onDragStart={handleDrag} />
                <img src="https://media.giphy.com/media/Rhhr8D5mKSX7O/giphy.gif" alt="Judge Judy judging you"
                     draggable={true}
                     className="equal-size" onDragStart={handleDrag} />
                <img src="https://media.giphy.com/media/F3BeiZNq6VbDwyxzxF/giphy.gif" alt="Stanley from The Office"
                     draggable={true} className="equal-size" onDragStart={handleDrag} />
            </div>
        </div>
    );
}

export default MemesComponent;
