import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import dilpImage from '../assets/dilp.jpg';
import sreeImage from '../assets/sree.jpg';
import naruImage from '../assets/naru.jpg';
import { Link } from 'react-router-dom';

import './TeamPage.css';

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Narayana Reddy Naru",
      title: "Developer",
      image: naruImage,
      linkedin: "https://www.linkedin.com/in/narayana1726/",
      github: "#",
      twitter: "#",
      email: "mailto:narayana@example.com",
      bio: "Full-stack developer with expertise in React, Node.js, and modern web technologies."
    },
    {
      name: "Sreedhar Kanuboina",
      title: "Sr. Data Engineer", 
      image: sreeImage,
      linkedin: "https://www.linkedin.com/in/sreedhar-kanuboina-24602a196/",
      github: "#",
      twitter: "#",
      email: "mailto:sreedhar@example.com",
      bio: "Data engineering specialist with experience in big data pipelines and cloud infrastructure."
    },
    {
      name: "Dileep Venkata Chowdary",
      title: "Sr. Network Engineer",
      image: dilpImage,
      linkedin: "https://www.linkedin.com/in/dileep-e-348b4a2b8/",
      github: "#",
      twitter: "#",
      email: "mailto:dileep@example.com",
      bio: "Network infrastructure expert with certifications in Cisco and cloud networking solutions."
    }
  ];

  return (
    <div className="team-page">
      <div className="team-container">
        <div className="team-header">
          <h1>Our <span>Team</span></h1>
          <p>The talented individuals behind our success</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="card-image-container">
                <img 
                  className="card-image" 
                  src={member.image} 
                  alt={member.name}
                />
                <div className="image-overlay"></div>
                <div className="image-text">
                  <h3>{member.name}</h3>
                  <p>{member.title}</p>
                </div>
              </div>
              
              <div className="card-content">
                <p className="member-bio">{member.bio}</p>
                
                <div className="social-links">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href={member.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href={member.email} 
                    aria-label="Email"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="join-team">
          <h2>Want to join our team?</h2>
          <p>We're always looking for talented individuals to join our growing team.</p>

          <Link to="/about" className="contact-button">
  Contact Us
</Link>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;