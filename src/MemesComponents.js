import React, {useRef} from 'react';
import './css/styles.css';
import Meme from "./Meme";

function MemesComponent() {
    const wrapperRef = useRef(null);

    return (
        <div>
            <h1>GIFs</h1>

            <div className="wrapper-memes"
                 ref={wrapperRef}>

                <Meme url={"https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif"}
                      id={0}
                      name={"vibing cat"}/>
                <Meme url={"https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif"}
                      id={1}
                      name={"sunglasses"}/>
                <Meme url={"https://media.tenor.com/pEMrIYO4dKgAAAAM/is-this-a-pigeon-meme.gif"}
                      id={2}
                      name={"is this a pigeon"}/>
                <Meme url={"https://media.tenor.com/spSgkqK707kAAAAM/ok-all.gif"}
                      id={3}
                      name={"thumbs up"}/>
                <Meme url={"https://media.tenor.com/e8O3ysG8kHMAAAAd/dance-dancing.gif"}
                      id={4}
                      name={"disco kid"}/>
                <Meme url={"https://media.tenor.com/8XNZFtwJxscAAAAM/reverse-card-uno.gif"}
                      id={5}
                      name={"reverse uno card"}/>
                <Meme url={"https://media.tenor.com/3QNUdJR3PUgAAAAj/twitch-youngmulti.gif"}
                      id={6}
                      name={"literally fire"}/>
                <Meme url={"https://media.tenor.com/BP70qe8X0J8AAAAM/crycat-crying-cat.gif"}
                      id={7}
                      name={"crying cat"}/>
                <Meme url={"https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif"}
                      id={8}
                      name={"OMG cat"}/>

                <Meme url={"https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif"}
                      id={9}
                      name={"smort"}/>
                <Meme url={"https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif"}
                      id={10}
                      name={"what now"}/>
                <Meme url={"https://media.giphy.com/media/kaq6GnxDlJaBq/giphy.gif"}
                      id={11}
                      name={"uhhhh"}/>
                <Meme url={"https://media.giphy.com/media/Um3ljJl8jrnHy/giphy.gif"}
                      id={12}
                      name={"poof"}/>
                <Meme url={"https://media.giphy.com/media/cF7QqO5DYdft6/giphy.gif"}
                      id={13}
                      name={"destroyed"}/>
                <Meme url={" https://media.giphy.com/media/l4Jz3a8jO92crUlWM/giphy.gif"}
                      id={14}
                      name={"sprinkle"}/>
            </div>
        </div>
    );
}

export default MemesComponent;
