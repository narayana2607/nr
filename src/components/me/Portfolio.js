import React from "react";
import Hero from "./Hero"; // Import the Hero component
import About from "./About"; // Import the About component
import Projects from "./Projects"; // Import the Projects component
import Contact from "./Contact"; // Import the Contact component

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      {/* Hero Section */}
      <Hero />
      <a href="/Chatbot.html" target="_blank" rel="noopener noreferrer">
  Open Chatbot Page
</a>
<button onClick={() => window.location.href = "/Chatbot.html"}>
  Go to Chatbot
</button>



      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Portfolio;
