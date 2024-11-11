import React, { useRef, useEffect } from 'react';
import Animatie from './assets/Animatie.webm';
import LowBattery from './LowBattery.jsx';
import './App.css';

const VideoSection = () => {
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!videoRef.current || !sectionRef.current) return;

            const distance = window.scrollY - sectionRef.current.offsetTop;
            const total = sectionRef.current.clientHeight - window.innerHeight;

            let percentage = distance / total;
            percentage = Math.max(0, percentage);
            percentage = Math.min(percentage, 1);

            if (videoRef.current.duration > 0) {
                videoRef.current.currentTime = videoRef.current.duration * percentage;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section ref={sectionRef} className="vid">
            <div className="holder">
                <video
                    ref={videoRef}
                    src={Animatie}
                    preload="auto"
                    muted
                    playsInline
                />
            </div>
            <div className="story">
                <div className="workflow-logo">
                    <h1>workflow</h1>
                </div>
                <div>
                    <h3>KEEPS TRACK OF&hellip;</h3>
                </div>
                <div>
                    <h3>MOVEMENT</h3>
                </div>
                <div>
                    <h3>POSTURE</h3>
                </div>
                <div>
                    <h3>HYDRATION</h3>
                </div>
                <div>
                    <LowBattery />
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
