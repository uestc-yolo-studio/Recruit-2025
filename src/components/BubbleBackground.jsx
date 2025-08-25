import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState([]);
  const colors = ['#00183C', '#0052AA', '#ACFFF7', '#C6FFC7', '#EEF9FF'];

  useEffect(() => {
    const createBubble = () => {
      const bubble = {
        id: Date.now(),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 30 + 10,
        left: Math.random() * 100,
        duration: Math.random() * 8 + 4,
      };

      setBubbles(prev => [...prev, bubble]);
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== bubble.id));
      }, bubble.duration * 1000);
    };

    const interval = setInterval(createBubble, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            initial={{
              opacity: 0,
              y: '100vh',
              x: `${bubble.left}vw`,
              scale: 0
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: '-20vh',
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: bubble.duration,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubble.color,
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BubbleBackground;
