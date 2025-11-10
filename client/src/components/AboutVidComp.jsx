'use client';
import React, { useState, useEffect, useRef } from 'react';

function AboutVidComp() {
    const [modalOpen, setModalOpen] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (modalOpen) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        }
    }, [modalOpen]);

    return (
        <>
            <div className="relative" data-video-modal>
                <div className="video-thumbnail-container px-4 sm:px-0 animate-float [animation-fill-mode:both] [animation-delay:800ms]">
                    <button
                        className="video-thumbnail-wrapper w-full h-full focus:outline-none"
                        onClick={() => setModalOpen(true)}
                        aria-controls="modal"
                        aria-label="About VedaStructure"
                    >
                        <img
                            className="video-thumbnail bg-white"
                            src={'/images/about_videos/thumbnail.png'}
                            alt="About VedaStucture"
                        />
                        <div className="play-button">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5V19L19 12L8 5Z" fill="#eab308" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            {modalOpen && (
                <div
                    className="fixed inset-0 z-[99999] flex px-4 md:px-6 py-6"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setModalOpen(false)}
                >
                    <div className="max-w-6xl mx-auto h-full flex items-center w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="w-full max-h-full rounded-2xl shadow-2xl aspect-video bg-black overflow-hidden relative">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                                aria-label="Fermer la vidéo"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <video
                                ref={videoRef}
                                width="1920"
                                height="1080"
                                loop
                                controls={false}
                                className="w-full h-full object-cover"
                            >
                                <source src={'/images/about_videos/welcome.mp4'} type="video/mp4" />
                                About Vedastructure
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AboutVidComp
