import React from 'react';
import './css/styles.css';

class Meme_Data extends React.Component {
    handleDrag = (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    }

    render = () => {
        return (
            <div className="wrapperForMemes">
                <p>Memes</p>
                <img src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat" draggable={true} className="equal-size" onDragStart={this.handleDrag} />
                <img src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses" draggable={true} className="equal-size" onDragStart={this.handleDrag} />
            </div>
        );
    }
}

export default Meme_Data;
