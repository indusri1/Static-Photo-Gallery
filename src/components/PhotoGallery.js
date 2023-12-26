import React from 'react';
import { useSelector } from 'react-redux';
import BoundingBox from './BoundingBox';

const PhotoGallery = () => {
  const boundingBoxes = useSelector((state) => state.boundingBoxes);

  return (
    <div className="photo-gallery" style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Display your full-screen images here */}
      {boundingBoxes.map((box, index) => (
        <BoundingBox key={index} coordinates={box} />
      ))}
    </div>
  );
};

export default PhotoGallery;
