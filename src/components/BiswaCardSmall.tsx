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
    <section className="py-8 md:py-12 bg-gradient-to-b from-cream to-cream-dark">
      <div className="container mx-auto px-4">
        {/* Section Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full px-3 py-1 border border-amber-500/30">
            <Trophy className="w-3 h-3 text-amber-600" />
            <span className="text-amber-700 text-xs font-medium">Student Achievement</span>
          </div>
        </motion.div>

        {/* Small Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto"
        >
          <div className="relative">
            {/* Glowing border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl blur-sm opacity-60" />
            
            {/* Card */}
            <div className="relative bg-white rounded-2xl border border-amber-400/40 shadow-lg overflow-hidden">
              {/* Top bar */}
              <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
              
              <div className="p-4">
                <div className="flex items-center gap-4">
                  {/* Photo */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-amber-400 to-amber-600">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                        <img
                          src={biswaImage}
                          alt="Biswa Ranjan Mohapatra"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border border-white">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] text-amber-600 font-medium">Achievement Card</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-foreground truncate">
                      Biswa Ranjan Mohapatra
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Batch 2021-2024
                    </p>
                  </div>
                </div>

                {/* Achievements - Compact */}
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ${
                        achievement.highlight
                          ? 'bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200'
                          : 'bg-secondary/5'
                      }`}
                    >
                      <achievement.icon className={`w-3 h-3 flex-shrink-0 ${
                        achievement.highlight ? 'text-amber-600' : 'text-muted-foreground'
                      }`} />
                      <span className={`truncate ${
                        achievement.highlight ? 'text-amber-800 font-medium' : 'text-foreground'
                      }`}>
                        {achievement.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
