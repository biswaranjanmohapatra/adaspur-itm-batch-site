import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, ArrowRight } from 'lucide-react';
import { batches } from '@/data/students';

export default function BatchBoxes() {
  const navigate = useNavigate();

  const handleBatchClick = (batchId: string) => {
    // Store selected batch for reference and redirect to login
    sessionStorage.setItem('selectedBatch', batchId);
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="batches" className="py-12 md:py-16 bg-gradient-to-b from-cream to-cream-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2">
            Select Your Batch
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Click on your batch to access the student portal
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 max-w-5xl mx-auto"
        >
          {batches.map((batch) => (
            <motion.div
              key={batch.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBatchClick(batch.id)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square bg-white rounded-2xl shadow-lg border-2 border-secondary/20 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/40">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-3 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
                    <GraduationCap className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-sm font-semibold text-primary text-center">
                    Batch
                  </h3>
                  <p className="text-lg md:text-xl font-serif font-bold text-secondary text-center">
                    {batch.years}
                  </p>
                  
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>{batch.students.filter(s => s.name).length || 30} Students</span>
                  </div>
                  
                  {/* Active badge */}
                  {batch.isActive && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-secondary/20 text-secondary rounded-full">
                      Active
                    </span>
                  )}
                  
                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </motion.div>
                </div>
                
                {/* Bottom gradient bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
