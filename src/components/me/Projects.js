import React from "react";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "NNR PVT LTD.",
      link: "https://github.com/narayana2607?tab=repositories",
    },
    {
      title: "Project 2",
      description: "INFINITE COMPUTER SOLUTIONS.",
      link: "https://github.com/narayana2607",
    },
  ];

  return (
    <section id="projects-section" className="projects">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-button"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
