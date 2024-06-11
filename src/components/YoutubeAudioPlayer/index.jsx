import React, { useEffect, useRef } from 'react';

const YouTubeAudioPlayer = ({ videoId }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        const loadYouTubeAPI = () => {
            if (!window.YT) {
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                script.onload = () => initializePlayer();
                document.body.appendChild(script);
            } else {
                initializePlayer();
            }
        };

        const initializePlayer = () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }

            playerRef.current = new window.YT.Player('player', {
                height: '0',
                width: '0',
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    loop: 1,
                    playlist: videoId,
                },
                events: {
                    onReady: onPlayerReady
                }
            });
        };

        loadYouTubeAPI();

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [videoId]);

    const onPlayerReady = (event) => {
        event.target.playVideo();
    };

    return <div id="player"></div>;
};

export default YouTubeAudioPlayer;