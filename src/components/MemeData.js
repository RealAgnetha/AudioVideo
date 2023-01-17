import React from 'react';
import '../css/styles.css';
import Draggable from 'react-draggable';

class MemeData extends React.Component {
    handleDrag = (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    }

    render = () => {
        return (
            <div className="wrapperForMemes">
                <p>Memes</p>
                <Draggable>
                    <img src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat" className="equal-size"/>
                </Draggable>

                {/*<img src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses" draggable={true} className="equal-size" onDragStart={this.handleDrag} />*/}
                {/*<img src="https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif" alt="OMG cat" draggable={true} className="equal-size" onDragStart={this.handleDrag} />*/}
            </div>
        );
    }
}

export default MemeData;
