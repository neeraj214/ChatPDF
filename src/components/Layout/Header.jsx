import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiMenu, FiX } from 'react-icons/fi'; // Added FiMenu and FiX for mobile

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkVariants = {
    hover: {
      scale: 1.1,
      color: '#2563EB', // blue-600
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/upload", label: "Upload PDF" },
    // Add more links here if needed, e.g.:
    // { path: "/features", label: "Features" },
    // { path: "/pricing", label: "Pricing" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 
                  ${isScrolled ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg' : 'bg-white dark:bg-gray-800 shadow-md'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.div variants={logoVariants} whileHover="hover">
          <Link to="/" className="flex items-center space-x-2">
            <FiMessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ChatPDF AI</h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <motion.div key={item.label} variants={navLinkVariants} whileHover="hover" whileTap="tap">
              <Link
                to={item.path}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
           <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
             <Link 
                to="/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
             >
                Get Started
             </Link>
           </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-800 shadow-lg pb-4"
        >
          <nav className="flex flex-col items-center space-y-4 pt-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 text-lg font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link 
                to="/upload"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg w-4/5 text-center"
             >
                Get Started
             </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;