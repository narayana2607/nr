import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
import "./Youtube.css";

const VideoPlayer = ({ url, isFavorite, onToggleFavorite, title }) => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef(null);

  // Handle hover to play/pause
  useEffect(() => {
    if (isHovered && isReady) {
      setIsPlaying(true);
      setShowControls(true);
    } else {
      setIsPlaying(false);
      setShowControls(false);
    }
  }, [isHovered, isReady]);

  return (
    <div 
      className="player-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="video-content"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          className="react-player"
          width="100%"
          height="100%"
          controls={showControls}
          light={
            !showControls && (
              <img
                src={`https://img.youtube.com/vi/${url.split('v=')[1].split('&')[0]}/hqdefault.jpg`}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )
          }
          playing={isPlaying}
          onReady={() => setIsReady(true)}
          onClickPreview={() => {
            setIsPlaying(true);
            setShowControls(true);
          }}
          playIcon={
            <motion.button 
              className="play-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          }
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
              },
            },
          }}
        />
      </motion.div>

      {isReady && (
        <motion.button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </motion.button>
      )}

      {!isReady && (
        <div className="video-skeleton">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

const YT = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load favorites
  useEffect(() => {
    const savedFavorites = localStorage.getItem("yt-favorites");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    setIsLoading(false);
  }, []);

  // Save favorites
  useEffect(() => {
    localStorage.setItem("yt-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const videos = [
    { 
      id: "TZE9gVF1QbA",
      title: "Game of Thrones | Season 8", 
      url: "https://www.youtube.com/watch?v=TZE9gVF1QbA",
      views: "12M views",
      duration: "2:15"
    },
    {
      id: "KyMNLIYRsR4",
      title: "Tu Hi Hai - Full Video | Half Girlfriend",
      url: "https://www.youtube.com/watch?v=KyMNLIYRsR4",
      views: "45M views",
      duration: "4:22"
    },
    {
      id: "PvyaKJlWz0Y",
      title: "Rohit & Meghana Yamunatheeram Full Performance | SAREGAMAPA",
      url: "https://www.youtube.com/watch?v=PvyaKJlWz0Y",
      views: "8.5M views",
      duration: "6:30"
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleFavorite = (videoId) => {
    setFavorites(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "favorites") return matchesSearch && favorites.includes(video.id);
    return matchesSearch;
  });

  return (
    <motion.div 
      className="youtube-gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header">
        <motion.div 
          className="title-container"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1 className="title">Video Gallery</h1>
          <p className="subtitle">Watch your favorite videos</p>
        </motion.div>
        
        <motion.div 
          className="search-container"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="search-bar-container">
            <svg className="search-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-bar"
            />
          </div>
          <div className="tabs">
            <button
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>All Videos</span>
            </button>
            <button
              className={`tab ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Favorites</span>
              {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
            </button>
          </div>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <motion.div
              key={i}
              className="video-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="thumbnail-placeholder"></div>
              <div className="title-placeholder"></div>
              <div className="meta-placeholder"></div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div className="video-group" layout>
          <AnimatePresence>
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <motion.div
                  className="video-card"
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                  }}
                >
                  <VideoPlayer 
                    url={video.url}
                    title={video.title}
                    isFavorite={favorites.includes(video.id)}
                    onToggleFavorite={() => toggleFavorite(video.id)}
                  />
                  <div className="video-info">
                    <motion.p 
                      className="video-title"
                      whileHover={{ color: "var(--primary)" }}
                    >
                      {video.title}
                    </motion.p>
                    <div className="video-meta">
                      <span className="views">{video.views}</span>
                      <span className="duration">{video.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="empty-state">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3>No videos found</h3>
                  <p>{activeTab === "favorites" ? 
                    "You haven't added any favorites yet!" : 
                    "Try a different search term"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default YT;