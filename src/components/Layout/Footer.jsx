import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'; // Example social icons

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      color: '#3B82F6', // blue-500
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About/Brand */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">ChatPDF AI</h3>
            <p className="text-sm leading-relaxed">
              Unlock insights from your documents effortlessly. Ask questions, get summaries, and interact with your PDFs like never before.
            </p>
          </div>

          {/* Column 2: Quick Links (Optional) */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/upload" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Upload PDF</a></li>
              <li><a href="#features" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Features</a></li> 
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Column 3: Social Media & Contact */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <motion.a href="#" variants={iconVariants} whileHover="hover" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <FiGithub size={24} />
              </motion.a>
              <motion.a href="#" variants={iconVariants} whileHover="hover" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <FiLinkedin size={24} />
              </motion.a>
              <motion.a href="#" variants={iconVariants} whileHover="hover" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <FiTwitter size={24} />
              </motion.a>
            </div>
            <p className="text-sm">contact@chatpdfai.com</p>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ChatPDF AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Empowering you with AI-driven document analysis.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;