import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CuteLampProps {
  isOn?: boolean;
}

export default function CuteLamp({ isOn = true }: CuteLampProps) {
  const [lampOn, setLampOn] = useState(false);

  useEffect(() => {
    // Turn on the lamp with a delay for effect
    if (isOn) {
      const timer = setTimeout(() => setLampOn(true), 500);
      return () => clearTimeout(timer);
    } else {
      setLampOn(false);
    }
  }, [isOn]);

  return (
    <div className="relative w-48 h-64 mx-auto">
      {/* Lamp glow effect - only when ON */}
      <AnimatePresence>
        {lampOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/30 rounded-full blur-3xl"
          />
        )}
      </AnimatePresence>
      
      {/* Lamp shade */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Main shade */}
        <div 
          className="w-36 h-24 mx-auto rounded-t-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #4a4a5a 0%, #3a3a48 50%, #2a2a35 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 -10px 20px rgba(0,0,0,0.2)',
          }}
        >
          {/* Inner glow when lamp is on */}
          <AnimatePresence>
            {lampOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-amber-400/20"
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Shade bottom rim */}
        <div 
          className="w-44 h-4 mx-auto -mt-1 rounded-b-lg relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #3a3a48 0%, #2a2a35 100%)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}
        >
          {/* Rim glow when on */}
          <AnimatePresence>
            {lampOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-amber-400"
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Cute face - changes based on lamp state */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-6">
          {/* Left eye */}
          <motion.div
            animate={lampOn ? { scaleY: [1, 0.3, 1] } : { scaleY: 0.3 }}
            transition={lampOn ? { duration: 3, repeat: Infinity, repeatDelay: 2 } : { duration: 0.3 }}
            className="w-3 h-1 bg-gray-600 rounded-full"
            style={{ transform: 'rotate(-10deg)' }}
          />
          {/* Right eye */}
          <motion.div
            animate={lampOn ? { scaleY: [1, 0.3, 1] } : { scaleY: 0.3 }}
            transition={lampOn ? { duration: 3, repeat: Infinity, repeatDelay: 2 } : { duration: 0.3 }}
            className="w-3 h-1 bg-gray-600 rounded-full"
            style={{ transform: 'rotate(10deg)' }}
          />
        </div>
        
        {/* Cute smile - bigger when lamp is on */}
        <motion.div
          animate={lampOn ? { scale: [1, 1.1, 1] } : { scale: 0.7 }}
          transition={lampOn ? { duration: 2, repeat: Infinity } : { duration: 0.3 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-600 rounded-b-full"
        />
        
        {/* Light beam under shade - only when ON */}
        <AnimatePresence>
          {lampOn && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scaleY: 1,
              }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{
                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scaleY: { duration: 0.5 },
              }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-10 origin-top"
            >
              <div className="w-full h-full bg-gradient-to-b from-amber-400/50 via-amber-300/30 to-transparent rounded-full blur-md" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Light cone effect - only when ON */}
        <AnimatePresence>
          {lampOn && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 80 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-[105px] left-1/2 -translate-x-1/2 w-0 origin-top"
              style={{
                borderLeft: '30px solid transparent',
                borderRight: '30px solid transparent',
                borderTop: '80px solid rgba(251, 191, 36, 0.15)',
                filter: 'blur(8px)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Lamp stand */}
      <div className="relative flex flex-col items-center mt-2">
        {/* Neck */}
        <div 
          className="w-3 h-20"
          style={{
            background: 'linear-gradient(90deg, #3a3a48 0%, #5a5a68 50%, #3a3a48 100%)',
          }}
        />
        
        {/* Base */}
        <div 
          className="w-24 h-3 rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #5a5a68 0%, #3a3a48 100%)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}
        >
          {/* Base reflection when lamp is on */}
          <AnimatePresence>
            {lampOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Base shadow - stronger when lamp is on */}
        <motion.div
          animate={{ opacity: lampOn ? 0.5 : 0.2, scale: lampOn ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-28 h-2 bg-black/30 rounded-full blur-sm mt-1"
        />
      </div>

      {/* Floor light reflection - only when ON */}
      <AnimatePresence>
        {lampOn && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scaleX: 1,
            }}
            exit={{ opacity: 0, scaleX: 0.5 }}
            transition={{
              opacity: { duration: 2, repeat: Infinity },
              scaleX: { duration: 0.5 },
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 bg-amber-400/20 rounded-full blur-xl"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
