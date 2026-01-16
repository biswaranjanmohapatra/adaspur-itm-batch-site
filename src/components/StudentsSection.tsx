import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { batches } from '@/data/students';
import StudentCard from './StudentCard';
import { Users, Crown, Sparkles, GraduationCap, Calendar, UserPlus } from 'lucide-react';

export default function StudentsSection() {
  const [activeBatch, setActiveBatch] = useState("2021-2024");
  
  const currentBatch = batches.find(b => b.id === activeBatch);
  const crStudent = currentBatch?.students.find(s => s.isCR);
  const otherStudents = currentBatch?.students.filter(s => !s.isCR) || [];

  return (
    <section id="students" className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-secondary/5 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-4 py-2 mb-4 border border-secondary/20">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">B.Sc ITM Batches</span>
          </div>
          <h2 className="section-title">Our Amazing Students</h2>
          <p className="section-subtitle">
            Browse through different batches of ITM students who made their journey memorable.
          </p>
        </motion.div>

        {/* Batch Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {batches.map((batch) => (
            <motion.button
              key={batch.id}
              onClick={() => setActiveBatch(batch.id)}
              className={`relative px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                activeBatch === batch.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'bg-white/80 text-foreground hover:bg-white hover:shadow-md border border-secondary/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {batch.years}
              </span>
              {activeBatch === batch.id && (
                <motion.div
                  layoutId="activeBatchIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Batch Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBatch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentBatch && currentBatch.students.length > 0 ? (
              <>
                {/* Batch Info */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full px-4 py-2 border border-secondary/20">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="text-foreground text-sm font-medium">
                      {currentBatch.students.length} Students • {currentBatch.years}
                    </span>
                  </div>
                </div>

                {/* Featured CR - Single Row */}
                {crStudent && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                  >
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Crown className="w-5 h-5 text-blue-500" />
                      <h3 className="text-xl font-serif font-bold text-foreground">Class Representative</h3>
                      <Crown className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="max-w-sm mx-auto">
                      <StudentCard student={crStudent} index={0} featured />
                    </div>
                  </motion.div>
                )}

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-secondary/50" />
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-secondary/50" />
                </div>

                {/* Other Students Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {otherStudents.map((student, index) => (
                    <StudentCard key={student.id} student={student} index={index} />
                  ))}
                </div>

                {/* Fun fact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-12 text-center"
                >
                  <div className="inline-block bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 p-6 rounded-2xl border border-secondary/20">
                    <p className="text-muted-foreground italic text-lg">
                      "Together we learned, laughed, and created memories that will last a lifetime."
                    </p>
                    <p className="text-secondary font-medium mt-2">— ITM {currentBatch.years}</p>
                  </div>
                </motion.div>
              </>
            ) : (
              /* Empty State for Future Batches */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
                  <UserPlus className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                  Batch {currentBatch?.years}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {currentBatch?.isActive 
                    ? "This batch is currently studying. Student profiles will be added soon!"
                    : "Student data for this batch will be added soon. Stay tuned!"}
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full px-4 py-2 border border-amber-500/30">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700 text-sm font-medium">
                    {currentBatch?.isActive ? "Currently Active" : "Coming Soon"}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
