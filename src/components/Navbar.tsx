import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import logoImage from '@/assets/logo.jpg';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Teachers', href: '#teachers' },
  { name: 'Students', href: '#students' },
  { name: 'Memories', href: '#memories' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveLink(`#${section}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-xl shadow-xl border-b border-secondary/20' 
          : 'bg-transparent'
      }`}
    >
      {/* Animated gradient line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isScrolled ? 1 : 0, 
          opacity: isScrolled ? 1 : 0 
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with glow effect */}
          <motion.a 
            href="#home" 
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-secondary/50 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src={logoImage} 
                alt="B.Sc ITM Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-secondary shadow-lg relative z-10 group-hover:border-secondary/80 transition-all duration-300"
              />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-secondary" />
              </motion.div>
            </motion.div>
            <div className={`font-serif font-bold text-lg transition-all duration-300 ${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}>
              <motion.span 
                className="hidden sm:inline"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                B.Sc ITM
              </motion.span>
              <span className="sm:hidden">ITM</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                onClick={() => setActiveLink(link.href)}
                className={`relative px-4 py-2 font-medium rounded-full transition-all duration-300 ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                } ${activeLink === link.href ? 'text-secondary' : ''}`}
              >
                {/* Active indicator */}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-secondary/10 border border-secondary/30 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Hover effect */}
                <motion.span
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.span>
                {/* Underline animation */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-secondary rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "60%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'text-foreground bg-secondary/10 hover:bg-secondary/20' 
                : 'text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveLink(link.href);
                  }}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl text-foreground font-medium transition-all duration-300 ${
                    activeLink === link.href 
                      ? 'bg-secondary/10 text-secondary border-l-2 border-secondary' 
                      : 'hover:bg-secondary/5 hover:text-secondary'
                  }`}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-secondary"
                    animate={{ scale: activeLink === link.href ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.5, repeat: activeLink === link.href ? Infinity : 0 }}
                  />
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}