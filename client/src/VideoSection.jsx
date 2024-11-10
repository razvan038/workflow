import React, { useRef, useEffect } from 'react';
import Animatie from './assets/Animatie.webm';
import LowBattery from './LowBattery.jsx';
import './App.css';

const VideoSection = () => {
    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const lowBatteryRef = useRef(null); // Referință pentru <LowBattery />
    const isBlockingScroll = useRef(false); // Stare pentru a controla blocarea scroll-ului

    useEffect(() => {
        const handleScroll = () => {
            if (!videoRef.current || !sectionRef.current || isBlockingScroll.current) return;

            const distance = window.scrollY - sectionRef.current.offsetTop;
            const total = sectionRef.current.clientHeight - window.innerHeight;

            let percentage = distance / total;
            percentage = Math.max(0, percentage);
            percentage = Math.min(percentage, 1);

            if (videoRef.current.duration > 0) {
                videoRef.current.currentTime = videoRef.current.duration * percentage;
            }

            if (percentage === 1) {
                videoRef.current.pause();
                videoRef.current.currentTime = videoRef.current.duration;
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === lowBatteryRef.current && entry.intersectionRatio >= 0.5) {
                        isBlockingScroll.current = true;
                        window.scrollTo({
                            top: entry.boundingClientRect.top + window.scrollY - (window.innerHeight * 0.5),
                            behavior: 'smooth'
                        });
                    }
                });
            },
            { threshold: [0.5] }
        );

        if (lowBatteryRef.current) {
            observer.observe(lowBatteryRef.current);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (lowBatteryRef.current) {
                observer.unobserve(lowBatteryRef.current);
            }
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
                <div ref={lowBatteryRef}>
                    <LowBattery />
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
