import {useEffect, useRef, useState} from "react";

const Layer = ({ file, selected, onClick, onDrag }) => {
    const layerRef = useRef(null);
    const [layerStyle, setLayerStyle] = useState({});

    useEffect(() => {
        if (selected) {
            layerRef.current.classList.add("selected");
        } else {
            layerRef.current.classList.remove("selected");
        }
    }, [selected]);

    const handleClick = () => {
        onClick();
    };

    const handleDragStart = (e) => {
        setLayerStyle({ display: "none" });
        onDrag(e, layerRef.current.offsetLeft);
    };

    const handleDragEnd = () => {
        setLayerStyle({});
    };

    return (
        <div
            ref={layerRef}
            className="layer"
            style={layerStyle}
            onClick={handleClick}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {file.name}
        </div>
    );
};
export default Layer;