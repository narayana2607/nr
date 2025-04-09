import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './AdvancedYouTubeBackground.css';

const AdvancedYouTubeBackground = ({ videoId, fallbackImage }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      playlist: videoId,
      mute: 1,
      playsinline: 1,
    },
  };

  return (
    <div className="youtube-background">
      {!isMobile ? (
        <YouTube
          videoId={videoId}
          opts={opts}
          className="youtube-iframe"
        />
      ) : (
        <div 
          className="fallback-image" 
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}
      <div className="video-overlay" />
    </div>
  );
};

export default AdvancedYouTubeBackground;