import { motion } from 'framer-motion';
import { User, Award, BookOpen, Clock } from 'lucide-react';
import type { Teacher } from '@/data/students';

interface TeacherCardProps {
  teacher: Teacher;
  index: number;
}

export default function TeacherCard({ teacher, index }: TeacherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-teacher group"
    >
      <div className="relative">
        {/* Gradient Background */}
        <div className="h-32 bg-gradient-to-br from-primary via-primary to-navy-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          
          {/* Ex-Teacher Badge */}
          {teacher.isExTeacher && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
            >
              <Clock className="w-3 h-3" />
              <span>Ex-Teacher</span>
            </motion.div>
          )}
        </div>
        
        {/* Avatar */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-full bg-card border-4 border-background shadow-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
            {teacher.photo ? (
              <img 
                src={teacher.photo} 
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                <User className="w-10 h-10 text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-16 pb-6 px-6 text-center">
        <h3 className="font-serif text-xl font-bold text-foreground mb-1">
          {teacher.name}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-secondary mb-3">
          <Award className="w-4 h-4" />
          <span className="text-sm font-medium">{teacher.designation}</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">{teacher.department}</span>
        </div>

        {/* Decorative line */}
        <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      </div>
    </motion.div>
  );
}
