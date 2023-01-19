import React from 'react';
import './css/styles.css';

class Meme_Data extends React.Component {
    handleDrag = (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    }

    render = () => {
        return (
            <div>
                <h1>Memes</h1>
                <div className="wrapper-memes">

                    <img src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat"
                         draggable={true}
                         className="equal-size" onDragStart={this.handleDrag}/>
                    <img src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses"
                         draggable={true}
                         className="equal-size" onDragStart={this.handleDrag}/>
                    <img src="https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif" alt="Cat that goes OMG"
                         draggable={true}
                         className="equal-size" onDragStart={this.handleDrag}/>
                    <img src="https://media.giphy.com/media/Rhhr8D5mKSX7O/giphy.gif" alt="Judge Judy judging you"
                         draggable={true}
                         className="equal-size" onDragStart={this.handleDrag}/>
                    <img src="https://media.giphy.com/media/F3BeiZNq6VbDwyxzxF/giphy.gif" alt="Stanley from The Office"
                         draggable={true} className="equal-size" onDragStart={this.handleDrag}/>
                </div>
            </div>
        );
    }
}

export default Meme_Data;
