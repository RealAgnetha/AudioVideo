import React from "react";
import Timeline from "timeline-editor-react";
import { Container, Button } from "react-bootstrap";
import CanvasDraw from "./CanvasDraw";
import * as PIXI from 'pixi.js';
import Cursor from "./Cursor";

class AppEditor extends React.Component {
    constructor(props) {
        super(props);

        this.bg = null;
        this.mg = null;
        this.fg = null;

        this.cursor = 0;


        this.state = {
            layers: [
                {
                    id: "3d1df1b4-4d9d-45a4-bf14-cb580ee74675",
                    name: "Hello"
                },
                {
                    id: "7d8c4210-0cfa-4a10-8b21-01e6601e00bf",
                    name: "Goodbye"
                }
            ],
            frames: {
                "3d1df1b4-4d9d-45a4-bf14-cb580ee74675": [
                    {
                        name: "splash",
                        second: 0,
                        duration: 30,
                        tro: "sdas"
                    }
                ],
                "7d8c4210-0cfa-4a10-8b21-01e6601e00bf": [
                    {
                        name: "end",
                        second: 10,
                        duration: 50
                    }
                ]
            }
        };
    }

    add() {
        let cpFrames = this.state.frames;
        cpFrames["3d1df1b4-4d9d-45a4-bf14-cb580ee74675"].push({
            name: "middle",
            second: 35,
            duration: 30
        });
        this.setState({ frames: cpFrames });
    }

    onCanvasReady(mbg, mmg, mfg) {
        console.log("bg:" + this.state.bg + " mbg: " + mbg);
        this.bg = mbg.current;
        this.mg = mmg.current;
        this.fg = mfg.current;
    }

    getCurrentFrames(ts) {
        let ret = [];

        for (let prop in this.state.frames) {
            if (this.state.frames.hasOwnProperty(prop)) {
                let curFrame = this.state.frames[prop];

                if (Array.isArray(curFrame)) {
                    for (let i = 0; i < curFrame.length; i++) {
                        let curFrameEntry = curFrame[i];
                        console.log(curFrameEntry.name);
                        let ini = curFrameEntry.second;
                        let fim = ini + curFrameEntry.duration;

                        console.log(`${ini} ${ts} ${fim}`);
                        if (ts >= ini && ts <= fim) {
                            curFrameEntry.layer = prop;
                            ret.push(curFrameEntry);
                        }
                    }
                }
            }
        }

        return ret;
    }

    myFunction(p1, p2) {
        this.cursor += 1;
        let curFrames = this.getCurrentFrames(this.cursor);

        if (curFrames.length === 0) {
            while (this.fg.stage.children[0]) {
                this.fg.stage.removeChild(this.fg.stage.children[0]);
            }
        } else {
            let toRemove = [];
            for (let h = 0; h < this.fg.stage.children.length; h++) {
                let curChild = this.fg.stage.children[h];
                let found = false;

                for (let d = 0; d < curFrames.length; d++) {
                    let curFrame = curFrames[d];
                    let curLayer = this.state.layers.find(
                        (element) => element.id === curFrame.layer
                    );

                    if (curChild === curLayer.data) {
                        found = true;
                    }
                }

                if (!found) {
                    toRemove.push(curChild);
                }
            }

            toRemove.forEach(
                function (item, i) {
                    this.fg.stage.removeChild(item);
                }.bind(this)
            );

            for (let j = 0; j < curFrames.length; j++) {
                let curFrame = curFrames[j];
                let found = false;
                let curLayer = this.state.layers.find(
                    (element) => element.id === curFrame.layer
                );

                for (let i = 0; i < this.fg.stage.children.length; i++) {
                    if (this.fg.stage.children[i] === curLayer.data) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    this.fg.stage.addChild(curLayer.data);
                }
            }
        }
    }

    stop() {
        clearInterval(this.tid);
    }

    play() {
        console.log("play");
        this.tid = setInterval(this.myFunction.bind(this), 1000);
    }

    onChange(ts) {
        console.log(ts);
    }

    render() {
        return (
            <Container>

                <CanvasDraw
                    key={"banana"}
                    readycb={this.onCanvasReady.bind(this)}
                ></CanvasDraw>
                <Cursor onChange={this.onChange.bind(this)} />
                <Timeline
                    layers={this.state.layers}
                    frames={this.state.frames}
                    onUpdateFrames={this.onUpdateFrames.bind(this)}
                />

                <Button onClick={this.play.bind(this)}>Play</Button>
                <Button onClick={this.stop.bind(this)}>Stop</Button>
                <Button onClick={this.add.bind(this)}>Add</Button>

            </Container>
        );
    }
}

export default App2;