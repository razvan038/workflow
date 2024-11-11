import React, { useState, useRef } from 'react';
import Lottie from 'lottie-react';
import assetsConfig from './data.json';

function LowBattery() {
    const [selectedAnimation, setSelectedAnimation] = useState(null);
    const audioRef = useRef(null);

    const handleButtonClick = async (asset) => {
        try {
            // Încarcă animația JSON din directorul public
            const animationResponse = await fetch(`/${asset.animationPath}`);
            const animationData = await animationResponse.json();
            setSelectedAnimation(animationData);

            // Oprește și resetează sunetul curent, dacă există
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            // Creează un nou obiect audio și redă sunetul
            const newAudio = new Audio(`/${asset.soundPath}`);
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
                    style={{ width: 500, height: 180 }}
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
