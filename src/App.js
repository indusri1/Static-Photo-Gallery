// App.js
import React from 'react';
import PhotoGallery from './components/PhotoGallery';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Photo Gallery</h1>
        <ImageUpload />
        <PhotoGallery />
      </header>
    </div>
  );
}

export default App;
