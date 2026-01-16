import { motion } from 'framer-motion';
import { User, Star, Code } from 'lucide-react';
import type { Student } from '@/data/students';

interface StudentCardProps {
  student: Student;
  index: number;
}

export default function StudentCard({ student, index }: StudentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
      className={`card-student group relative ${student.isCreator ? 'ring-2 ring-secondary ring-offset-2 ring-offset-background' : ''}`}
    >
      {/* Creator Badge */}
      {student.isCreator && (
        <div className="absolute -top-3 -right-3 z-10">
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

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
            student.isCreator 
              ? 'bg-gradient-to-br from-secondary to-gold-light' 
              : 'bg-gradient-to-br from-primary/10 to-primary/20'
          }`}>
            <User className={`w-6 h-6 ${student.isCreator ? 'text-primary' : 'text-primary'}`} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate text-sm">
                {student.name}
              </h3>
              {student.isCreator && (
                <Star className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" />
              )}
            </div>
            <span className="badge-roll inline-block">
              {student.rollNo}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className={`h-1 transition-all duration-300 ${
        student.isCreator 
          ? 'bg-gradient-to-r from-secondary via-gold-light to-secondary'
          : 'bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100'
      }`} />
    </motion.div>
  );
}
