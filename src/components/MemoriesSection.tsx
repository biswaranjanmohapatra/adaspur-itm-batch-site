import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, PartyPopper, GraduationCap, Building } from 'lucide-react';

// Import images
import picnic1 from '@/assets/memories/picnic-1.jpg';
import picnic2 from '@/assets/memories/picnic-2.jpg';
import picnic3 from '@/assets/memories/picnic-3.jpg';
import picnic4 from '@/assets/memories/picnic-4.jpg';
import picnic5 from '@/assets/memories/picnic-5.jpg';
import farewell1 from '@/assets/memories/farewell-1.jpg';
import farewell2 from '@/assets/memories/farewell-2.jpg';
import farewell3 from '@/assets/memories/farewell-3.jpg';
import farewell4 from '@/assets/memories/farewell-4.jpg';
import college1 from '@/assets/memories/college-1.jpg';

type GalleryTab = 'picnic' | 'farewell' | 'college';

interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryTab;
}

const galleryImages: GalleryImage[] = [
  { src: picnic1, alt: 'Picnic group photo', category: 'picnic' },
  { src: picnic2, alt: 'Bus tour group', category: 'picnic' },
  { src: picnic3, alt: 'Class picnic', category: 'picnic' },
  { src: picnic4, alt: 'Nature outing', category: 'picnic' },
  { src: picnic5, alt: 'Friends together', category: 'picnic' },
  { src: farewell1, alt: 'Farewell celebration', category: 'farewell' },
  { src: farewell2, alt: 'Farewell group', category: 'farewell' },
  { src: farewell3, alt: 'Farewell memories', category: 'farewell' },
  { src: farewell4, alt: 'Final goodbye', category: 'farewell' },
  { src: college1, alt: 'College days', category: 'college' },
];

const tabs: { id: GalleryTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'picnic', label: 'Picnic Memories', icon: PartyPopper },
  { id: 'farewell', label: 'Farewell', icon: GraduationCap },
  { id: 'college', label: 'College Life', icon: Building },
];

export default function MemoriesSection() {
  const [activeTab, setActiveTab] = useState<GalleryTab>('picnic');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = galleryImages.filter(img => img.category === activeTab);

  return (
    <section id="memories" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Gallery</span>
          </div>
          <h2 className="section-title">Our Precious Memories</h2>
          <p className="section-subtitle">
            Moments frozen in time. Every picture tells a story of friendship, joy, and togetherness.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`gallery-tab flex items-center gap-2 ${
                  activeTab === tab.id ? 'gallery-tab-active' : 'gallery-tab-inactive'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-primary-foreground font-medium text-sm">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No images in this category yet.</p>
          </div>
        )}
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
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
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
