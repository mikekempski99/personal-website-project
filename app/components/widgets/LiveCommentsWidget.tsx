'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRecentComments } from '@/app/lib/data';

interface LiveCommentsWidgetProps {
  onCommentClick: (noteId: string) => void;
}

export default function LiveCommentsWidget({ onCommentClick }: LiveCommentsWidgetProps) {
  const comments = getRecentComments(6);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  // Apple Watch scroll effect - track which card is most centered
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const cards = container.querySelectorAll('[data-comment-card]');
      
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setFocusedIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <motion.span 
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <h2 className="text-lg font-semibold">Live Comments</h2>
        </div>
        <p className="text-[var(--muted)] italic text-sm">Recent discussions</p>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden px-4 pb-4"
      >
        <div className="flex gap-3 h-full items-stretch">
          {comments.map((comment, index) => {
            const isFocused = index === focusedIndex;
            return (
              <motion.button
                key={comment.id}
                data-comment-card
                onClick={() => onCommentClick(comment.noteId)}
                className="flex-shrink-0 w-[180px] text-left p-3 bg-[var(--accent)] rounded-lg flex flex-col justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isFocused ? 1 : 0.6,
                  x: 0,
                  scale: isFocused ? 1 : 0.95,
                }}
                transition={{ 
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                  x: { delay: index * 0.05, duration: 0.3 }
                }}
                whileHover={{ 
                  opacity: 1,
                  scale: 1.02,
                  backgroundColor: 'var(--border)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="text-sm leading-relaxed line-clamp-3">
                  &ldquo;{comment.content}&rdquo;
                </p>
                <div className="mt-auto pt-2 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--muted)] line-clamp-1">
                    on <span className="italic">{comment.noteTitle.split(' by ')[0]}</span>
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">
                    {formatTime(comment.createdAt)}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
