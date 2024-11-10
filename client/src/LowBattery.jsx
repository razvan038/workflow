import React, { useState, useRef } from 'react';
import Lottie from 'lottie-react';
import assetsConfig from './data.json';

function LowBattery() {
    const [selectedAnimation, setSelectedAnimation] = useState(null);
    const [audio, setAudio] = useState(null);
  
    const audioRef = useRef(null); 
  
    const handleButtonClick = async (asset) => {
        try {
          const animation = await import(`${asset.animationPath}`);
          const sound = await import(`${asset.soundPath}`);
      
          setSelectedAnimation(animation.default);
      
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
      
          const newAudio = new Audio(sound.default);
          audioRef.current = newAudio;
      
          newAudio.play();
        } catch (error) {
          console.error('Error loading asset:', error);
        }
      };
  return (
    <>
      
      {selectedAnimation && (
        <Lottie
          className='animation-div'
          animationData={selectedAnimation}
          loop={false} 
          style={{ width: 750, height:180 }} 
        />
      )}

      <div className="butoane">
       
        {assetsConfig.map((asset) => (
          <button
            key={asset.name}
            className="butonSelect"
            onClick={() => handleButtonClick(asset)}
          >
            {asset.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default LowBattery;
