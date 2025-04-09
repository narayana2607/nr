import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

// Import local assets
import localImage1 from './assets/me.jpg';
import localImage2 from './assets/me1.jpg';
import localImage3 from './assets/hero.jpg';
import localImage4 from './assets/mta.jpg';
import localImage5 from './assets/nyc.jpg';
import localImage6 from './assets/log.png';
import localVideo from './assets/v1.mp4';

const Home = () => {
  const [content, setContent] = useState({
    images: [],
    videos: [],
    isLoading: true
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
    arrows: true,
    pauseOnHover: true,
    fade: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const externalImages = [
          'https://i.pinimg.com/736x/d7/e5/a3/d7e5a35852e0c7c5a7be0db460168be2.jpg',
        ];

        const videos = [
          { 
            type: 'youtube', 
            url: 'https://youtu.be/kvWiPZtR2eg?si=9SDUCmmndD9PRewv',
            title: 'Featured Video',
            description: 'Explore our latest Video highlights'
          },
          { 
            type: 'local', 
            url: localVideo,
            title: ' Overview',
            description: 'Learn about our mission and values'
          }
        ];

        setContent({
          images: [localImage1, localImage2, localImage3, localImage4, localImage5, localImage6, ...externalImages],
          videos,
          isLoading: false
        });
      } catch (error) {
        console.error('Error loading content:', error);
        setContent(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadContent();
  }, []);

  const blogPosts = [
    {
      title: 'Industry Trends 2023',
      excerpt: 'Discover the latest developments shaping our industry this year.',
      date: 'June 15, 2023'
    },
    {
      title: 'New Product Launch',
      excerpt: 'Learn about our innovative new solution that solves key challenges.',
      date: 'May 28, 2023'
    },
    {
      title: 'Community Outreach',
      excerpt: 'How we\'re giving back to the communities we serve.',
      date: 'April 10, 2023'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        {content.isLoading ? (
          <div className="slider-loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {content.images.map((url, index) => (
              <div key={index} className="slider-item">
                <div className="slider-image-container">
                  <img 
                    src={url} 
                    alt={`Slide ${index + 1}`} 
                    className="slider-image"
                    loading={index > 0 ? "lazy" : "eager"}
                  />
                  <div className="slider-overlay">
                    <div className="slider-content">
                      <h1 className="slider-title">Welcome to NNR PVT LTD</h1>
                      <p className="slider-subtitle">Innovative Solutions for a Digital World</p>
                      {/* <p className="slider-text">Partnered with Avila University</p> */}
                      {/* <button className="slider-cta">Learn More</button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </section>

      {/* Featured Videos Section */}
      <section className="featured-videos">
        <div className="section-container">
          <div className="section-header">
            <h2>Featured Videos</h2>
            <p className="section-subtitle">Discover our work through these highlights</p>
          </div>
          
          <div className="video-grid">
            {content.videos.map((video, index) => (
              <div key={index} className="video-card">
                <div className="video-wrapper">
                  {video.type === 'youtube' ? (
                    <iframe
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video controls className="custom-video-player">
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="latest-articles">
        <div className="section-container">
          <div className="section-header">
            <h2>Latest Articles</h2>
            <p className="section-subtitle">Stay updated with our news and insights</p>
          </div>
          
          <div className="article-grid">
            {blogPosts.map((post, index) => (
              <article key={index} className="article-card">
                <div className="article-date">{post.date}</div>
                <h3 className="article-title">{post.title}</h3>
                <p className="article-excerpt">{post.excerpt}</p>
                <button className="read-more" onClick={() => { /* your click handler */ }}>
  Read More →
</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Transform Your Business?</h2>
          <p>Contact us today to discuss how we can help you achieve your goals</p>
          <div className="cta-buttons">
            <button className="primary-cta">Get Started</button>
            <button className="secondary-cta">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;