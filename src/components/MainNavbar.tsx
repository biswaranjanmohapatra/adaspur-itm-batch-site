import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Users, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.jpg';

const navLinks = [
  { name: 'Teachers', href: '#teachers', icon: GraduationCap },
  { name: 'Batches', href: '#batches', icon: Users },
];

export default function MainNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-secondary/20 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
              <img
                src={logo}
                alt="ITM Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="font-serif font-bold text-primary text-sm md:text-base">
              B.Sc ITM
            </span>
          </a>

          {/* Nav Links */}
          <div className="flex items-center gap-2 md:gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/5"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{link.name}</span>
                </a>
              );
            })}
            
            <Link to="/login">
              <Button
                size="sm"
                className="gap-1.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-xs md:text-sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
