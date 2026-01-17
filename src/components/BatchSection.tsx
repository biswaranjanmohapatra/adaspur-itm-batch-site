import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, PartyPopper, GraduationCap, Building, Heart, Quote, Calendar, 
  ImageOff, Sparkles, Users, Crown, UserPlus 
} from 'lucide-react';
import { batches } from '@/data/students';
import StudentCard from './StudentCard';

// Import images
import picnic1 from '@/assets/memories/picnic-1.jpg';
import picnic2 from '@/assets/memories/picnic-2.jpg';
import picnic3 from '@/assets/memories/picnic-3.jpg';
import picnic4 from '@/assets/memories/picnic-4.jpg';
import picnic5 from '@/assets/memories/picnic-5.jpg';
import picnic6 from '@/assets/memories/picnic-6.jpg';
import picnic7 from '@/assets/memories/picnic-7.jpg';
import farewell1 from '@/assets/memories/farewell-1.jpg';
import farewell2 from '@/assets/memories/farewell-2.jpg';
import farewell3 from '@/assets/memories/farewell-3.jpg';
import farewell4 from '@/assets/memories/farewell-4.jpg';
import farewell5 from '@/assets/memories/farewell-5.jpg';
import farewell6 from '@/assets/memories/farewell-6.jpg';
import college1 from '@/assets/memories/college-1.jpg';
import college2 from '@/assets/memories/college-2.jpg';
import college3 from '@/assets/memories/college-3.jpg';
import college4 from '@/assets/memories/college-4.jpg';
import college5 from '@/assets/memories/college-5.jpg';
import college6 from '@/assets/memories/college-6.jpg';

type GalleryTab = 'picnic' | 'farewell' | 'college';

interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryTab;
  quote?: string;
}

interface BatchMemory {
  id: string;
  years: string;
  images: GalleryImage[];
}

// 2021-2024 Batch memories
const batch2021_2024_images: GalleryImage[] = [
  { src: picnic1, alt: 'Picnic group photo', category: 'picnic', quote: 'Adventures await with friends by your side' },
  { src: picnic2, alt: 'Bus tour group', category: 'picnic', quote: 'Every journey is better together' },
  { src: picnic3, alt: 'Class picnic', category: 'picnic', quote: 'Making memories under the sun' },
  { src: picnic4, alt: 'Nature outing', category: 'picnic', quote: 'Nature and friendship - perfect combo' },
  { src: picnic5, alt: 'Friends together', category: 'picnic', quote: 'Laughter echoes in these moments' },
  { src: picnic6, alt: 'Group fun time', category: 'picnic', quote: 'The joy of being together' },
  { src: picnic7, alt: 'Beach night memories', category: 'picnic', quote: 'Under the stars, our bond grew stronger' },
  { src: farewell1, alt: 'Farewell celebration', category: 'farewell', quote: 'Not goodbye, just see you later' },
  { src: farewell2, alt: 'Farewell group', category: 'farewell', quote: 'End of a chapter, not the story' },
  { src: farewell3, alt: 'Farewell memories', category: 'farewell', quote: 'We came as strangers, left as family' },
  { src: farewell4, alt: 'Final goodbye', category: 'farewell', quote: 'Three years of beautiful memories' },
  { src: farewell5, alt: 'Boys together', category: 'farewell', quote: 'Brothers from different mothers' },
  { src: farewell6, alt: 'Farewell day', category: 'farewell', quote: 'Forever in our hearts' },
  { src: college1, alt: 'College campus', category: 'college', quote: 'Where it all began' },
  { src: college2, alt: 'Friends at college', category: 'college', quote: 'The halls that heard our laughter' },
  { src: college3, alt: 'Class group photo', category: 'college', quote: 'ITM batch - one family' },
  { src: college4, alt: 'Batch photo', category: 'college', quote: 'United by dreams and friendship' },
  { src: college5, alt: 'College memories', category: 'college', quote: 'Every corner holds a memory' },
  { src: college6, alt: 'ITM batch together', category: 'college', quote: 'Proud to be ITM 2021-2024' },
];

// Map batch memories by ID
const batchMemoriesMap: Record<string, GalleryImage[]> = {
  "2021-2024": batch2021_2024_images,
  "2022-2025": [],
  "2023-2026": [],
  "2024-2027": [],
  "2025-2028": [],
};

const tabs: { id: GalleryTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'picnic', label: 'Picnic', icon: PartyPopper },
  { id: 'farewell', label: 'Farewell', icon: GraduationCap },
  { id: 'college', label: 'College Life', icon: Building },
];

