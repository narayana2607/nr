import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Assuming you have some base styles
import logo from './logo.png';

const Navbar = ({ onSearchClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
    const navbarVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    const linkVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.2 } },
        exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
    };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
     <div className="navbar-brand">
          <NavLink to="/" className="nav-link" end>
            <img 
              src={logo} 
              alt="Company Logo" 
              className="logo-img"
            />
          </NavLink>
        </div>

      <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <FontAwesomeIcon icon={faTimes} className="text-white w-6 h-6 mobile-menu-close-icon" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="text-white w-6 h-6 mobile-menu-open-icon" />
        )}
      </div>

      <motion.ul
        className={`navbar-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}
                   bg-gray-900/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-none`}
        >
        <motion.li variants={linkVariants}>
          <NavLink to="/home" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            HOME
          </NavLink>
        </motion.li>
        <motion.li variants={linkVariants}>

<NavLink to="/about" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
  ABOUT ME
</NavLink>
</motion.li>
        <motion.li variants={linkVariants}>
          <NavLink to="/portfolio" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            PORTFOLIO
          </NavLink>
        </motion.li>
        <motion.li variants={linkVariants}>
          <NavLink to="/excelsheet" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            SHEETS
          </NavLink>
        </motion.li>
        <motion.li variants={linkVariants}>
          <NavLink to="/foodhome" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            FOOD
          </NavLink>
        </motion.li>
        <motion.li variants={linkVariants}>
          <NavLink to="/employee" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            EMPLOYEES
          </NavLink>
        </motion.li>
        <motion.li variants={linkVariants}>
          <NavLink to="/studentinfo" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            STUDENT
          </NavLink>
        </motion.li>
        <motion.li variants={linkVariants}>
          <NavLink to="/yt" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            YOUTUBE
          </NavLink>
        </motion.li>
        <motion.li variants={linkVariants}>
          <NavLink to="/gallery" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            GALLERY
          </NavLink>
        </motion.li>
        <motion.li variants={linkVariants}>
          <NavLink to="/productpage" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            e-SHOP
          </NavLink>
        </motion.li>
         <motion.li variants={linkVariants}>
          <NavLink to="/age" className="nav-link text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            AGE
          </NavLink>

        </motion.li>
       
      </motion.ul>

      <button className="search-icon-button" onClick={onSearchClick}>
        <FontAwesomeIcon icon={faSearch} className="text-white w-5 h-5" />
      </button>
    </motion.nav>
  );
};

export default Navbar;
