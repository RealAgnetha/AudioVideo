import React, {useEffect, useRef, useState} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import './css/styles.css';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";


function MemesComponent({isPlaying}) {
    const wrapperRef = useRef(null);
    const canvasRef = useRef < HTMLDivElement > null;


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

    const [activeTab, setActiveTab] = useState(0);


    return (
        <div className="right-side">
            <div className="wrapper-memes" ref={wrapperRef}>

                <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
                    <TabList>
                        <Tab>GIFs</Tab>
                        <Tab>PNGs</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="gifs-container">
                            <img src="https://media.giphy.com/media/BXjqytvu9bKzCUHdzz/giphy.gif" alt="vibing cat"
                                 className="equal-size"/>
                            <img src="https://media.giphy.com/media/oebo5waezwOIk6BTA9/giphy.gif" alt="sunglasses"
                                 className="equal-size"/>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="pngs-container">
                            <img src="https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg
" alt="png2" className="equal-size"/>
                        </div>
                    </TabPanel>

                </Tabs>

            </div>


        </div>
    );
}

export default MemesComponent;