import React, { useEffect } from 'react'
import * as ReactDOM from 'react-dom';
import { imageListState, videoListState, playState, timeState, editState, zoomState, elementState } from './atoms';
import { useRecoilState, } from 'recoil';
import Timeline from 'react-visjs-timeline';

function TimePanel() {
    const [videoList, setVideoList] = useRecoilState(videoListState);
    const [imageList, setImageList] = useRecoilState(imageListState);
    const [play, setPlay] = useRecoilState(playState);
    const [time, setTime] = useRecoilState(timeState);
    const [edit, setEdit] = useRecoilState(editState);
    const [element, setElement] = useRecoilState(elementState);
    const [zoom, setZoom] = useRecoilState(zoomState);


    let timelineref = React.createRef();

    function convertAtomsToDataset() {
        var dataset = [];
        var groups = [];

        for (let i = 0; i < videoList.length; i++) {
            let video = videoList[i];
            groups.push({ id: "video", content: "&#160" })
            dataset.push({ id: video.id, className: "video", start: video.startTime, end: video.endTime, content: "video", group: "video", style: "height: 32.2222px" })
        }

        groups.push({ id: "image", content: "&#160" })
        for (let i = 0; i < imageList.length; i++) {
            let image = imageList[i]
            dataset.push({ id: image.id + videoList.length, className: "image", start: image.startTime, end: image.endTime, content: "image", group: "image" })
        }

        groups.push({ id: 0, content: "&#160" })
        groups.push({ id: 1, content: "&#160" })

        timelineref.current.$el.setItems(dataset)
        timelineref.current.$el.setGroups(groups)
    }

    function changestartinatomimage(id, newstart, newend, group) {
        let newList = [...imageList].map((item) => {
            let newData = { ...item }
            if (item.id === id - videoList.length) {
                newData.startTime = newstart;
                newData.endTime = newend;
                newData.group = group;
                return newData;
            }
            else return item;
        });
        setImageList(newList);
    }


    function deleteimageinatom(id) {
        id = id - videoList.length
        setImageList((imageList) => imageList.filter((value, index) => value !== imageList[id]));
    }

    function changestartinatomvideo(id, newstart, newend) {
        id = 0
        let newList = [...videoList].map((item) => {
            let newData = { ...item }
            if (item.id === id) {
                if (newend - newstart != newData.endTime - newData.startTime) {
                    if (Math.abs(newData.startTime - newstart) != 0) {
                        newData.trimmStart = Math.abs(newData.startTime - newstart)
                    }
                    if (Math.abs(newData.endTime - newend) != 0) {
                        newData.trimmEnd = Math.abs(newData.endTime - newend)
                    }
                    newData.startTime = 0;
                    newData.endTime = newData.duration - (newData.trimmStart + newData.trimmEnd);

                }

                newData.startTime = 0;
                return newData;
            }
            else return item;
        });
        setVideoList(newList);
    }

    useEffect(() => {
        convertAtomsToDataset();
    }, [imageList, videoList, play, time, edit, zoom, element]);

    useEffect(() => {
        timelineref.current.$el.addCustomTime(0, "currenttime")
        timelineref.current.$el.on('timechange', function (properties) {
            setTime(properties.time.getTime())
            document.getElementById("videoid").currentTime = properties.time.getTime() / 1000;
        });

        timelineref.current.$el.on('select', function (properties) {
            if (properties !== null && properties.items[0] >= videoList.length) {
                setEdit("images")
                setElement(properties.items[0] - (videoList.length))
            }
        }
        );
    }, [])

    useEffect(() => {
        timelineref.current.$el.setCustomTime(time, "currenttime")
    }, [time])

    const ItemTemplate = (props) => (
        <div style={{ paddingLeft: "10px" }}>

            {props.item.content === "video" ?
                <div style={{ display: "absolute" }}>
                    {videoList[0].previewImages !== undefined ? videoList[0].previewImages.map((src) => <img style={{ height: props.element.height }} src={src} />) : <div>Video</div>}
                </div>
                : props.item.content}

        </div>
    )

    const options = {
        start: 0,
        min: 10,
        end: 100,
        width: '100%',
        orientation: "top",
        stack: false,
        stackSubgroups: true,
        showMajorLabels: false,
        showCurrentTime: true,
        zoomMax: zoom,
        zoomMin: zoom,
        zoomable: false,
        itemsAlwaysDraggable: {
            item: true,
            range: true,
        },
        template: (item, element, data) => {
            ReactDOM.render(<ItemTemplate item={item} element={element} />, element)
        }
        ,
        maxHeight: "22vh",
        format: {
            minorLabels: function caluc(date, scale, step) {

                return date.valueOf() / 1000
            },
            majorLabels: function calcmajorLabels(date, scale, step) {
                return "test"
            }

        },
        editable: true,

        onMove: function (item, callback) {


            if (item.className == "image") {
                changestartinatomimage(item.id, item.start.getTime(), item.end.getTime(), item.group)
            }

            if (item.className == "video") {
                changestartinatomvideo(item.id, item.start.getTime(), item.end.getTime())
            }

        },

        onRemove: function (item, callback) {
            deleteimageinatom(item.id)
        }

    }

    return (
        <div id="timepanel">
            <div style={{ position: 'relative' }}>
                <div style={{ display: "flex" }}>
                </div>
                <div style={{ overflow: "scroll" }}>
                    <div style={{ overflow: "scroll" }}>
                        <Timeline
                            ref={timelineref}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimePanel