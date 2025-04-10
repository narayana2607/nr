import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone, Download,MapPin,ExternalLink  } from 'lucide-react';
import profileImage from '../assets/pro.png';
import resumePDF from '../assets/resume.pdf'; // Make sure to add your PDF file
// import Mee from "./Mee"
import { Link } from 'react-router-dom';


import "./About.css";

const AboutMe = () => {
     
    const personalInfo = {
        name: "Narayana Reddy Naru",
        title: "Full Stack Developer",
        location: "Columbus, NE 68601",
        email: "narayana01704@gmail.com",
        phone: "USA +1 (984) 514-4449",
        phone1: "IND  +91-9533314444",
        linkedin: "https://www.linkedin.com/in/narayana1726",
        summary: "Results-driven Full Stack Developer with 1+ years of experience in designing, developing, and delivering high-performance, scalable, and accessible web applications. Expertise in React.js, JavaScript, HTML, CSS, and modern front-end frameworks. Passionate about data visualization, UI/UX design, and interactive storytelling. Proven ability to integrate front-end technologies with back-end systems (.NET, Java, AWS) to create seamless user experiences.",
        skills: {
            frontEnd: ["React.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Sass"],
            performance: ["Web accessibility (WCAG)", "Core Web Vitals", "Google Analytics", "A/B testing", "SEO best practices"],
            backend: ["Node.js", "Express.js", ".NET", "Java", "RESTful APIs", "AWS (EC2, S3, Lambda)"],
            developmentTools: ["Git", "GitHub", "Docker"],
            agile: ["DevOps practices"]
        },
        experience: [
            {
                title: "Full Stack Developer Intern",
                company: "Starteryou",
                location: "New York City, NY",
                date: "January 2025 – Present",
                description: [
                    "Contributed to the development and maintenance of the Starteryou Website, a platform connecting students with job opportunities, using React.js, Tailwind CSS, and JavaScript.",
                    "Developed scalable and responsive web applications, integrating REST APIs and third-party tools for data visualization and real-time updates.",
                    "Implemented SEO best practices, Core Web Vitals optimization, and A/B testing to enhance site performance.",
                    "Collaborated with product managers and designers to enhance user experience and platform engagement.",
                    "Worked on a platform with features including job listings, CRUD functionality for data management, scalable architecture, and secure hosting on AWS.",
                    "Utilized technologies such as React with Vite, Node.js, Express.js, MongoDB, AWS (EC2, Docker), and GitHub Actions."
                ]
            },
            {
                title: "Full Stack Developer",
                company: "Infinite Computer Solutions",
                location: "Bengaluru, India",
                date: "August 2022 – September 2023",
                description: [
                    "Designed and developed responsive web applications using Java, JavaScript, React.js, and HTML/CSS.",
                    "Built interactive dashboards and data visualizations.",
                    "Integrated front-end applications with enterprise software systems using React.",
                    "Optimized front-end performance, reducing load times by 30%."
                ]
            }
        ],
        education: [
            {
                degree: "Master of Science (MS) in Computer Science",
                university: "Avila University",
                date: "Jan 2024 - July 2025"
            },
            {
                degree: "Bachelor of Technology (BTech) in Information Technology",
                university: "Gudlavalleru Engineering College",
                date: "June 2018 – May 2022"
            }
        ],
        certifications: [
            "AWS Certified Solutions Architect – Associate",
            "DevOps Professional Certificate (PagerDuty & LinkedIn)",
            "ServiceNow IT Leadership Professional Certificate",
            "Career Essentials in GitHub (Microsoft & LinkedIn)"
        ],
        projects: [
            {
                title: "AI-Driven Budgeting Tool",
                description: "Developed a full-stack web application using React.js, MongoDB, and Python to help users create and manage budgets.",
                features: [
                    "Interactive data visualization (charts and graphs) to track income and expenses.",
                    "Excel and CSV export functionality for generating reports.",
                    "User authentication and data security."
                ]
            },
            {
                title: "Advanced Profile Management System",
                description: "Designed and implemented a comprehensive profile management system with React.js and MongoDB.",
                features: [
                    "Robust search and filtering capabilities for efficient user discovery.",
                    "Document upload functionality for resumes, portfolios, and other files.",
                    "Role-based access control.",
                    "RESTful API for backend operations."
                ]
            }
        ]
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    };

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="about-wrapper">
            <header className="about-header">
                <div className="header-container">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="profile-image"
                    >
                        <img src={profileImage} alt={personalInfo.name} />
                    </motion.div>

                    <div className="profile-details">
                        <h1>{personalInfo.name}</h1>
                        <h2 className="full-stack-title">
                            <span className="full-stack-highlight">Full Stack Developer</span>
                        </h2>
                        <div className="contact-info">
                            <div><MapPin size={16} /> {personalInfo.location}</div>
                            <a href={`mailto:${personalInfo.email}`}><Mail size={16} /> {personalInfo.email}</a>
                            <a href={`tel:${personalInfo.phone.replace(/\D/g, '')}`}><Phone size={16} /> {personalInfo.phone}</a>
                            <a href={`tel:${personalInfo.phone1.replace(/\D/g, '')}`}><Phone size={16} /> {personalInfo.phone1}</a>
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn</a>
                        </div>
                        <div className="resume-buttons">
                            <motion.a
                                href={resumePDF}
                                download="Narayana_Reddy_Resume.pdf"
                                className="download-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download size={18} /> Download Resume
                            </motion.a>
                                    <Link to="/home" className="view-button">
                              Our Team
                            </Link>
                            <motion.a
                                href={resumePDF}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="view-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink size={18} /> View Resume
                            </motion.a>
                        </div>

                    </div>

                </div>
            </header>

            <main className="about-main">
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="section summary-section"
                >
                    <h2>Summary</h2>
                    <p>{personalInfo.summary}</p>
                </motion.section>

                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="section skills-section"
                >
                    <h2>Technical Skills</h2>
                    <div className="skills-grid">
                        <div>
                            <h3>Front-End</h3>
                            <ul>
                                {personalInfo.skills.frontEnd.map((skill, index) => (
                                    <motion.li key={index} variants={listItemVariants}>
                                        {skill}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>Performance & SEO</h3>
                            <ul>
                                {personalInfo.skills.performance.map((skill, index) => (
                                    <motion.li key={index} variants={listItemVariants}>
                                        {skill}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>Backend & Cloud</h3>
                            <ul>
                                {personalInfo.skills.backend.map((skill, index) => (
                                    <motion.li key={index} variants={listItemVariants}>
                                        {skill}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>Development Tools</h3>
                            <ul>
                                {personalInfo.skills.developmentTools.map((skill, index) => (
                                    <motion.li key={index} variants={listItemVariants}>
                                        {skill}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>Agile & Collaboration</h3>
                            <ul>
                                {personalInfo.skills.agile.map((skill, index) => (
                                    <motion.li key={index} variants={listItemVariants}>
                                        {skill}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="section experience-section"
                >

                    {/* <div className='me'> <Mee /> </div> */}

                    <h2>Professional Experience</h2>
                    {personalInfo.experience.map((job, index) => (
                        <div key={index} className="job-entry">
                            <h3>{job.title}</h3>
                            <p className="company">{job.company}, {job.location}</p>
                            <p className="date">{job.date}</p>
                            <ul>
                                {job.description.map((desc, i) => (
                                    <motion.li key={i} variants={listItemVariants}>{desc}</motion.li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </motion.section>

                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="section education-section"
                >
                    <h2>Education</h2>
                    {personalInfo.education.map((edu, index) => (
                        <div key={index} className="education-entry">
                            <h3>{edu.degree}</h3>
                            <p>{edu.university}</p>
                            <p className="date">{edu.date}</p>
                        </div>
                    ))}
                </motion.section>

                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="section certifications-section"
                >
                    <h2>Certifications</h2>
                    <ul>
                        {personalInfo.certifications.map((cert, index) => (
                            <motion.li key={index} variants={listItemVariants}>
                                {cert}
                            </motion.li>
                        ))}
                    </ul>
                </motion.section>

                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="section projects-section"
                >
                    <h2>Projects & Achievements</h2>
                    {personalInfo.projects.map((project, index) => (
                        <div key={index} className="project-entry">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <h4>Features:</h4>
                            <ul>
                                {project.features.map((feature, i) => (
                                    <motion.li key={i} variants={listItemVariants}>
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                          
                        </div>
                    ))}
                </motion.section>
            </main>
        </div>
    );
};

export default AboutMe;