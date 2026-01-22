import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, GraduationCap, Award, Medal, Target, X, ExternalLink } from 'lucide-react';
import biswaImage from '@/assets/students/biswa.jpg';

const achievements = [
  { icon: Target, text: "OJEE Rank 7", highlight: true },
  { icon: GraduationCap, text: "Student at OUTR, Bhubaneswar" },
  { icon: Award, text: "Cracked NIMCET" },
  { icon: Medal, text: "Got seat in NIT Patna, HCU, and BHU" },
];

export default function BiswaCardSmall() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <section className="py-10 md:py-14 bg-gradient-to-b from-cream to-cream-dark">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full px-3 py-1 border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-amber-700 text-sm font-medium">Student Achievement</span>
            </div>
          </motion.div>

          {/* Clickable Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(true)}
            className="max-w-lg mx-auto cursor-pointer"
          >
            <div className="relative">
              {/* Glowing border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl blur-sm opacity-60" />
              
              {/* Card */}
              <div className="relative bg-white rounded-2xl border border-amber-400/40 shadow-lg overflow-hidden">
                {/* Top bar */}
                <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
                
                <div className="p-5">
                  <div className="flex items-center gap-5">
                    {/* Photo */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-br from-amber-400 to-amber-600">
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                          <img
                            src={biswaImage}
                            alt="Biswa Ranjan Mohapatra"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-white">
                        <Trophy className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs text-amber-600 font-medium">Achievement Card</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-foreground">
                        Biswa Ranjan Mohapatra
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Batch 2021-2024 • B.Sc ITM
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-amber-600">
                        <ExternalLink className="w-3 h-3" />
                        <span>Click to view details</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick achievements preview */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {achievements.slice(0, 2).map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                          achievement.highlight
                            ? 'bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 text-amber-800 font-medium'
                            : 'bg-secondary/10 text-foreground'
                        }`}
                      >
                        <achievement.icon className="w-3 h-3" />
                        <span>{achievement.text}</span>
                      </div>
                    ))}
                    <span className="text-xs text-muted-foreground self-center">+2 more</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white flex items-center gap-1 text-sm"
              >
                Close <X className="w-4 h-4" />
              </button>

              {/* Detailed Card */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur-md opacity-75" />
                
                <div className="relative bg-gradient-to-br from-white via-amber-50/50 to-white rounded-3xl border-2 border-amber-400/50 shadow-2xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
                  
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-md opacity-50" />
                        <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600">
                          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                            <img
                              src={biswaImage}
                              alt="Biswa Ranjan Mohapatra"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring' }}
                          className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                        >
                          <Trophy className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>

                      <div className="text-center sm:text-left">
                        <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                          <Star className="w-3 h-3 fill-amber-500" />
                          Student Achievement Card
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                          Biswa Ranjan Mohapatra
                        </h3>
                        <p className="text-muted-foreground">
                          Batch 2021-2024 • B.Sc ITM
                        </p>
                      </div>
                    </div>

                    {/* All Achievements */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        Achievements
                      </h4>
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            achievement.highlight
                              ? 'bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200'
                              : 'bg-secondary/5'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            achievement.highlight
                              ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'
                              : 'bg-amber-100 text-amber-600'
                          }`}>
                            <achievement.icon className="w-4 h-4" />
                          </div>
                          <span className={`font-medium ${
                            achievement.highlight ? 'text-amber-800 text-lg' : 'text-foreground'
                          }`}>
                            {achievement.text}
                          </span>
                          {achievement.highlight && (
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500 ml-auto" />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 pt-6 border-t border-amber-200/50 text-center"
                    >
                      <p className="text-muted-foreground italic text-sm">
                        "Hard work and dedication lead to extraordinary achievements"
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
