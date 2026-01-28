import { motion } from 'framer-motion';

export default function CuteLamp() {
  return (
    <div className="relative w-48 h-64 mx-auto">
      {/* Lamp glow effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"
      />
      
      {/* Lamp shade */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Shade top */}
        <div className="relative mx-auto">
          {/* Main shade */}
          <div 
            className="w-36 h-24 mx-auto rounded-t-full"
            style={{
              background: 'linear-gradient(180deg, #4a4a5a 0%, #3a3a48 50%, #2a2a35 100%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 -10px 20px rgba(0,0,0,0.2)',
            }}
          />
          
          {/* Shade bottom rim */}
          <div 
            className="w-44 h-4 mx-auto -mt-1 rounded-b-lg"
            style={{
              background: 'linear-gradient(180deg, #3a3a48 0%, #2a2a35 100%)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            }}
          />
          
          {/* Cute face */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-6">
            {/* Left eye - closed/sleepy */}
            <motion.div
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="w-3 h-1 bg-gray-600 rounded-full"
              style={{
                transform: 'rotate(-10deg)',
              }}
            />
            {/* Right eye - closed/sleepy */}
            <motion.div
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="w-3 h-1 bg-gray-600 rounded-full"
              style={{
                transform: 'rotate(10deg)',
              }}
            />
          </div>
          
          {/* Cute smile */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-600 rounded-b-full"
          />
        </div>
        
        {/* Light glow under shade */}
        <motion.div
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-amber-400/40 to-transparent rounded-full blur-md"
        />
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
          className="w-24 h-3 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #5a5a68 0%, #3a3a48 100%)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}
        />
        
        {/* Base shadow */}
        <div className="w-28 h-2 bg-black/30 rounded-full blur-sm mt-1" />
      </div>
    </div>
  );
}
