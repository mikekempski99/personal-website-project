'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { readingNotes, comments as allComments, Comment } from '@/app/lib/data';

interface ClickPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ReadingNoteOverlayProps {
  noteId: string | null;
  onClose: () => void;
  clickPosition?: ClickPosition | null;
}

export default function ReadingNoteOverlay({ noteId, onClose, clickPosition }: ReadingNoteOverlayProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(allComments);

  const note = noteId ? readingNotes.find(n => n.id === noteId) : null;
  const noteComments = localComments.filter(c => c.noteId === noteId);

  // Build threaded comment structure
  const buildCommentTree = (comments: Comment[], parentId: string | null = null): Comment[] => {
    return comments
      .filter(c => c.parentId === parentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .flatMap(comment => [comment, ...buildCommentTree(comments, comment.id)]);
  };

  const threadedComments = buildCommentTree(noteComments);

  const handleSubmitComment = (e: React.FormEvent, parentId: string | null = null) => {
    e.preventDefault();
    const content = parentId ? replyContent : newComment;
    if (!content.trim() || !noteId) return;

    const parentComment = parentId ? localComments.find(c => c.id === parentId) : null;
    const newDepth = parentComment ? Math.min(parentComment.depth + 1, 5) : 1;

    const comment: Comment = {
      id: `c${Date.now()}`,
      noteId,
      parentId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      depth: newDepth,
    };

    setLocalComments(prev => [...prev, comment]);
    
    if (parentId) {
      setReplyContent('');
      setReplyingTo(null);
    } else {
      setNewComment('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getDepthClass = (depth: number) => {
    const depthClasses: Record<number, string> = {
      1: '',
      2: 'ml-6 pl-4 border-l border-[var(--border)]',
      3: 'ml-12 pl-4 border-l border-[var(--border)]',
      4: 'ml-18 pl-4 border-l border-[var(--border)]',
      5: 'ml-24 pl-4 border-l border-[var(--border)]',
    };
    return depthClasses[depth] || depthClasses[5];
  };

  // Animation variants for the expanding card effect
  const overlayVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const cardVariants = {
    hidden: clickPosition ? {
      position: 'fixed' as const,
      top: clickPosition.y,
      left: clickPosition.x,
      width: clickPosition.width,
      height: clickPosition.height,
      borderRadius: 12,
    } : {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
    exit: clickPosition ? {
      position: 'fixed' as const,
      top: clickPosition.y,
      left: clickPosition.x,
      width: clickPosition.width,
      height: clickPosition.height,
      borderRadius: 12,
      transition: { 
        duration: 0.35, 
        ease: [0.25, 0.1, 0.25, 1],
      }
    } : {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.25,
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1] 
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.15 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {note && (
        <>
          {/* Backdrop blur */}
          <motion.div
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[999]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Expanding card */}
          <motion.div
            className="fixed inset-0 bg-[var(--background)] z-[1000] overflow-y-auto"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)] z-10">
                <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
                  <motion.button
                    onClick={onClose}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1 link-hover"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </motion.button>
                  <span className="text-xs text-[var(--muted)]">
                    {noteComments.length} comment{noteComments.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="max-w-2xl mx-auto px-6 py-8">
                {/* Note Header */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <span className="text-xs uppercase tracking-wider text-[var(--muted)]">
                    {note.type}
                  </span>
                  <h1 className="text-3xl font-semibold mt-2 mb-1">{note.title}</h1>
                  <p className="text-[var(--muted)]">by {note.author}</p>
                  <p className="text-xs text-[var(--muted)] mt-2">
                    {new Date(note.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </motion.div>

                {/* Notes Content */}
                <motion.div 
                  className="prose prose-lg mb-12"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {note.notes.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={i} className="text-lg font-semibold mt-6 mb-3">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                      const items = paragraph.split('\n');
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-2 my-4">
                          {items.map((item, j) => (
                            <li key={j} className="leading-relaxed">
                              {item.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={i} className="leading-relaxed my-4">
                        {paragraph}
                      </p>
                    );
                  })}
                </motion.div>

                {/* Divider */}
                <motion.div 
                  className="border-t border-[var(--border)] my-8"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />

                {/* Comments Section */}
                <motion.div 
                  className="mb-32"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <h2 className="text-xl font-semibold mb-6">Comments</h2>
                  
                  {threadedComments.length === 0 ? (
                    <p className="text-[var(--muted)] italic">No comments yet. Be the first to share your thoughts.</p>
                  ) : (
                    <div className="space-y-4">
                      {threadedComments.map((comment, index) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                          className={getDepthClass(comment.depth)}
                        >
                          <div className="py-3">
                            <p className="leading-relaxed">{comment.content}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-[var(--muted)]">
                              <span>{formatDate(comment.createdAt)}</span>
                              {comment.depth < 5 && (
                                <button
                                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                  className="hover:text-[var(--foreground)] transition-colors duration-300"
                                >
                                  Reply
                                </button>
                              )}
                            </div>
                            
                            {/* Reply Form */}
                            <AnimatePresence>
                              {replyingTo === comment.id && (
                                <motion.form
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  onSubmit={(e) => handleSubmitComment(e, comment.id)}
                                  className="mt-3"
                                >
                                  <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Write a reply..."
                                    rows={2}
                                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-transparent resize-none focus:outline-none focus:border-[var(--foreground)] transition-colors duration-300"
                                    autoFocus
                                  />
                                  <div className="flex gap-2 mt-2">
                                    <motion.button
                                      type="submit"
                                      className="text-xs px-3 py-1.5 bg-[var(--foreground)] text-[var(--background)] rounded"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      Reply
                                    </motion.button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReplyingTo(null);
                                        setReplyContent('');
                                      }}
                                      className="text-xs px-3 py-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-300"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </motion.form>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Comment Form at end */}
                  <form onSubmit={(e) => handleSubmitComment(e)} className="mt-8">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-transparent resize-none focus:outline-none focus:border-[var(--foreground)] transition-colors duration-300"
                    />
                    <motion.button
                      type="submit"
                      className="mt-3 px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Post Comment
                    </motion.button>
                  </form>
                </motion.div>
              </div>

              {/* Fixed Comment Box at Bottom */}
              <motion.div 
                className="fixed bottom-0 left-0 right-0 bg-[var(--background)]/95 backdrop-blur-sm border-t border-[var(--border)] p-4 z-10"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <form 
                  onSubmit={(e) => handleSubmitComment(e)}
                  className="max-w-2xl mx-auto flex gap-3"
                >
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg bg-transparent focus:outline-none focus:border-[var(--foreground)] transition-colors duration-300"
                  />
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Post
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
