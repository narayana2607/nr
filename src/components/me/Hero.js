import React from "react";
import "./Hero.css";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hi, NARAYANA REDDY NARU</h1>
        <p className="hero-subtitle">
          A passionate web developer focused on creating impactful digital experiences.
        </p>
        <a href="#projects-section" className="hero-button">
          View My Work
        </a>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/narayana1704/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
          <a href="https://github.com/narayana2607" target="_blank" rel="noopener noreferrer">
            <FaGithub className="social-icon" />
          </a>
          <a href="https://www.instagram.com/npx2.o/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://x.com/narayana1726" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://www.facebook.com/Npx2.O" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
