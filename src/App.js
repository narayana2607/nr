import React, { useState, Suspense, lazy, startTransition } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PacmanLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Inside JSX


import './App.css';

// Utility: Lazy-load with Pacman spinner
const createLazyComponent = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  return (props) => (
    <Suspense fallback={<div className="loading-container"><PacmanLoader color="#36d7b7" /></div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Lazy-loaded components
const Age = createLazyComponent(() => import("./components/dob/Age"));
const ChatbotIcon = createLazyComponent(() => import("./components/ai/ChatbotIcon"));
const Navbar = createLazyComponent(() => import("./Navbar/Navbar"));
const Footer = createLazyComponent(() => import("./components/Footer"));
const Home = createLazyComponent(() => import("./components/Home"));
const Gallery = createLazyComponent(() => import("./components/oneui/Gallery"));
const About = createLazyComponent(() => import("./components/Aboutus/About"));
const YT = createLazyComponent(() => import("./components/oneui/YT"));
const FoodHome = createLazyComponent(() => import("./components/Food/FoodHome"));
const Employee = createLazyComponent(() => import("./components/employee/Employee"));
const Portfolio = createLazyComponent(() => import("./components/me/Portfolio"));
const ProductPage = createLazyComponent(() => import("./components/ecommerce/ProductPage"));
const Studentinfo = createLazyComponent(() => import("./components/student/StudentInfo"));
const Search = createLazyComponent(() => import("./components/Search/PopupSearch"));
const Excelsheet = createLazyComponent(() => import("./components/Sheets/Excelsheet"));
const StatusPage = createLazyComponent(() => import("./components/StatusPage"));

const App = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    startTransition(() => setShowSearch(true));
  };

  const handleCloseSearch = () => {
    startTransition(() => setShowSearch(false));
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
  };

  const AnimatedPage = ({ children }) => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );

  return (
    <Router>
      <Navbar onSearchClick={handleSearchClick} />
      <ChatbotIcon />

      <main className="content">
        <Routes>
          <Route path="/" element={<AnimatedPage><Navigate to="/about" replace /></AnimatedPage>} />
          <Route path="/home" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/portfolio" element={<AnimatedPage><Portfolio /></AnimatedPage>} />
          <Route path="/excelsheet" element={<AnimatedPage><Excelsheet /></AnimatedPage>} />
          <Route path="/foodhome" element={<AnimatedPage><FoodHome /></AnimatedPage>} />
          <Route path="/employee" element={<AnimatedPage><Employee /></AnimatedPage>} />
          <Route path="/studentinfo" element={<AnimatedPage><Studentinfo /></AnimatedPage>} />
          <Route path="/yt" element={<AnimatedPage><YT /></AnimatedPage>} />
          <Route path="/gallery" element={<AnimatedPage><Gallery /></AnimatedPage>} />
          <Route path="/age" element={<AnimatedPage><Age /></AnimatedPage>} />
          <Route path="/productpage" element={<AnimatedPage><ProductPage /></AnimatedPage>} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </main>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      <Search show={showSearch} onClose={handleCloseSearch} />
      <Footer />
    </Router>
  );
};

export default App;
