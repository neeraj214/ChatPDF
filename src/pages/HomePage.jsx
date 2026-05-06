import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { FiUploadCloud, FiMessageSquare, FiCheckCircle, FiCpu, FiShield, FiZap, FiBookOpen, FiBriefcase, FiFileText } from 'react-icons/fi';

// Import Lottie animations
import aiChatAnimation from '../assets/animations/ai-chat-animation.json'; // Restored local animation
import documentScanAnimation from '../assets/animations/document-scan-animation.json';
import uploadAnimation from '../assets/animations/upload-animation.json'; // Added for floating element
import chatThinkingAnimation from '../assets/animations/chat-thinking.json'; // Import for the second floating element

const HomePage = () => {

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const cardHover = {
    hover: {
      y: -8,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const featureCards = [
    {
      icon: <FiZap size={32} className="text-indigo-500 dark:text-indigo-400 mb-4" />,
      title: "Instantaneous Insights",
      description: "Upload your PDF and get answers in seconds. No more tedious searching."
    },
    {
      icon: <FiCpu size={32} className="text-green-500 dark:text-green-400 mb-4" />,
      title: "AI-Powered Summaries",
      description: "Let our advanced AI summarize lengthy documents, extracting key information for you."
    },
    {
      icon: <FiShield size={32} className="text-red-500 dark:text-red-400 mb-4" />,
      title: "Secure & Confidential",
      description: "Your documents are processed with the utmost security and privacy. We don't store your files."
    }
  ];

  const howItWorksSteps = [
    {
      icon: <FiUploadCloud size={40} className="text-blue-500 dark:text-blue-400" />,
      title: "Upload Your PDF",
      description: "Simply drag and drop or select your PDF file. We support various PDF formats and sizes."
    },
    {
      icon: <FiMessageSquare size={40} className="text-purple-500 dark:text-purple-400" />,
      title: "Ask Questions",
      description: "Type your questions in natural language. Our AI understands context and intent."
    },
    {
      icon: <FiCheckCircle size={40} className="text-teal-500 dark:text-teal-400" />,
      title: "Get Instant Answers",
      description: "Receive accurate answers, summaries, and insights directly from your document's content."
    }
  ];

  const useCases = [
    {
      icon: <FiBookOpen size={32} className="text-sky-500 dark:text-sky-400" />,
      title: "Academic Research",
      description: "Quickly extract key findings, summaries, and citations from research papers and academic articles."
    },
    {
      icon: <FiBriefcase size={32} className="text-emerald-500 dark:text-emerald-400" />,
      title: "Legal Document Review",
      description: "Efficiently analyze contracts, case files, and legal briefs to identify critical information."
    },
    {
      icon: <FiFileText size={32} className="text-amber-500 dark:text-amber-400" />,
      title: "Business Report Analysis",
      description: "Digest dense business reports, financial statements, and market analyses for faster decision-making."
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="flex flex-col items-center text-center overflow-x-hidden pt-20 bg-gray-100 dark:bg-gray-900" // pt-20 for fixed header, added overall bg
    >
      {/* Hero Section */}
      <section className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center relative overflow-hidden py-10 md:py-12">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <Lottie
            animationData={documentScanAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '0',
              left: '0',
              opacity: 0.4,
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-600/40 to-pink-500/40 dark:from-indigo-800/40 dark:via-purple-800/40 dark:to-pink-700/40 z-1"></div>
        
        {/* Decorative background elements */}
        <div className="absolute inset-0 z-2">
          <span className="absolute top-1/4 left-1/4 w-56 h-56 md:w-72 md:h-72 bg-white/10 rounded-full animate-pulse-slow filter blur-xl"></span>
          <span className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-56 md:h-56 bg-white/5 rounded-full animate-pulse-slower filter blur-xl"></span>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center"
          >
            <div className="flex flex-col justify-center space-y-5 md:space-y-6 text-left">
              <motion.h1 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                Chat Your Way Through PDFs.
                <span className="block text-yellow-300 dark:text-yellow-400 mt-1 md:mt-2">Instantly. Intelligently.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="max-w-xl text-base sm:text-lg md:text-xl text-indigo-100 dark:text-indigo-200">
                Stop scanning, start conversing. ChatPDF AI transforms your static documents into dynamic knowledge sources. Upload, ask, and discover with the power of AI.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-indigo-600 transform active:scale-95"
                >
                  <FiUploadCloud className="mr-2 -ml-1 h-5 w-5 sm:h-6 sm:w-6" /> Get Started Free
                </Link>
                <Link
                  to="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg bg-transparent border-2 border-white px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transform active:scale-95"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            <div className="flex items-center justify-center lg:justify-end relative">
              {/* Existing Lottie Animation */}
              <motion.div 
                className="relative w-full max-w-lg p-4 bg-white/5 rounded-2xl backdrop-blur-sm shadow-xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur opacity-30"></div>
                <Lottie
                  animationData={aiChatAnimation}
                  loop={true}
                  autoplay={true}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    minHeight: '300px',
                    margin: '0 auto',
                  }}
                />
              </motion.div>

              {/* New Floating Lottie Animation */}
              <motion.div
                className="absolute -bottom-10 -left-16 z-20 hidden lg:block"
                initial={{ y: 0, opacity: 0.8 }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <Lottie
                  animationData={uploadAnimation}
                  loop={true}
                  autoplay={true}
                  style={{
                    width: '120px',
                    height: '120px',
                    opacity: 0.7,
                  }}
                />
              </motion.div>

              {/* Second Floating Animation */}
              <motion.div
                className="absolute -top-10 -right-16 z-20 hidden lg:block"
                initial={{ y: 0, opacity: 0.8 }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Lottie
                  animationData={chatThinkingAnimation}
                  loop={true}
                  autoplay={true}
                  style={{
                    width: '100px',
                    height: '100px',
                    opacity: 0.8,
                  }}
                />
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Unlock the Power of Your PDFs
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              ChatPDF AI is packed with cutting-edge features to make your document interaction seamless, intelligent, and secure.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                className="p-8 bg-gray-50 dark:bg-slate-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform flex flex-col items-center text-center border border-transparent hover:border-indigo-500 dark:hover:border-indigo-400"
              >
                <motion.div variants={cardHover} className="w-full">
                  <div className="p-3 inline-block bg-indigo-100 dark:bg-indigo-500/20 rounded-full mb-5">
                    {React.cloneElement(feature.icon, { size: 30, className: "text-indigo-600 dark:text-indigo-400" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - Modernized */}
      <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 bg-gray-100 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Get Answers in 3 Simple Steps
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Using ChatPDF AI is intuitive and straightforward. Transform your documents into interactive conversations effortlessly.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Connecting line - visible on md and up */} 
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 dark:bg-indigo-700/50 transform -translate-y-1/2 w-2/3 mx-auto" style={{top: 'calc(2rem + 20px)' /* Adjust based on icon size + padding */}}></div>
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 z-10 border border-gray-200 dark:border-slate-700"
              >
                <div className="p-4 bg-indigo-500 text-white rounded-full mb-6 shadow-lg ring-4 ring-indigo-500/30 dark:ring-indigo-400/30">
                  {React.cloneElement(step.icon, { size: 32, className: "" })}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center">{step.description}</p>
                 {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-indigo-700 text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section - NEW */}
      <section id="use-cases" className="w-full py-16 md:py-24 lg:py-32 bg-gray-100 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Versatile Applications for Every Need
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Discover how ChatPDF AI can be tailored to various professional and academic scenarios, enhancing productivity and understanding.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform flex flex-col items-center text-center border border-gray-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400"
              >
                <motion.div variants={cardHover} className="w-full">
                  <div className={`p-3 inline-block rounded-full mb-5 ${
                    index === 0 ? 'bg-sky-100 dark:bg-sky-500/20' : index === 1 ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-amber-100 dark:bg-amber-500/20'
                  }`}>
                    {React.cloneElement(useCase.icon, { size: 30, className: `${
                      index === 0 ? 'text-sky-600 dark:text-sky-400' : index === 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                    }` })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{useCase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{useCase.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
        <div className="container px-4 md:px-6 text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Document Workflow?
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-xl mx-auto text-lg text-blue-100 dark:text-blue-200 mb-10">
            Join thousands of users who are already saving time and gaining deeper insights from their PDFs. 
            Try ChatPDF AI today – it's free to get started!
          </motion.p>
          <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-10 py-4 text-xl font-semibold text-indigo-700 shadow-xl transition-transform duration-300 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              <FiZap className="mr-2 -ml-1 h-6 w-6" /> Start Chatting Now
            </Link>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
};

export default HomePage;

// Make sure to import chatThinkingAnimation if you use it
// import chatThinkingAnimation from '../assets/animations/chat-thinking.json';