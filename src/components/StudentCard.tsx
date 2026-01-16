import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Crown, Sparkles, X, Users, Award, Terminal, Star } from 'lucide-react';
import type { Student } from '@/data/students';

interface StudentCardProps {
  student: Student;
  index: number;
  featured?: boolean;
}

export default function StudentCard({ student, index, featured }: StudentCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBorderClass = () => {
    if (student.isCreator) return 'border-secondary shadow-lg shadow-secondary/20';
    if (student.isCR) return 'border-blue-500 shadow-lg shadow-blue-500/20';
    if (student.isExCR) return 'border-orange-500 shadow-lg shadow-orange-500/20';
    if (student.isGR) return 'border-purple-500 shadow-lg shadow-purple-500/20';
    if (student.isTopper) return 'border-emerald-500 shadow-lg shadow-emerald-500/20';
    if (student.isCoder) return 'border-cyan-500 shadow-lg shadow-cyan-500/20';
    if (student.isBeautiful) return 'border-pink-500 shadow-lg shadow-pink-500/20';
    return 'border-border hover:border-primary/50';
  };

  const getAvatarGradient = () => {
    if (student.isCreator) return 'bg-gradient-to-br from-secondary/20 to-gold-light/20';
    if (student.isCR) return 'bg-gradient-to-br from-blue-500/20 to-blue-400/20';
    if (student.isExCR) return 'bg-gradient-to-br from-orange-500/20 to-orange-400/20';
    if (student.isGR) return 'bg-gradient-to-br from-purple-500/20 to-purple-400/20';
    if (student.isTopper) return 'bg-gradient-to-br from-emerald-500/20 to-emerald-400/20';
    if (student.isCoder) return 'bg-gradient-to-br from-cyan-500/20 to-cyan-400/20';
    if (student.isBeautiful) return 'bg-gradient-to-br from-pink-500/20 to-rose-400/20';
    return 'bg-gradient-to-br from-primary/10 to-primary/20';
  };

  const renderBadges = () => (
    <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
      {student.isCreator && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, boxShadow: ["0 0 20px #ffd700", "0 0 40px #ffd700", "0 0 20px #ffd700"] }}
          transition={{ type: "spring", delay: 0.5, boxShadow: { duration: 2, repeat: Infinity } }}
          className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xl border-2 border-yellow-300"
        >
          <Star className="w-4 h-4" fill="currentColor" />
          <span className="uppercase tracking-wide">Creator</span>
          <Sparkles className="w-3 h-3" />
        </motion.div>
      )}
      {student.isCR && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
        >
          <Crown className="w-3 h-3" />
          <span>CR</span>
        </motion.div>
      )}
      {student.isExCR && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
        >
          <Crown className="w-3 h-3" />
          <span>Ex-CR</span>
        </motion.div>
      )}
      {student.isGR && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
        >
          <Users className="w-3 h-3" />
          <span>GR</span>
        </motion.div>
      )}
      {student.isTopper && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
        >
          <Award className="w-3 h-3" />
          <span>Topper</span>
        </motion.div>
      )}
      {student.isCoder && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
        >
          <Terminal className="w-3 h-3" />
          <span>Coder</span>
        </motion.div>
      )}
      {student.isBeautiful && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
        >
          <Sparkles className="w-3 h-3" />
          <span>Beautiful</span>
        </motion.div>
      )}
    </div>
  );

  return (
    <>
      {/* Flip Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
        className={`perspective-1000 aspect-square ${featured ? 'ring-4 ring-blue-500/30 rounded-xl' : ''}`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side */}
          <div
            className={`absolute inset-0 rounded-xl overflow-hidden bg-card border-2 transition-all duration-300 ${getBorderClass()}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            {renderBadges()}
            
            <div className="w-full h-full">
              {student.photo ? (
                <img 
                  src={student.photo} 
                  alt={student.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${getAvatarGradient()}`}>
                  <User className={`w-16 h-16 ${
                    student.isCreator ? 'text-secondary' : 
                    student.isCR ? 'text-blue-500' : 
                    student.isExCR ? 'text-orange-500' :
                    student.isGR ? 'text-purple-500' :
                    student.isCoder ? 'text-cyan-500' :
                    student.isBeautiful ? 'text-pink-500' : 
                    'text-primary/50'
                  }`} />
                </div>
              )}
            </div>

            {/* Name bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
              <h3 className="font-semibold text-white text-sm truncate text-center">
                {student.name}
              </h3>
            </div>
          </div>

          {/* Back Side */}
          <div
            className={`absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary via-navy-dark to-primary border-2 flex flex-col items-center justify-center p-4 ${getBorderClass()}`}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                {student.name}
              </h3>
              <span className="text-secondary text-xs font-medium">
                {student.rollNo}
              </span>
              
              {student.bio && (
                <p className="mt-4 text-white/80 text-sm italic leading-relaxed">
                  "{student.bio}"
                </p>
              )}
              
              <div className="mt-4 flex items-center justify-center gap-1 text-secondary/80">
                <Star className="w-3 h-3" fill="currentColor" />
                <span className="text-xs">ITM 2021-2024</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-card rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-square w-full">
                {student.photo ? (
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${getAvatarGradient()}`}>
                    <User className="w-24 h-24 text-primary/50" />
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-bold text-foreground text-xl">
                    {student.name}
                  </h3>
                  {student.isCreator && (
                    <motion.span 
                      animate={{ boxShadow: ["0 0 10px #ffd700", "0 0 20px #ffd700", "0 0 10px #ffd700"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border-2 border-yellow-300"
                    >
                      <Star className="w-3 h-3" fill="currentColor" />
                      <span className="uppercase tracking-wide">Creator</span>
                      <Sparkles className="w-3 h-3" />
                    </motion.span>
                  )}
                  {student.isCR && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>CR</span>
                    </span>
                  )}
                  {student.isExCR && (
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>Ex-CR</span>
                    </span>
                  )}
                  {student.isGR && (
                    <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>GR</span>
                    </span>
                  )}
                  {student.isTopper && (
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>Topper</span>
                    </span>
                  )}
                  {student.isCoder && (
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      <span>Coder</span>
                    </span>
                  )}
                  {student.isBeautiful && (
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Beautiful</span>
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-roll">{student.rollNo}</span>
                  <span className="text-muted-foreground text-sm">B.Sc ITM 2021-2024</span>
                </div>
                
                {student.bio && (
                  <p className="text-muted-foreground text-sm italic border-l-2 border-secondary pl-3">
                    "{student.bio}"
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}