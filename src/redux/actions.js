// src/redux/actions.js
export const setFullscreenIndex = (index) => ({
    type: 'SET_FULLSCREEN_INDEX',
    payload: index,
  });
  
  export const setBoundingBoxes = (boxes) => ({
    type: 'SET_BOUNDING_BOXES',
    payload: boxes,
  });