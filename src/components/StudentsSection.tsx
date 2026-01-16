import { motion } from 'framer-motion';
import { students } from '@/data/students';
import StudentCard from './StudentCard';
import { Users, Crown, Sparkles } from 'lucide-react';

export default function StudentsSection() {
  // Get CR (Dibya) as featured student and rest as other students
  const crStudent = students.find(s => s.isCR);
  const otherStudents = students.filter(s => !s.isCR);

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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-4 py-2 mb-4 border border-secondary/20">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Class of 2024</span>
          </div>
          <h2 className="section-title">Our Amazing Classmates</h2>
          <p className="section-subtitle">
            30 unique individuals who became a family. Each one brought something special to our journey.
          </p>
        </motion.div>

        {/* Featured CR - Single Row */}
        {crStudent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 p-6 rounded-2xl border border-secondary/20">
            <p className="text-muted-foreground italic text-lg">
              "Together we learned, laughed, and created memories that will last a lifetime."
            </p>
            <p className="text-secondary font-medium mt-2">— ITM 2021-2024</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
