import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import logo from './logo.png';

const Navbar = ({ onSearchClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { path: "/home", name: "HOME" },
    { path: "/about", name: "ABOUT ME" },
    { path: "/excelsheet", name: "SHEETS" },
    { path: "/foodhome", name: "FOOD" },
    { path: "/employee", name: "EMPLOYEES" },
    { path: "/studentinfo", name: "STUDENT" },
    { path: "/yt", name: "YOUTUBE" },
    { path: "/gallery", name: "GALLERY" },
    { path: "/productpage", name: "E-SHOP" },
    { path: "/age", name: "AGE" }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.innerWidth <= 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    },
    exit: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={navbarVariants}
    >
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/" className="nav-link" end>
            <motion.img 
              src={logo} 
              alt="Company Logo" 
              className="logo-img"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </NavLink>
        </div>

        <motion.button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon 
            icon={isMobileMenuOpen ? faTimes : faBars} 
            className="menu-icon"
          />
        </motion.button>

        <div className="navbar-center">
          <ul className="navbar-links">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.path}
                custom={index}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active-nav-link' : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="navbar-right">
          <motion.button 
            className="search-icon-button"
            onClick={onSearchClick}
            aria-label="Search"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon 
              icon={faSearch} 
              className="search-icon"
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <ul className="mobile-nav-items">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.path}
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `mobile-nav-link ${isActive ? 'active-nav-link' : ''}`
                    }
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;