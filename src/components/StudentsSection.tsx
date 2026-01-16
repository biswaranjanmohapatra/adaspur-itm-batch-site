import { motion } from 'framer-motion';
import { students } from '@/data/students';
import StudentCard from './StudentCard';
import { Users } from 'lucide-react';

export default function StudentsSection() {
  return (
    <section id="students" className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Class of 2024</span>
          </div>
          <h2 className="section-title">Our Amazing Classmates</h2>
          <p className="section-subtitle">
            30 unique individuals who became a family. Each one brought something special to our journey.
          </p>
        </motion.div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {students.map((student, index) => (
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
          <p className="text-muted-foreground italic">
            "Together we learned, laughed, and created memories that will last a lifetime."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
