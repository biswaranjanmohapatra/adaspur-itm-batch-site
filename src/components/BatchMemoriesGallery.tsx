import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, PartyPopper, GraduationCap, Building, Heart, Quote, ImageOff, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Import images for 2021-2024 batch
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

interface BatchMemoriesGalleryProps {
  batchId: string;
  batchYears: string;
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

// Map batch IDs to images
const batchImagesMap: Record<string, GalleryImage[]> = {
  '2021-2024': batch2021_2024_images,
  '2022-2025': [],
  '2023-2026': [],
  '2024-2027': [],
  '2025-2028': [],
};

const tabs: { id: GalleryTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'picnic', label: 'Picnic', icon: PartyPopper },
  { id: 'farewell', label: 'Farewell', icon: GraduationCap },
  { id: 'college', label: 'College', icon: Building },
];

export default function BatchMemoriesGallery({ batchId, batchYears }: BatchMemoriesGalleryProps) {
  const [activeTab, setActiveTab] = useState<GalleryTab>('picnic');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images = batchImagesMap[batchId] || [];
  const filteredImages = images.filter(img => img.category === activeTab);

  if (images.length === 0) {
    return (
      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Batch Memories
          </CardTitle>
          <CardDescription>
            Photos from {batchYears}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
              <ImageOff className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Coming Soon!
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-4">
              Memories for your batch will be added soon. Stay tuned!
            </p>
            <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-secondary text-sm font-medium">Creating Memories</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Batch Memories
          </CardTitle>
          <CardDescription>
            Photos from {batchYears}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const count = images.filter(img => img.category === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                      : 'bg-secondary/10 text-foreground hover:bg-secondary/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  <span className="text-xs opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium truncate">
                      "{image.quote}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 pt-6 border-t border-secondary/10 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Heart className="w-4 h-4 text-secondary" fill="currentColor" />
              <span className="text-sm italic">Memories that last forever</span>
              <Heart className="w-4 h-4 text-secondary" fill="currentColor" />
            </div>
          </motion.div>
        </CardContent>
      </Card>

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
                  <p className="text-white text-lg italic">"{selectedImage.quote}"</p>
                </div>
              )}
            </motion.div>
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white text-lg font-medium"
              onClick={() => setSelectedImage(null)}
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
