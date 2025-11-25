'use client';

import { motion } from 'framer-motion';
import { readingNotes, getCommentsForNote } from '@/app/lib/data';

interface ReadingNotesWidgetProps {
  onNoteClick: (noteId: string) => void;
}

export default function ReadingNotesWidget({ onNoteClick }: ReadingNotesWidgetProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 pb-2 shrink-0">
        <h2 className="text-lg font-semibold">Reading Notes</h2>
        <p className="text-[var(--muted)] italic text-sm">Books & articles I&apos;ve learned from</p>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
        <div className="space-y-2">
          {readingNotes.map((note) => {
            const commentCount = getCommentsForNote(note.id).length;
            return (
              <motion.button
                key={note.id}
                onClick={() => onNoteClick(note.id)}
                className="w-full text-left p-3 bg-[var(--accent)] rounded-lg transition-colors duration-300 group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-semibold leading-snug group-hover:underline decoration-1 underline-offset-2">
                    {note.title}
                  </h3>
                  <span className="text-xs text-[var(--muted)] shrink-0 uppercase tracking-wide">
                    {note.type}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-1">
                  by {note.author}
                </p>
                <p className="text-sm line-clamp-1 leading-relaxed">
                  {note.notes.slice(0, 100)}...
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span>{new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{commentCount} comment{commentCount !== 1 ? 's' : ''}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
