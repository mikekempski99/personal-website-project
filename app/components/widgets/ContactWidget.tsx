'use client';

import { contactInfo } from '@/app/lib/data';

export default function ContactWidget() {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-1">{contactInfo.name}</h1>
        <p className="text-[var(--muted)] italic text-sm">Building & writing</p>
      </div>
      
      <div className="space-y-1.5 text-sm">
        <a 
          href={`mailto:${contactInfo.email}`}
          className="block link-hover truncate"
        >
          {contactInfo.email}
        </a>
        <a 
          href={`https://twitter.com/${contactInfo.twitter.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block link-hover text-[var(--muted)]"
        >
          {contactInfo.twitter}
        </a>
        <a 
          href={`https://${contactInfo.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block link-hover text-[var(--muted)]"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}
