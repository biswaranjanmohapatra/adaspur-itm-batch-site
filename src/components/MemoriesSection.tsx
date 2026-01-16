import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, PartyPopper, GraduationCap, Building, Heart, Quote } from 'lucide-react';

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

const friendshipQuotes = [
  "Together we laughed, together we grew",
  "Friends who became family",
  "Memories that last forever",
  "Every moment was a treasure",
  "The best days of our lives",
  "Bonded by friendship, united by memories",
  "Some connections are eternal",
];

const galleryImages: GalleryImage[] = [
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

const tabs: { id: GalleryTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'picnic', label: 'Picnic Memories', icon: PartyPopper },
  { id: 'farewell', label: 'Farewell', icon: GraduationCap },
  { id: 'college', label: 'College Life', icon: Building },
];

export default function MemoriesSection() {
  const [activeTab, setActiveTab] = useState<GalleryTab>('picnic');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-primary-foreground font-medium text-sm italic">"{image.quote}"</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Friendship Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl p-8 border border-secondary/20">
            <Quote className="w-10 h-10 text-secondary mx-auto mb-4" />
            <p className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed">
              "Friendship isn't about who you've known the longest, it's about who walked into your life and said 'I'm here for you' and proved it."
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-secondary">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-medium">ITM Batch 2021-2024</span>
              <Heart className="w-4 h-4" fill="currentColor" />
            </div>
          </div>
        </motion.div>

        {/* Scrolling quotes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden"
        >
          <div className="flex gap-8 animate-marquee">
            {[...friendshipQuotes, ...friendshipQuotes].map((quote, index) => (
              <div key={index} className="flex items-center gap-3 whitespace-nowrap text-muted-foreground">
                <Heart className="w-3 h-3 text-secondary/50" fill="currentColor" />
                <span className="text-sm italic">{quote}</span>
              </div>
            ))}
          </div>
        </motion.div>
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
