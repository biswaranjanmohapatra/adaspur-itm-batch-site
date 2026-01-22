import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  GraduationCap, 
  Award,
  Sparkles,
  Medal,
  Target
} from 'lucide-react';
import biswaImage from '@/assets/students/biswa.jpg';

const achievements = [
  { icon: Target, text: "OJEE Rank 7", highlight: true },
  { icon: GraduationCap, text: "Student at OUTR, Bhubaneswar" },
  { icon: Award, text: "Cracked NIMCET" },
  { icon: Medal, text: "Got seat in NIT Patna, HCU, and BHU" },
];

// BiswaCard is now visible to everyone (public view)
// No authentication required to see this card
export default function BiswaCard() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-cream via-cream-dark to-cream relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-400/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-400/5 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full px-4 py-2 mb-4 border border-amber-500/30">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 text-sm font-medium">Student Achievement</span>
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
            Pride of Our Batch
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Celebrating exceptional achievements from our talented students
          </p>
        </motion.div>

        {/* Biswa Card - Premium Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur-sm opacity-75" />
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-white via-amber-50/50 to-white rounded-3xl border-2 border-amber-400/50 shadow-2xl shadow-amber-500/20 overflow-hidden">
              {/* Top decorative banner */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
              
              {/* Floating stars decoration */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </motion.div>
              </div>
              <div className="absolute top-8 right-12 opacity-50">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {/* Photo Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Photo glow */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-md opacity-50" />
                    
                    {/* Photo frame */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                        <img
                          src={biswaImage}
                          alt="Biswa Ranjan Mohapatra"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Trophy badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    >
                      <Trophy className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Name & Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        <Star className="w-3 h-3 fill-amber-500" />
                        Student Achievement Card
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-1">
                        Biswa Ranjan Mohapatra
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Batch 2021-2024 • B.Sc ITM
                      </p>
                    </motion.div>

                    {/* Achievements List */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="space-y-3"
                    >
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className={`flex items-center gap-3 ${
                            achievement.highlight 
                              ? 'bg-gradient-to-r from-amber-100 to-amber-50 p-2 rounded-lg border border-amber-200' 
                              : ''
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
                            achievement.highlight 
                              ? 'text-amber-800 text-lg' 
                              : 'text-foreground'
                          }`}>
                            {achievement.text}
                          </span>
                          {achievement.highlight && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Bottom quote */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
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
      </div>
    </section>
  );
}
