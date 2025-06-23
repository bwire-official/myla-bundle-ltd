'use client';

import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaBars, 
  FaTimes, 
  FaSun, 
  FaMoon, 
  
  FaEnvelope, 
  FaInfoCircle,
  FaAward,
  FaStar,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaGlobe,
  FaLightbulb,
  FaHandshake,
  FaBuilding,
  FaBriefcase,
  FaRocket,
  FaCoins,
  FaCogs,
  FaPlus,
  FaGem,
  FaHeart
} from 'react-icons/fa';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, left: number, top: number}>>([]);
  const [fabOpen, setFabOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  // Services data
  const services = [
    {
      title: "Strategic Consulting",
      description: "High-level advice for growth-focused brands and ventures seeking market expansion and operational optimization.",
      icon: <FaLightbulb className="w-6 h-6" />
    },
    {
      title: "Private Deal Structuring",
      description: "Helping partners close clean capital-efficient deals.",
      icon: <FaCoins className="w-6 h-6" />
    },
    {
      title: "Digital Venture Building",
      description: "Supporting early product ideas and business models with strategic guidance and operational expertise.",
      icon: <FaRocket className="w-6 h-6" />
    },
    {
      title: "Capital Bundling",
      description: "Combining investor flows for efficient execution.",
      icon: <FaBriefcase className="w-6 h-6" />
    },
    {
      title: "Global Supply Chain Solutions",
      description: "Facilitating seamless cross-border commerce and international market access through strategic logistics partnerships and regulatory compliance.",
      icon: <FaGlobe className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    // Generate particle positions only on client side
    const particlePositions = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
    setParticles(particlePositions);

    // Scroll progress indicator and active section detection
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Active section detection
      const sections = ['about', 'services', 'partners', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // If we're at the top, set active to empty (hero section)
      if (scrollPosition < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-myla-black text-myla-white' : 'bg-myla-white text-myla-black'
    }`}>
      {/* Beautiful Navigation Bar */}
      <nav className={`fixed z-50 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-myla-black/20 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/30' 
          : 'bg-white/20 backdrop-blur-2xl border border-black/10 shadow-2xl shadow-gray-900/20'
      } ${
        // Mobile: floating with margins and rounded corners
        ' top-4 left-4 right-4 rounded-2xl px-4 py-2' +
        // Desktop: centered pill design
        ' lg:top-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:rounded-full lg:px-6 lg:py-2 lg:mx-4 lg:max-w-4xl lg:w-full'
      }`}>
        <div className="flex items-center justify-between h-12 lg:h-14">
          {/* Logo with CAC Verified */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <a href="#" className="flex items-center space-x-3 group">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-myla-blue-600 to-myla-blue-700 shadow-lg shadow-myla-blue-600/30' 
                  : 'bg-gradient-to-br from-myla-blue-500 to-myla-blue-600 shadow-lg shadow-myla-blue-500/30'
              }`}>
                <FaBuilding className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="block">
                <div className={`font-bold text-base md:text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-myla-black'
                }`}>
                  Myla Bundle Ltd
                </div>
                <div className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-myla-blue-400' : 'text-myla-blue-600'
                }`}>
                  CAC Verified
                </div>
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation with Icons */}
          <div className="hidden lg:flex items-center space-x-2">
            {[
              { href: "#about", label: "About", icon: FaInfoCircle },
              { href: "#services", label: "Services", icon: FaCogs },
              { href: "#partners", label: "Partners", icon: FaHandshake },
              { href: "#contact", label: "Contact", icon: FaEnvelope }
            ].map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className={`group relative flex items-center space-x-2 px-3 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-myla-blue-500 focus:ring-offset-2 ${
                    isActive
                      ? theme === 'dark'
                        ? 'text-white bg-myla-blue-600/30 border border-myla-blue-500/50'
                        : 'text-myla-black bg-myla-blue-100/80 border border-myla-blue-300/50'
                      : theme === 'dark' 
                        ? 'text-myla-gray-300 hover:text-white hover:bg-myla-gray-800/50 focus:bg-myla-gray-800/50' 
                        : 'text-myla-gray-600 hover:text-myla-black hover:bg-myla-gray-100/50 focus:bg-myla-gray-100/50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-myla-blue-400' : ''
                  }`} />
                  <span>{item.label}</span>
                </motion.a>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-myla-gray-800 hover:bg-myla-gray-700 text-myla-gray-300 hover:text-myla-yellow-400' 
                  : 'bg-myla-gray-100 hover:bg-myla-gray-200 text-myla-gray-600 hover:text-myla-orange-500'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`lg:hidden w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-myla-gray-800 hover:bg-myla-gray-700 text-myla-gray-300' 
                  : 'bg-myla-gray-100 hover:bg-myla-gray-200 text-myla-gray-600'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <FaTimes className="w-4 h-4 md:w-5 md:h-5" /> : <FaBars className="w-4 h-4 md:w-5 md:h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Beautiful Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`lg:hidden border-t mt-2 pt-4 ${
                theme === 'dark' 
                  ? 'border-white/10' 
                  : 'border-black/10'
              }`}
            >
              <div className="space-y-3">
                {[
                  { href: "#about", label: "About", icon: FaInfoCircle, description: "Learn about our company" },
                  { href: "#services", label: "Services", icon: FaCogs, description: "What we offer" },
                  { href: "#partners", label: "Partners", icon: FaHandshake, description: "Our partnerships" },
                  { href: "#contact", label: "Contact", icon: FaEnvelope, description: "Get in touch" }
                ].map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-myla-blue-500 focus:ring-offset-2 ${
                        isActive
                          ? theme === 'dark'
                            ? 'text-white bg-myla-blue-600/30 border border-myla-blue-500/50'
                            : 'text-myla-black bg-myla-blue-100/80 border border-myla-blue-300/50'
                          : theme === 'dark' 
                            ? 'text-myla-gray-300 hover:text-myla-white hover:bg-myla-gray-800/50 focus:bg-myla-gray-800/50' 
                            : 'text-myla-gray-600 hover:text-myla-black hover:bg-myla-gray-100/50 focus:bg-myla-gray-100/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                        isActive 
                          ? theme === 'dark' ? 'bg-myla-blue-600/50' : 'bg-myla-blue-200'
                          : theme === 'dark' ? 'bg-myla-blue-600/20' : 'bg-myla-blue-100'
                      }`}>
                        <item.icon className={`w-4 h-4 ${
                          isActive 
                            ? theme === 'dark' ? 'text-myla-blue-300' : 'text-myla-blue-700'
                            : theme === 'dark' ? 'text-myla-blue-400' : 'text-myla-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.label}</div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-myla-gray-400' : 'text-myla-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                        className={`w-2 h-2 rounded-full ${
                          isActive 
                            ? theme === 'dark' ? 'bg-myla-blue-300' : 'bg-myla-blue-700'
                            : theme === 'dark' ? 'bg-myla-blue-400' : 'bg-myla-blue-600'
                        }`}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content with Proper Top Spacing */}
      <div className="">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                animate={{
                  x: [0, particle.left - 50],
                  y: [0, particle.top - 50],
                  scale: [0, 1],
                  opacity: [0, 0.5],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                className={`absolute w-2 h-2 rounded-full ${
                  theme === 'dark' ? 'bg-myla-blue-400' : 'bg-myla-blue-600'
                }`}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
              />
            ))}
            
            {/* Particle Trail Effect */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, ${theme === 'dark' ? '#3B82F6' : '#1E40AF'} 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, ${theme === 'dark' ? '#F59E0B' : '#D97706'} 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, ${theme === 'dark' ? '#8B5CF6' : '#7C3AED'} 0%, transparent 50%)`,
                backgroundSize: '200% 200%',
                backgroundRepeat: 'no-repeat',
              }}
            />
            
            {/* Larger Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute top-20 left-10 w-16 h-16 md:w-32 md:h-32 rounded-full opacity-10 ${
                theme === 'dark' ? 'bg-myla-blue-600' : 'bg-myla-blue-200'
              }`}
            />
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className={`absolute top-40 right-20 w-12 h-12 md:w-24 md:h-24 rounded-full opacity-10 ${
                theme === 'dark' ? 'bg-myla-gold-600' : 'bg-myla-gold-200'
              }`}
            />
            <motion.div 
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              className={`absolute bottom-40 left-1/4 w-10 h-10 md:w-20 md:h-20 rounded-full opacity-10 ${
                theme === 'dark' ? 'bg-myla-gray-600' : 'bg-myla-gray-300'
              }`}
            />

            {/* Gradient Orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2],
                opacity: [0.3, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className={`absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full blur-3xl ${
                theme === 'dark' ? 'bg-myla-blue-600/20' : 'bg-myla-blue-400/20'
              }`}
            />
            <motion.div
              animate={{
                scale: [1.2, 1],
                opacity: [0.4, 0.7],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 2,
              }}
              className={`absolute bottom-1/4 left-1/4 w-24 h-24 md:w-48 md:h-48 rounded-full blur-3xl ${
                theme === 'dark' ? 'bg-myla-gold-600/20' : 'bg-myla-gold-400/20'
              }`}
            />
          </div>

          <div className="container-custom text-center px-4 relative z-10 pb-16 pt-32">
            {/* Professional Hero Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
              {/* Company Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 md:mb-8 ${
                  theme === 'dark' 
                    ? 'bg-myla-blue-600/20 backdrop-blur-xl text-myla-blue-300 border border-white/10 shadow-lg shadow-myla-blue-600/20' 
                    : 'bg-myla-blue-50/80 backdrop-blur-xl text-myla-blue-700 border border-black/10 shadow-lg shadow-myla-blue-500/20'
                }`}
              >
                <FaShieldAlt className="w-4 h-4 mr-2" />
                CAC-Verified Company
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight px-2"
              >
                <span className={`bg-gradient-to-r from-myla-gold-500 via-myla-blue-600 to-myla-gold-500 bg-clip-text text-transparent ${
                  theme === 'dark' ? 'drop-shadow-lg' : ''
                }`}>
                  Myla Bundle Ltd
                </span>
              </motion.h1>
              
              {/* Professional Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8 md:mb-12 px-2"
              >
                <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl mx-auto ${
                  theme === 'dark' ? 'text-myla-gray-200' : 'text-myla-gray-700'
                }`}>
                  Smart Digital Ventures. 
                  <span className={`font-medium mx-2 ${
                    theme === 'dark' ? 'text-myla-blue-400' : 'text-myla-blue-600'
                  }`}>
                    Private Capital.
                  </span>
                  Bundled Value Delivery.
                </p>
              </motion.div>

              {/* Professional Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4 ${
                  theme === 'dark' ? 'text-myla-gray-400' : 'text-myla-gray-600'
                }`}>
                We transform strategic visions into scalable digital realities. Our CAC-verified platform delivers bundled value through private capital deployment and innovative venture building across global markets.
              </motion.p>
            </div>
            
            {/* Professional CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 md:mb-16 px-4"
            >
              <motion.a 
                href="#about" 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-myla-blue-600/30 backdrop-blur-xl text-white border border-white/10 shadow-2xl shadow-myla-blue-600/30 hover:bg-myla-blue-600/50 hover:shadow-myla-blue-600/50' 
                    : 'bg-myla-blue-500/30 backdrop-blur-xl text-white border border-black/10 shadow-2xl shadow-myla-blue-500/30 hover:bg-myla-blue-500/50 hover:shadow-myla-blue-500/50'
                }`}
              >
                Learn More
              </motion.a>
            </motion.div>

            {/* Professional Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
            >
              {[
                { number: "100+", label: "Strategic Deals", icon: FaHandshake },
                { number: "$50M+", label: "Capital Managed", icon: FaCoins },
                { number: "24/7", label: "Global Support", icon: FaGlobe }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`text-center p-4 sm:p-6 rounded-2xl backdrop-blur-xl border ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/10 hover:bg-white/20 shadow-2xl shadow-black/20' 
                      : 'bg-black/10 border-black/10 hover:bg-black/20 shadow-2xl shadow-gray-900/20'
                  }`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl flex items-center justify-center ${
                    theme === 'dark' 
                      ? 'bg-myla-blue-600/30 backdrop-blur-sm text-myla-blue-400 border border-white/10' 
                      : 'bg-myla-blue-100/80 backdrop-blur-sm text-myla-blue-600 border border-black/10'
                  }`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-myla-black'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-xs sm:text-sm font-medium ${
                    theme === 'dark' ? 'text-myla-gray-400' : 'text-myla-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-16 md:py-20 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-myla-gray-900' : 'bg-myla-white'
        }`}>
          <div className="container-custom px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
            >
              About Us
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-6 text-base md:text-lg leading-relaxed"
            >
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Myla Bundle Ltd is a privately held CAC-verified company operating at the intersection of digital innovation and strategic capital deployment.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                We focus on lean, modern digital operations that deliver scalable value across diverse market segments. Our approach combines cutting-edge technology with proven business methodologies.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Operating silently but effectively across different markets, we maintain a low-profile presence while driving significant impact through our strategic partnerships and ventures.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Our vision centers on scalable systems, high-efficiency ventures, and capital control—ensuring sustainable growth and value creation for our partners and stakeholders.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* What We Do Section */}
        <section id="services" className="py-16 md:py-20 bg-myla-gray-50 dark:bg-myla-gray-900">
          <div className="container-custom px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 ${
                theme === 'dark' ? 'text-white' : 'text-myla-black'
              }`}
            >
              What We Do
            </motion.h2>
            
            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`group relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/10 hover:bg-white/20 shadow-2xl shadow-black/20' 
                      : 'bg-black/10 border-black/10 hover:bg-black/20 shadow-2xl shadow-gray-900/20'
                  }`}
                >
                  {/* Animated Background Gradient */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-myla-blue-500/20 to-myla-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ opacity: 1 }}
                  />
                  
                  {/* Icon with Glassmorphism */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10 ${
                      theme === 'dark' 
                        ? 'bg-myla-blue-600/30 text-myla-blue-400 border border-white/10' 
                        : 'bg-myla-blue-100/80 text-myla-blue-600 border border-black/10'
                    }`}
                  >
                    {service.icon}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className={`text-lg font-bold mb-3 group-hover:text-myla-blue-400 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-myla-black'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-600'
                    }`}>
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Effect Indicator */}
                  <motion.div
                    className={`absolute bottom-0 left-1/2 w-0 h-1 rounded-full ${
                      theme === 'dark' ? 'bg-myla-blue-400' : 'bg-myla-blue-600'
                    }`}
                    initial={{ width: 0, x: '-50%' }}
                    whileHover={{ width: '80%', x: '-50%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners & Recognition Section */}
        <section id="partners" className={`py-16 md:py-20 transition-colors duration-300 relative overflow-hidden ${
          theme === 'dark' ? 'bg-myla-gray-900' : 'bg-myla-white'
        }`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(45deg, ${
                theme === 'dark' ? '#3b82f6' : '#1e40af'
              } 25%, transparent 25%), linear-gradient(-45deg, ${
                theme === 'dark' ? '#3b82f6' : '#1e40af'
              } 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${
                theme === 'dark' ? '#3b82f6' : '#1e40af'
              } 75%), linear-gradient(-45deg, transparent 75%, ${
                theme === 'dark' ? '#3b82f6' : '#1e40af'
              } 75%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }} />
          </div>

          <div className="container-custom relative z-10 px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
            >
              <span className={`bg-gradient-to-r ${
                theme === 'dark' 
                  ? 'from-myla-white via-myla-blue-300 to-myla-white' 
                  : 'from-myla-black via-myla-blue-600 to-myla-black'
              } bg-clip-text text-transparent`}>
                Partners & Recognition
              </span>
            </motion.h2>

            {/* Awards Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-16 md:mb-20"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Awards & Recognition</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  { title: "Excellence in Digital Ventures", description: "Recognized for outstanding performance in digital innovation", icon: FaAward, color: "gold" },
                  { title: "Strategic Partnership Award", description: "Awarded for exceptional partnership development", icon: FaHandshake, color: "blue" },
                  { title: "Capital Management Excellence", description: "Recognized for superior capital deployment strategies", icon: FaChartLine, color: "blue" }
                ].map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group relative p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-500 ${
                      theme === 'dark' ? 'glass-card-dark' : 'glass-card'
                    }`}
                  >
                    {/* Gradient Border Effect */}
                    <motion.div 
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-myla-blue-500 to-myla-gold-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      whileHover={{ opacity: 0.2 }}
                    />
                    
                    {/* Icon with Enhanced Styling */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 relative z-10 bg-gradient-to-br from-myla-blue-500 to-myla-blue-600 shadow-lg shadow-myla-blue-500/30`}
                    >
                      <div className="text-white">
                        <award.icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                    </motion.div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 group-hover:text-myla-blue-600 transition-colors duration-300">
                        {award.title}
                      </h3>
                      <p className={`text-sm md:text-base leading-relaxed ${
                        theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-600'
                      }`}>
                        {award.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-myla-blue-600/10 to-myla-blue-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Core Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    title: "Excellence",
                    description: "We pursue excellence in every venture, maintaining the highest standards of quality and performance across all our operations.",
                    icon: <FaStar className="w-6 h-6" />
                  },
                  {
                    title: "Innovation",
                    description: "Constantly pushing boundaries and embracing cutting-edge solutions to create sustainable value for our partners.",
                    icon: <FaLightbulb className="w-6 h-6" />
                  },
                  {
                    title: "Integrity",
                    description: "Building trust through transparent operations, ethical practices, and unwavering commitment to our promises.",
                    icon: <FaShieldAlt className="w-6 h-6" />
                  },
                  {
                    title: "Efficiency",
                    description: "Optimizing resources and processes to deliver maximum value with minimal waste and optimal capital utilization.",
                    icon: <FaCogs className="w-6 h-6" />
                  },
                  {
                    title: "Partnership",
                    description: "Fostering long-term relationships built on mutual success, shared vision, and collaborative growth strategies.",
                    icon: <FaHandshake className="w-6 h-6" />
                  },
                  {
                    title: "Sustainability",
                    description: "Creating lasting impact through sustainable business models that benefit stakeholders and communities.",
                    icon: <FaGlobe className="w-6 h-6" />
                  }
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`p-6 rounded-2xl backdrop-blur-xl border ${
                      theme === 'dark' 
                        ? 'bg-white/10 border-white/10 hover:bg-white/20 shadow-2xl shadow-black/20' 
                        : 'bg-black/10 border-black/10 hover:bg-black/20 shadow-2xl shadow-gray-900/20'
                    }`}
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        theme === 'dark' 
                          ? 'bg-myla-blue-600/30 text-myla-blue-400 border border-white/10' 
                          : 'bg-myla-blue-100/80 text-myla-blue-600 border border-black/10'
                      }`}
                    >
                      {value.icon}
                    </motion.div>

                    {/* Content */}
                    <h4 className={`text-lg font-bold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-myla-black'
                    }`}>
                      {value.title}
                    </h4>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-600'
                    }`}>
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-16 md:py-20 transition-colors duration-300 relative overflow-hidden ${
          theme === 'dark' ? 'bg-myla-black' : 'bg-myla-gray-50'
        }`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${
                theme === 'dark' ? '#3b82f6' : '#1e40af'
              } 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="container-custom relative z-10 px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
            >
              <span className={`bg-gradient-to-r ${
                theme === 'dark' 
                  ? 'from-myla-white via-myla-blue-300 to-myla-white' 
                  : 'from-myla-black via-myla-blue-600 to-myla-black'
              } bg-clip-text text-transparent`}>
                Let&apos;s Talk Vision
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-center text-lg md:text-xl max-w-3xl mx-auto mb-12 md:mb-16 ${
                theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-600'
              }`}>
              For private inquiries, collaborations, or partnerships. 
              We&apos;re here to discuss your vision and explore opportunities.
            </motion.p>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-700'
                    }`}>
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full px-4 py-3 bg-transparent border-b-2 transition-all duration-300 focus:outline-none ${
                          theme === 'dark' 
                            ? 'border-myla-gray-600 focus:border-myla-blue-400 text-white placeholder-myla-gray-400' 
                            : 'border-myla-gray-300 focus:border-myla-blue-500 text-black placeholder-myla-gray-500'
                        }`}
                        placeholder="Your name"
                      />
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 ${
                          theme === 'dark' ? 'bg-myla-blue-400' : 'bg-myla-blue-500'
                        }`}
                        initial={{ width: 0 }}
                        whileFocus={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-700'
                    }`}>
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className={`w-full px-4 py-3 bg-transparent border-b-2 transition-all duration-300 focus:outline-none ${
                          theme === 'dark' 
                            ? 'border-myla-gray-600 focus:border-myla-blue-400 text-white placeholder-myla-gray-400' 
                            : 'border-myla-gray-300 focus:border-myla-blue-500 text-black placeholder-myla-gray-500'
                        }`}
                        placeholder="your@email.com"
                      />
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 ${
                          theme === 'dark' ? 'bg-myla-blue-400' : 'bg-myla-blue-500'
                        }`}
                        initial={{ width: 0 }}
                        whileFocus={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-700'
                  }`}>
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={`w-full px-4 py-3 bg-transparent border-b-2 transition-all duration-300 focus:outline-none ${
                        theme === 'dark' 
                          ? 'border-myla-gray-600 focus:border-myla-blue-400 text-white placeholder-myla-gray-400' 
                          : 'border-myla-gray-300 focus:border-myla-blue-500 text-black placeholder-myla-gray-500'
                      }`}
                      placeholder="How can we help?"
                    />
                    <motion.div
                      className={`absolute bottom-0 left-0 h-0.5 ${
                        theme === 'dark' ? 'bg-myla-blue-400' : 'bg-myla-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      whileFocus={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-700'
                  }`}>
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      className={`w-full px-4 py-3 bg-transparent border-b-2 transition-all duration-300 focus:outline-none resize-none ${
                        theme === 'dark' 
                          ? 'border-myla-gray-600 focus:border-myla-blue-400 text-white placeholder-myla-gray-400' 
                          : 'border-myla-gray-300 focus:border-myla-blue-500 text-black placeholder-myla-gray-500'
                      }`}
                      placeholder="Tell us about your project..."
                    />
                    <motion.div
                      className={`absolute bottom-0 left-0 h-0.5 ${
                        theme === 'dark' ? 'bg-myla-blue-400' : 'bg-myla-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      whileFocus={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-myla-blue-600 to-myla-blue-700 text-white shadow-lg shadow-myla-blue-600/25' 
                      : 'bg-gradient-to-r from-myla-blue-500 to-myla-blue-600 hover:from-myla-blue-600 hover:to-myla-blue-700 text-white shadow-myla-blue-500/25'
                  }`}
                >
                  Send Message
                </motion.button>
              </motion.form>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className={`p-6 md:p-8 rounded-2xl backdrop-blur-sm border ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/50 border-myla-gray-200/50'
                }`}
              >
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      theme === 'dark' 
                        ? 'bg-myla-blue-600/20 text-myla-blue-400' 
                        : 'bg-myla-blue-100 text-myla-blue-600'
                    }`}>
                      <FaEnvelope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a 
                        href="mailto:contact@mylabundleltd.com"
                        className={`hover:text-myla-blue-500 transition-colors duration-300 ${
                          theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-600'
                        }`}
                      >
                        contact@mylabundleltd.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      theme === 'dark' 
                        ? 'bg-myla-blue-600/20 text-myla-blue-400' 
                        : 'bg-myla-blue-100 text-myla-blue-600'
                    }`}>
                      <FaBuilding className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className={`${
                        theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-600'
                      }`}>
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      theme === 'dark' 
                        ? 'bg-myla-blue-600/20 text-myla-blue-400' 
                        : 'bg-myla-blue-100 text-myla-blue-600'
                    }`}>
                      <FaUsers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className={`${
                        theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-600'
                      }`}>
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Priority Contact CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className={`mt-8 p-6 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-myla-blue-600/10 border border-myla-blue-500/20' 
                      : 'bg-myla-blue-50 border border-myla-blue-200'
                  }`}
                >
                  <h4 className="font-semibold mb-2">Priority Inquiries</h4>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-600'
                  }`}>
                    For urgent matters or high-value partnerships, 
                    we offer expedited response times.
                  </p>
                  <a
                    href="mailto:priority@mylabundleltd.com"
                    className={`inline-flex items-center space-x-2 text-sm font-medium ${
                      theme === 'dark' ? 'text-myla-blue-400' : 'text-myla-blue-600'
                    } hover:underline`}
                  >
                    <FaEnvelope className="w-4 h-4" />
                    <span>Priority Contact</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-16 px-4 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-myla-black' : 'bg-myla-gray-900'
        } text-myla-gray-400`}>
          <div className="container-custom">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    theme === 'dark' ? 'bg-myla-blue-600' : 'bg-gradient-to-br from-myla-blue-600 to-myla-blue-700'
                  }`}>
                    <FaBuilding className="text-xl text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">Myla Bundle Ltd</div>
                    <div className="text-sm">CAC Verified Company</div>
                  </div>
                </div>
                <p className={`text-lg leading-relaxed mb-6 max-w-md ${
                  theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-200'
                }`}>
                  Smart Digital Ventures. Private Capital. Bundled Value Delivery. We transform visions into scalable realities.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: FaEnvelope, href: "mailto:contact@mylabundleltd.com", label: "Email" },
                    { icon: FaBuilding, href: "#", label: "Office" },
                    { icon: FaUsers, href: "#", label: "Team" }
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-myla-gray-800 hover:bg-myla-blue-600 text-myla-gray-400 hover:text-white' 
                          : 'bg-myla-gray-800 hover:bg-myla-blue-600 text-myla-gray-400 hover:text-white'
                      }`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { href: "#about", label: "About Us" },
                    { href: "#services", label: "Services" },
                    { href: "#partners", label: "Partners" },
                    { href: "#contact", label: "Contact" }
                  ].map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5 }}
                        className={`transition-colors duration-300 hover:text-myla-blue-400 ${
                          theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-200'
                        }`}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
                <ul className="space-y-3">
                  {[
                    "Strategic Consulting",
                    "Private Deal Structuring", 
                    "Digital Venture Building",
                    "Capital Bundling"
                  ].map((service) => (
                    <li key={service}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className={`transition-colors duration-300 hover:text-myla-blue-400 cursor-pointer ${
                          theme === 'dark' ? 'text-myla-gray-300' : 'text-myla-gray-200'
                        }`}
                      >
                        {service}
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className={`border-t mb-8 ${
              theme === 'dark' ? 'border-myla-gray-800' : 'border-myla-gray-700'
            }`} />

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                <div className="text-sm">
                  © 2025 Myla Bundle Ltd. All rights reserved.
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span>CAC Reg No: RC123456</span>
                  <span>•</span>
                  <span>ISO 9001:2015 Certified</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  Site built by 
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    className="ml-1 text-myla-blue-400 hover:text-myla-blue-300 font-medium"
                  >
                    Bwire
                  </motion.a>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-myla-green-500' : 'bg-myla-green-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-myla-blue-600 hover:bg-myla-blue-700 text-white' 
                  : 'bg-myla-blue-500 hover:bg-myla-blue-600 text-white'
              }`}
              aria-label="Back to top"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-50">
              <motion.div
                className={`h-full ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-myla-blue-600 to-myla-gold-600' 
                    : 'bg-gradient-to-r from-myla-blue-500 to-myla-gold-500'
                }`}
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 left-8 z-40">
              <motion.button
                onClick={() => setFabOpen(!fabOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-myla-gold-500 to-myla-gold-600 text-white' 
                    : 'bg-gradient-to-br from-myla-gold-400 to-myla-gold-500 text-white'
                }`}
              >
                <motion.div
                  animate={{ rotate: fabOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaPlus className="w-6 h-6" />
                </motion.div>
              </motion.button>

              {/* FAB Menu Items */}
              <AnimatePresence>
                {fabOpen && (
                  <>
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className={`absolute bottom-16 left-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-myla-blue-600 hover:bg-myla-blue-700 text-white' 
                          : 'bg-myla-blue-500 hover:bg-myla-blue-600 text-white'
                      }`}
                      onClick={() => window.open('mailto:contact@mylabundleltd.com')}
                    >
                      <FaEnvelope className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                      className={`absolute bottom-24 left-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-myla-green-600 hover:bg-myla-green-700 text-white' 
                          : 'bg-myla-green-500 hover:bg-myla-green-600 text-white'
                      }`}
                      onClick={() => window.open('#services', '_self')}
                    >
                      <FaStar className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                      className={`absolute bottom-32 left-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-myla-purple-600 hover:bg-myla-purple-700 text-white' 
                          : 'bg-myla-purple-500 hover:bg-myla-purple-600 text-white'
                      }`}
                      onClick={() => window.open('#partners', '_self')}
                    >
                      <FaHeart className="w-5 h-5" />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Floating Gem Indicator */}
            <motion.div
              animate={{ 
                y: [0, -10],
                rotate: [0, 5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`fixed top-20 right-8 z-30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-myla-gold-500 to-myla-gold-600 text-white' 
                  : 'bg-gradient-to-br from-myla-gold-400 to-myla-gold-500 text-white'
              }`}
            >
              <FaGem className="w-6 h-6" />
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
}