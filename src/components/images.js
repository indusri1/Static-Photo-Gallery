// src/components/Images.js
import { connect } from 'react-redux';
import { setFullscreenIndex, setBoundingBoxes } from '../redux/actions';

// ... existing component code ...

// Map Redux state to component props
const mapStateToProps = (state) => ({
  fullscreenIndex: state.fullscreenIndex,
  boundingBoxes: state.boundingBoxes,
});

// Map Redux actions to component props
const mapDispatchToProps = {
  setFullscreenIndex,
  setBoundingBoxes,
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(Images);
