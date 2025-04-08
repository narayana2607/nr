import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import { PacmanLoader } from 'react-spinners';
//import ChatbotIcon from "./components/ai/ChatbotIcon";
//import Navbar from "./Naru/Navbar";
//import Footer from "./components/Footer";
//import Home from "./components/Home";
//import Gallery from "./components/oneui/Gallery";
//import About from "./components/About";
//import YT from "./components/oneui/YT";
//import FoodHome from "./components/Food/FoodHome";
//import Employee from "./components/employee/Employee";
//import Portfolio from "./components/me/Portfolio";
//import ProductPage from "./components/ecommerce/ProductPage";
//import Studentinfo from "./components/student/StudentInfo";
//import Search from "./components/Search/PopupSearch";
//import Excelsheet from "./components/Sheets/Excelsheet";
import "./App.css";
const Age = lazy(() => import("./components/dob/Age"));
const ChatbotIcon = lazy(() => import("./components/ai/ChatbotIcon"));
const Navbar = lazy(() => import("./Naru/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./components/Home"));
const Gallery = lazy(() => import("./components/oneui/Gallery"));
const About = lazy(() => import("./components/About"));
const YT = lazy(() => import("./components/oneui/YT"));
const FoodHome = lazy(() => import("./components/Food/FoodHome"));
const Employee = lazy(() => import("./components/employee/Employee"));
const Portfolio = lazy(() => import("./components/me/Portfolio"));
const ProductPage = lazy(() => import("./components/ecommerce/ProductPage"));
const Studentinfo = lazy(() => import("./components/student/StudentInfo"));
const Search = lazy(() => import("./components/Search/PopupSearch"));
const Excelsheet = lazy(() => import("./components/Sheets/Excelsheet"));
const StatusPage = lazy(() => import("./components/StatusPage"));

const App = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
  };

  return (
    <Router>
      <Suspense fallback={<div className="loading-container"><PacmanLoader color="#36d7b7" /></div>}>
        <Navbar onSearchClick={handleSearchClick} />
      </Suspense>
      <Suspense fallback={<div className="loading-container"><PacmanLoader color="#36d7b7" /></div>}>
        <ChatbotIcon />
      </Suspense>
      <main className="content">
        <Suspense fallback={<div className="loading-container"><PacmanLoader color="#36d7b7" /></div>}>
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Navigate to="/home" replace />
                </motion.div>
              }
            />
            <Route
              path="/home"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/portfolio"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Portfolio />
                </motion.div>
              }
            />
            <Route
              path="/excelsheet"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Excelsheet />
                </motion.div>
              }
            />
            <Route
              path="/foodhome"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <FoodHome />
                </motion.div>
              }
            />
            <Route
              path="/employee"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Employee />
                </motion.div>
              }
            />
            <Route
              path="/studentinfo"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Studentinfo />
                </motion.div>
              }
            />
            <Route
              path="/yt"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <YT />
                </motion.div>
              }
            />
            <Route
              path="/gallery"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Gallery />
                </motion.div>
              }
            />


<Route
              path="/age"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Age />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <About />
                </motion.div>
              }
            />


            <Route
              path="/productpage"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ProductPage />
                </motion.div>
              }
            />
            <Route path="/status" element={<StatusPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Suspense fallback={<div className="loading-container"><PacmanLoader color="#36d7b7" /></div>}>
        <Search show={showSearch} onClose={handleCloseSearch} />
      </Suspense>
      <Suspense fallback={<div className="loading-container"><PacmanLoader color="#36d7b7" /></div>}>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;

