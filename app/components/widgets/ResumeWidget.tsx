'use client';

import { resumeHighlights } from '@/app/lib/data';

export default function ResumeWidget() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-4 shrink-0">
        <h2 className="text-lg font-semibold mb-0.5">Resume</h2>
        <p className="text-[var(--muted)] italic text-sm">{resumeHighlights.currentRole}</p>
      </div>
      
      <div className="flex-1 space-y-4 overflow-y-auto min-h-0">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">Experience</h3>
          <ul className="space-y-1.5 text-sm">
            {resumeHighlights.experience.map((exp, i) => (
              <li key={i} className="leading-snug">{exp}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {resumeHighlights.skills.map((skill, i) => (
              <span 
                key={i}
                className="text-xs px-2 py-0.5 bg-[var(--accent)] rounded-full transition-colors duration-300 hover:bg-[var(--border)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-[var(--border)] shrink-0">
        <a 
          href={resumeHighlights.resumeUrl}
          className="text-sm inline-flex items-center gap-1.5 link-hover"
        >
          Download PDF
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    </div>
  );
}
