import React, {useEffect, useRef} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import './css/styles.css';
import PropTypes from 'prop-types';

function MemesComponent(props) {
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

    const handleDrop = (e) => {
        e.preventDefault();
        const img = document.createElement('img');
        img.src = e.dataTransfer.getData('text/plain');
        console.log('handleDrop function called:', img);

        props.handleAddLayer(img);
    }

    //todo img2 hack broken, wird immer größer je mehr elemente
    return (
        <div className="right-side">
            <h1>GIFs</h1>
            <div className="wrapper-memes" ref={wrapperRef}>
                <img src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat"
                     draggable={true}
                     className="equal-size img2" onDragStart={handleDrag}/>
                <img src="https://media.tenor.com/spSgkqK707kAAAAM/ok-all.gif" alt="thumbs up"
                     draggable={true} className="equal-size" onDragStart={handleDrag}
                onDrop={handleDrop}

                />


                <img src="https://media.tenor.com/e8O3ysG8kHMAAAAd/dance-dancing.gif" alt="disco kid"
                     draggable={true} className="equal-size" onDragStart={handleDrag}                 onDrop={handleDrop}
                />
                <img src="https://media.tenor.com/8XNZFtwJxscAAAAM/reverse-card-uno.gif" alt="reverse uno card"
                     draggable={true} className="equal-size" onDragStart={handleDrag}                 onDrop={handleDrop}
                />
                <img src="https://media.tenor.com/3QNUdJR3PUgAAAAj/twitch-youngmulti.gif" alt="literally fire"
                     draggable={true} className="equal-size" onDragStart={handleDrag}                 onDrop={handleDrop}
                />
                <img src="https://media.tenor.com/BP70qe8X0J8AAAAM/crycat-crying-cat.gif" alt="crying cat ok"
                     draggable={true} className="equal-size" onDragStart={handleDrag}/>
                <img src="https://media.tenor.com/pEMrIYO4dKgAAAAM/is-this-a-pigeon-meme.gif" alt="is this a pigeon"
                     draggable={true} className="equal-size" onDragStart={handleDrag}/>
                <img src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses"
                     draggable={true}
                     className="equal-size" onDragStart={handleDrag}/>
                <img src="https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif" alt="Cat that goes OMG"
                     draggable={true}
                     className="equal-size" onDragStart={handleDrag}/>
                <img src="https://media.giphy.com/media/Rhhr8D5mKSX7O/giphy.gif" alt="Judge Judy judging you"
                     draggable={true}
                     className="equal-size" onDragStart={handleDrag}/>
                <img src="https://media.giphy.com/media/F3BeiZNq6VbDwyxzxF/giphy.gif" alt="Stanley from The Office"
                     draggable={true} className="equal-size" onDragStart={handleDrag}/>

                <img src="https://media.giphy.com/media/dS1rQkeAlZbmo/giphy.gif" alt="lol dont care"
                     draggable={true} className="equal-size" onDragStart={handleDrag}/>


            </div>
        </div>
    );
}


export default MemesComponent;
