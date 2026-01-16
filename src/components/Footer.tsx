import { motion } from 'framer-motion';
import { Heart, GraduationCap, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-8 h-8 text-secondary" />
            <span className="font-serif text-xl font-bold">Udyanath Autonomous College</span>
          </div>

          {/* Department */}
          <p className="text-primary-foreground/70 mb-6">
            B.Sc ITM Department • Batch 2021-2024 • Adaspur, Odisha
          </p>

          {/* Divider */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />

          {/* Quote */}
          <p className="text-primary-foreground/60 italic max-w-xl mx-auto mb-8">
            "The beautiful thing about learning is that no one can take it away from you."
          </p>

          {/* Creator Credit */}
          <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-secondary" fill="currentColor" />
            <span>by</span>
            <span className="font-semibold text-secondary flex items-center gap-1">
              <Code className="w-4 h-4" />
              Biswa Ranjan Mohapatra
            </span>
          </div>

          {/* Copyright */}
          <p className="text-primary-foreground/50 text-xs mt-4">
            © {new Date().getFullYear()} B.Sc ITM Batch 2021-2024. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
