// ImageUpload.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBoundingBox } from '../redux/actions';

const ImageUpload = () => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [selectedFile, setSelectedFile] = useState(null);

  // Use useSelector to access the boundingBoxes from the Redux store
  const boundingBoxes = useSelector((state) => state.boundingBoxes);

  const handleUpload = () => {
    if (!selectedFile) {
      // Handle case where no file is selected
      return;
    }

    // Dispatch bounding box coordinates and selected file
    dispatch(addBoundingBox({ ...coordinates, file: selectedFile }));

    // Clear only the bounding box coordinates after dispatch
    setCoordinates({ x1: 0, y1: 0, x2: 0, y2: 0 });
  };

  const handleInputChange = (key, value) => {
    // Update the corresponding coordinate value
    setCoordinates({ ...coordinates, [key]: Number(value) });
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          setSelectedFile(file);
        }}
      />
      {/* Render the selected image */}
      {selectedFile && (
        <div>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '400px', margin: '10px 0' }}
          />
          {/* Render bounding boxes on the image */}
          {boundingBoxes.map((box, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${box.x1}px`,
                top: `${box.y1}px`,
                width: `${box.x2 - box.x1}px`,
                height: `${box.y2 - box.y1}px`,
                border: '2px solid red',
              }}
            />
          ))}
        </div>
      )}
      {/* Input fields for bounding box coordinates */}
      <div>
        <label>X1:</label>
        <input
          type="number"
          value={coordinates.x1}
          onChange={(e) => handleInputChange('x1', e.target.value)}
        />
      </div>
      <div>
        <label>Y1:</label>
        <input
          type="number"
          value={coordinates.y1}
          onChange={(e) => handleInputChange('y1', e.target.value)}
        />
      </div>
      <div>
        <label>X2:</label>
        <input
          type="number"
          value={coordinates.x2}
          onChange={(e) => handleInputChange('x2', e.target.value)}
        />
      </div>
      <div>
        <label>Y2:</label>
        <input
          type="number"
          value={coordinates.y2}
          onChange={(e) => handleInputChange('y2', e.target.value)}
        />
      </div>
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