export default function BatchSection() {
  const [activeBatch, setActiveBatch] = useState("2021-2024");
  const [activeTab, setActiveTab] = useState<GalleryTab>('picnic');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const currentBatch = batches.find(b => b.id === activeBatch);
  const crStudent = currentBatch?.students.find(s => s.isCR);
  const otherStudents = currentBatch?.students.filter(s => !s.isCR) || [];
  const currentMemories = batchMemoriesMap[activeBatch] || [];
  const filteredImages = currentMemories.filter(img => img.category === activeTab);

  return (
    <section id="batches" className="py-20 md:py-28 bg-cream-dark relative overflow-hidden">
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-4 py-2 mb-4 border border-secondary/20">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">B.Sc ITM Batches</span>
          </div>
          <h2 className="section-title">Our Batches</h2>
          <p className="section-subtitle">
            Explore students and memories from different batches of ITM.
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
                  layoutId="activeBatchBoxIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Batch Content Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBatch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl border-2 border-secondary/20 shadow-xl overflow-hidden"
          >
            {/* Box Header */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 px-6 py-4 border-b border-secondary/20">
              <div className="flex items-center justify-center gap-3">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Batch {currentBatch?.years}
                </h3>
                <div className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1 text-sm">
                  <Users className="w-4 h-4 text-secondary" />
                  <span className="text-foreground">{currentBatch?.students.length || 0} Students</span>
                </div>
              </div>
            </div>

            {currentBatch && (currentBatch.students.length > 0 || currentMemories.length > 0) ? (
              <div className="p-6 md:p-8 space-y-12">
                {/* Students Section */}
                <div className="bg-gradient-to-br from-cream to-white rounded-2xl border border-secondary/10 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="w-5 h-5 text-primary" />
                    <h4 className="text-xl font-serif font-bold text-foreground">Students</h4>
                  </div>

                  {currentBatch.students.length > 0 ? (
                    <>
                      {/* CR Section */}
                      {crStudent && (
                        <div className="mb-8">
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <Crown className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-foreground">Class Representative</span>
                            <Crown className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="max-w-xs mx-auto">
                            <StudentCard student={crStudent} index={0} featured />
                          </div>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary/50" />
                        <Sparkles className="w-3 h-3 text-secondary" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary/50" />
                      </div>

                      {/* Other Students Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {otherStudents.map((student, index) => (
                          <StudentCard key={student.id} student={student} index={index} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <UserPlus className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">No students added yet</p>
                    </div>
                  )}
                </div>

                {/* Memories Section */}
                <div className="bg-gradient-to-br from-cream to-white rounded-2xl border border-secondary/10 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Camera className="w-5 h-5 text-primary" />
                    <h4 className="text-xl font-serif font-bold text-foreground">Memories</h4>
                  </div>

                  {currentMemories.length > 0 ? (
                    <>
                      {/* Category Tabs */}
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {tabs.map((tab) => {
                          const Icon = tab.icon;
                          const tabImageCount = currentMemories.filter(img => img.category === tab.id).length;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                                activeTab === tab.id
                                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                                  : 'bg-secondary/10 text-foreground hover:bg-secondary/20'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{tab.label}</span>
                              <span className="text-xs opacity-70">({tabImageCount})</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Gallery Grid */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                        >
                          {filteredImages.map((image, index) => (
                            <motion.div
                              key={image.src}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-secondary/10"
                              onClick={() => setSelectedImage(image)}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-primary-foreground font-medium text-xs italic truncate">"{image.quote}"</p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>

                      {/* Quote */}
                      <div className="mt-8 text-center">
                        <div className="inline-block bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 p-4 rounded-xl border border-secondary/20">
                          <Quote className="w-6 h-6 text-secondary mx-auto mb-2" />
                          <p className="text-muted-foreground italic text-sm">
                            "Together we learned, laughed, and created memories that will last a lifetime."
                          </p>
                          <div className="flex items-center justify-center gap-1 text-secondary mt-2">
                            <Heart className="w-3 h-3" fill="currentColor" />
                            <span className="text-xs font-medium">ITM {currentBatch.years}</span>
                            <Heart className="w-3 h-3" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <ImageOff className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">No memories added yet</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  Coming Soon!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  {currentBatch?.isActive 
                    ? "This batch is currently studying. Student profiles and memories will be added soon!"
                    : "Student data and memories for this batch will be added soon. Stay tuned!"}
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full px-4 py-2 border border-amber-500/30">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700 text-sm font-medium">
                    {currentBatch?.isActive ? "Currently Active" : "Coming Soon"}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
              {selectedImage.quote && (
                <div className="mt-4 text-center">
                  <p className="text-primary-foreground text-lg italic">"{selectedImage.quote}"</p>
                </div>
              )}
            </motion.div>
            <button
              className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground text-lg font-medium"
              onClick={() => setSelectedImage(null)}
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
