import React, { useContext, useEffect, useRef, useState } from 'react';
import { YoutubePlayerContext } from '../../context/YoutublePlayerContext';


const YouTubeAudioPlayer = ({ videoId }) => {
    // const [loadingPlayer, setLoadingPlayer] = useState(false);
    const { videoPlaying, togglePlayer, loadingPlayer, toggleLoading } = useContext(YoutubePlayerContext);
    const playerRef = useRef(null);
    const ytApiLoadedRef = useRef(false);
    const scriptRef = useRef(null);

    useEffect(() => {
        const loadYouTubeAPI = () => {
            if (!ytApiLoadedRef.current) {
                toggleLoading(true);
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                script.onload = () => {
                    ytApiLoadedRef.current = true;
                    initializePlayer();
                };
                document.body.appendChild(script);
                scriptRef.current = script;
            } else {
                initializePlayer();
            }
        };

        const initializePlayer = () => {
            if (window.YT && window.YT.Player) {
                if (!playerRef.current) {
                    playerRef.current = new window.YT.Player('player', {
                        height: '0',
                        width: '0',
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            modestbranding: 1,
                            loop: 1,
                            playlist: videoId,
                        },
                        events: {
                            onReady: onPlayerReady,
                            onStateChange: onPlayerStateChange,
                        },
                    });
                } else {
                    toggleLoading(true);
                    playerRef.current.loadVideoById(videoId);
                }
            } else {
                setTimeout(initializePlayer, 100);
            }
        };

        loadYouTubeAPI();

        return () => {
            // Cleanup the player
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            // Cleanup the script
            if (scriptRef.current && document.body.contains(scriptRef.current)) {
                document.body.removeChild(scriptRef.current);
                scriptRef.current = null;
                ytApiLoadedRef.current = false;
            }
        };
    }, [videoId]);

    useEffect(() => {
        if (playerRef.current) {
            if (videoPlaying === 'paused') {
                playerRef.current.pauseVideo();
            } else if (videoPlaying === 'playing') {
                playerRef.current.playVideo();
            }
        }
    }, [videoPlaying]);

    const onPlayerReady = (event) => {
        event.target.playVideo();
        event.target.setPlaybackQuality('small');
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            toggleLoading(false);
            togglePlayer('playing');
        }
    };

    return (


        <div id="player" className='fixed'></div>
    );
};

export default YouTubeAudioPlayer;