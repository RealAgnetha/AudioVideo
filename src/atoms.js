
import {atom} from 'recoil';


export const videoListState = atom({
    key: 'videoListState',
    default: [{id: 0, "src": null, duration: null,  "x": null, "y": null, startTime: 0.0, endTime: 3000.0, trimmStart:0.0, trimmEnd: 0.0, previewImages:null}],
  });
  
  export const textListState = atom({
    key: 'textListState',
    default: [{id: 0, group: 0, tag:null, "text": "new text", "x": 0, "y": 0, startTime: 0.0, endTime: 2000.0, posX: 0, color:"#aabbcc", size:40}, {id: 1, group: 0, "text": "new text", "x": 0, "y": 0, startTime: 3000.0, endTime: 5000.0, posX: 0, color:"#aabbcc", size:40}],
  });

  export const imageListState = atom({
    key: 'imageListState',
    default: [],
  });

  export const playState = atom({
    key: 'playState',
    default: false
  });

  export const timeState = atom({
    key: 'timeState',
    default: 1
  })

  export const editState = atom({
    key: 'editState',
    default: "upload"
  })

  export const elementState = atom({
    key: 'elementState',
    default: 0
  })


  export const scaleState = atom({
    key: 'scaleState',
    default: 1
  })

  export const zoomState = atom({
    key: 'zoomState',
    default: 4000000
  })

  export const scrollState = atom({
    key: 'scrollState',
    default: 0
  })

  export const subtitleDefaultXState = atom({
    key: 'subtitleDefaultXState',
    default: 0
  })

  export const subtitleDefaultYState = atom({
    key: 'subtitleDefaultYState',
    default: 0
  })

  export const subtitleDefaultSizeState = atom({
    key: 'subtitleDefaultSizeState',
    default: 20
  })

  export const subtitleDefaultColorState = atom({
    key: 'subtitleDefaultColorState',
    default: "#aabbcc"
  })
 
  

  
  