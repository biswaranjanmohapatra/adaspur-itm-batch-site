import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, Code, Crown, Sparkles, X } from 'lucide-react';
import type { Student } from '@/data/students';

interface StudentCardProps {
  student: Student;
  index: number;
}

export default function StudentCard({ student, index }: StudentCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasSpecialTag = student.isCreator || student.isCR || student.isBeautiful;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className={`group relative cursor-pointer aspect-square overflow-hidden rounded-xl bg-card border-2 transition-all duration-300 ${
          student.isCreator 
            ? 'border-secondary shadow-lg shadow-secondary/20' 
            : student.isCR
            ? 'border-blue-500 shadow-lg shadow-blue-500/20'
            : student.isBeautiful
            ? 'border-pink-500 shadow-lg shadow-pink-500/20'
            : 'border-border hover:border-primary/50'
        }`}
      >
        {/* Special Badges */}
        {student.isCreator && (
          <div className="absolute top-2 right-2 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="badge-creator flex items-center gap-1"
            >
              <Code className="w-3 h-3" />
              <span>Creator</span>
            </motion.div>
          </div>
        )}

        {student.isCR && (
          <div className="absolute top-2 right-2 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
            >
              <Crown className="w-3 h-3" />
              <span>CR</span>
            </motion.div>
          </div>
        )}

        {student.isBeautiful && (
          <div className="absolute top-2 right-2 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
            >
              <Sparkles className="w-3 h-3" />
              <span>Beautiful</span>
            </motion.div>
          </div>
        )}

        {/* Photo or Avatar */}
        <div className="w-full h-full">
          {student.photo ? (
            <img 
              src={student.photo} 
              alt={student.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
              student.isCreator 
                ? 'bg-gradient-to-br from-secondary/20 to-gold-light/20' 
                : student.isCR
                ? 'bg-gradient-to-br from-blue-500/20 to-blue-400/20'
                : student.isBeautiful
                ? 'bg-gradient-to-br from-pink-500/20 to-rose-400/20'
                : 'bg-gradient-to-br from-primary/10 to-primary/20'
            }`}>
              <User className={`w-16 h-16 ${
                student.isCreator ? 'text-secondary' : 
                student.isCR ? 'text-blue-500' : 
                student.isBeautiful ? 'text-pink-500' : 
                'text-primary/50'
              }`} />
            </div>
          )}
        </div>

        {/* Overlay with name */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white text-sm truncate">
              {student.name}
            </h3>
            {student.isCreator && (
              <Star className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" />
            )}
          </div>
          <span className="text-white/70 text-xs">
            {student.rollNo}
          </span>
        </div>

        {/* Always visible name bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-3 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="font-semibold text-white text-xs truncate text-center">
            {student.name}
          </h3>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-card rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo */}
              <div className="aspect-square w-full">
                {student.photo ? (
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    student.isCreator 
                      ? 'bg-gradient-to-br from-secondary/20 to-gold-light/20' 
                      : student.isCR
                      ? 'bg-gradient-to-br from-blue-500/20 to-blue-400/20'
                      : student.isBeautiful
                      ? 'bg-gradient-to-br from-pink-500/20 to-rose-400/20'
                      : 'bg-gradient-to-br from-primary/10 to-primary/20'
                  }`}>
                    <User className="w-24 h-24 text-primary/50" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-bold text-foreground text-xl">
                    {student.name}
                  </h3>
                  {student.isCreator && (
                    <span className="badge-creator flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      <span>Creator</span>
                    </span>
                  )}
                  {student.isCR && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>CR</span>
                    </span>
                  )}
                  {student.isBeautiful && (
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Beautiful</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge-roll">
                    {student.rollNo}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    B.Sc ITM 2021-2024
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
