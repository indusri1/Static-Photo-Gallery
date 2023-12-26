// reducers.js
const initialState = {
  boundingBoxes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOUNDING_BOX':
      return {
        ...state,
        boundingBoxes: [...state.boundingBoxes, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
