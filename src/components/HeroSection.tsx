import { motion } from 'framer-motion';
import { GraduationCap, Users, Calendar, MapPin, Sparkles } from 'lucide-react';
import logoImage from '@/assets/logo.jpg';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary-foreground/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-foreground/5 rounded-full" />
        {/* Floating sparkles */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 right-1/4"
        >
          <Sparkles className="w-6 h-6 text-secondary/30" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [360, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-1/3 left-1/4"
        >
          <Sparkles className="w-4 h-4 text-secondary/20" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* College Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <img 
              src={logoImage} 
              alt="B.Sc ITM Logo" 
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover border-4 border-secondary shadow-2xl shadow-secondary/30"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8"
          >
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-primary-foreground/90 text-sm font-medium">Batch 2021-2024</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
          >
            Udayanath Autonomous College
            <br />
            <span className="text-gradient-gold">Of Science & Technology</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8"
          >
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <GraduationCap className="w-5 h-5 text-secondary" />
              <span className="text-lg font-medium">B.Sc ITM Department</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-primary-foreground/50 rounded-full" />
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="text-lg">Adaspur, Cuttack, Odisha</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-12"
          >
            Celebrating the journey of 30 brilliant minds who embarked on their IT Management adventure together. 
            Forever bonded by memories, friendships, and the pursuit of knowledge.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto"
          >
            <div className="text-center p-4 bg-primary-foreground/5 rounded-xl backdrop-blur-sm border border-primary-foreground/10">
              <div className="text-3xl sm:text-4xl font-bold text-secondary mb-1">30</div>
              <div className="text-primary-foreground/60 text-sm">Students</div>
            </div>
            <div className="text-center p-4 bg-primary-foreground/5 rounded-xl backdrop-blur-sm border border-primary-foreground/10">
              <div className="text-3xl sm:text-4xl font-bold text-secondary mb-1">3</div>
              <div className="text-primary-foreground/60 text-sm">Teachers</div>
            </div>
            <div className="text-center p-4 bg-primary-foreground/5 rounded-xl backdrop-blur-sm border border-primary-foreground/10">
              <div className="text-3xl sm:text-4xl font-bold text-secondary mb-1">∞</div>
              <div className="text-primary-foreground/60 text-sm">Memories</div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-primary-foreground/50 text-xs uppercase tracking-widest">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-secondary rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}