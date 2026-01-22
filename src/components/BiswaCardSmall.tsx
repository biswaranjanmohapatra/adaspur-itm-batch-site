import { motion } from 'framer-motion';
import { Trophy, Star, GraduationCap, Award, Medal, Target } from 'lucide-react';
import biswaImage from '@/assets/students/biswa.jpg';

const achievements = [
  { icon: Target, text: "OJEE Rank 7", highlight: true },
  { icon: GraduationCap, text: "Student at OUTR, Bhubaneswar" },
  { icon: Award, text: "Cracked NIMCET" },
  { icon: Medal, text: "Got seat in NIT Patna, HCU, and BHU" },
];

export default function BiswaCardSmall() {
  return (
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

        {/* Full Details Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <div className="relative">
            {/* Glowing border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur-md opacity-60" />
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-white via-amber-50/50 to-white rounded-3xl border-2 border-amber-400/50 shadow-xl overflow-hidden">
              {/* Top bar */}
              <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
              
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
                  {/* Photo */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-md opacity-40" />
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600">
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
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="absolute -bottom-2 -right-2 w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    >
                      <Trophy className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>

                  {/* Name & Info */}
                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      <Star className="w-3 h-3 fill-amber-500" />
                      Achievement Card
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      Biswa Ranjan Mohapatra
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Batch 2021-2024 • B.Sc ITM
                    </p>
                  </div>
                </div>

                {/* All Achievements */}
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.08 }}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.highlight
                          ? 'bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200'
                          : 'bg-secondary/5'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        achievement.highlight
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'
                          : 'bg-amber-100 text-amber-600'
                      }`}>
                        <achievement.icon className="w-4 h-4" />
                      </div>
                      <span className={`font-medium ${
                        achievement.highlight ? 'text-amber-800' : 'text-foreground'
                      }`}>
                        {achievement.text}
                      </span>
                      {achievement.highlight && (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 ml-auto" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-5 pt-5 border-t border-amber-200/50 text-center"
                >
                  <p className="text-muted-foreground italic text-sm">
                    "Hard work and dedication lead to extraordinary achievements"
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
