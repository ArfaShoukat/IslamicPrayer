import React from 'react';

const AlQuran = () => {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
        width="100%"
        height="100%"
        title="Al Quran PDF"
        frameBorder="0"
      />
    </div>
  );
};

export default AlQuran;
