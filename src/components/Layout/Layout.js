// src/components/Layout.js
import React from 'react';
import AdvancedYouTubeBackground from './AdvancedYouTubeBackground';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <AdvancedYouTubeBackground 
        videoId="KyMNLIYRsR4"
        fallbackImage="/images/fallback-bg.jpg"
      />
      <div className="app-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;