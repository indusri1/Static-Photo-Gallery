// src/redux/reducers.js
const initialState = {
    fullscreenIndex: null,
    boundingBoxes: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FULLSCREEN_INDEX':
        return { ...state, fullscreenIndex: action.payload };
      case 'SET_BOUNDING_BOXES':
        return { ...state, boundingBoxes: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;