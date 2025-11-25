'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import ReadingNoteOverlay from './components/ReadingNoteOverlay';
import FilmGrain from './components/FilmGrain';
import ContactWidget from './components/widgets/ContactWidget';
import ResumeWidget from './components/widgets/ResumeWidget';
import ReadingNotesWidget from './components/widgets/ReadingNotesWidget';
import ExperimentsWidget from './components/widgets/ExperimentsWidget';
import LiveCommentsWidget from './components/widgets/LiveCommentsWidget';

// Stagger animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const widgetVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Home() {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNoteClick = useCallback((noteId: string) => {
    setActiveNoteId(noteId);
  }, []);

  const handleCloseNote = useCallback(() => {
    setActiveNoteId(null);
  }, []);

  return (
    <>
      {/* Film grain overlay */}
      <FilmGrain />
      
      {/* Page fade-in from white */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block h-screen overflow-hidden p-6 lg:p-8 relative">
          {/* Parallax background */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 20%, rgba(0,0,0,0.02) 0%, transparent 50%)',
            }}
            animate={{
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          />
          
          <motion.div 
            className="h-full max-w-6xl mx-auto relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="h-full grid grid-cols-[220px_1fr] gap-6">
              {/* Left Column - Contact & Resume */}
              <div className="flex flex-col gap-4 overflow-hidden">
                <motion.div variants={widgetVariants} className="widget p-5 shrink-0">
                  <ContactWidget />
                </motion.div>
                <motion.div variants={widgetVariants} className="widget p-5 flex-1 overflow-hidden">
                  <ResumeWidget />
                </motion.div>
              </div>

              {/* Right Column - Reading Notes, Experiments, Comments */}
              <div className="flex flex-col gap-4 overflow-hidden">
                <motion.div variants={widgetVariants} className="widget flex-[2] min-h-0 overflow-hidden">
                  <ReadingNotesWidget onNoteClick={handleNoteClick} />
                </motion.div>

                <motion.div variants={widgetVariants} className="widget flex-[2] min-h-0 overflow-hidden">
                  <ExperimentsWidget />
                </motion.div>

                <motion.div variants={widgetVariants} className="widget flex-1 min-h-[140px] overflow-hidden">
                  <LiveCommentsWidget onCommentClick={handleNoteClick} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <motion.div 
          className="md:hidden min-h-screen py-6 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4">
            <motion.div variants={widgetVariants} className="widget p-5">
              <ContactWidget />
            </motion.div>

            <motion.div variants={widgetVariants} className="widget p-5">
              <ResumeWidget />
            </motion.div>

            <motion.div variants={widgetVariants} className="widget h-[400px]">
              <ReadingNotesWidget onNoteClick={handleNoteClick} />
            </motion.div>

            <motion.div variants={widgetVariants} className="widget h-[400px]">
              <ExperimentsWidget />
            </motion.div>

            <motion.div variants={widgetVariants} className="widget h-[280px]">
              <LiveCommentsWidget onCommentClick={handleNoteClick} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Reading Note Overlay */}
      <ReadingNoteOverlay 
        noteId={activeNoteId} 
        onClose={handleCloseNote}
      />
    </>
  );
}
