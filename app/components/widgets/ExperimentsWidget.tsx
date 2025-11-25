'use client';

import { motion } from 'framer-motion';
import { experiments } from '@/app/lib/data';

export default function ExperimentsWidget() {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#e8f5e9] text-[#2e7d32]';
      case 'Completed':
        return 'bg-[var(--accent)] text-[var(--muted)]';
      case 'Paused':
        return 'bg-[#fff8e1] text-[#f57f17]';
      default:
        return 'bg-[var(--accent)] text-[var(--muted)]';
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 pb-2 shrink-0">
        <h2 className="text-lg font-semibold">Experiments</h2>
        <p className="text-[var(--muted)] italic text-sm">Current projects & explorations</p>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
        <div className="space-y-2">
          {experiments.map((exp) => (
            <motion.div
              key={exp.id}
              className="p-3 bg-[var(--accent)] rounded-lg cursor-default"
              whileHover={{ 
                y: -2,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-semibold leading-snug">
                  {exp.title}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${getStatusStyles(exp.status)}`}>
                  {exp.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
                {exp.description}
              </p>
              <div className="mt-2 text-xs text-[var(--muted)]">
                Started {new Date(exp.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
