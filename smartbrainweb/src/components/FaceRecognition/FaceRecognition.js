import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxArray }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto' />
        {boxArray.map(box => {
          return <div key={`box_${boxArray.indexOf(box)}`} className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
        })}
      </div>
    </div>
  );
}

export default FaceRecognition;
