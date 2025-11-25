// Types
export interface ReadingNote {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'article';
  notes: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  noteId: string;
  parentId: string | null;
  content: string;
  createdAt: string;
  depth: number;
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'Paused';
  createdAt: string;
}

// Sample Reading Notes
export const readingNotes: ReadingNote[] = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    type: 'book',
    notes: `The core thesis is that small, incremental changes compound into remarkable results over time. Clear introduces the concept of the "1% better every day" philosophy.

**Key Takeaways:**

1. **Habits are the compound interest of self-improvement.** Getting 1% better every day counts for a lot in the long run. The same way money multiplies through compound interest, the effects of your habits multiply as you repeat them.

2. **The Four Laws of Behavior Change:**
   - Make it obvious (cue)
   - Make it attractive (craving)
   - Make it easy (response)
   - Make it satisfying (reward)

3. **Identity-based habits** are more effective than outcome-based habits. Instead of "I want to run a marathon," think "I am a runner."

4. **Environment design matters more than motivation.** Make good habits obvious and bad habits invisible. If you want to eat healthier, put fruits on the counter and hide the cookies.

5. **The Two-Minute Rule:** When you start a new habit, it should take less than two minutes to do. "Read before bed" becomes "Read one page." The point is to master the habit of showing up.

6. **Never miss twice.** Missing one day is fine, but never let a single miss turn into a streak of misses.

The book fundamentally changed how I think about goals. Goals are good for setting direction, but systems are best for making progress. You don't rise to the level of your goals; you fall to the level of your systems.`,
    createdAt: '2024-03-15'
  },
  {
    id: 'mom-test',
    title: 'The Mom Test',
    author: 'Rob Fitzpatrick',
    type: 'book',
    notes: `This is the definitive guide on how to talk to customers and learn if your business idea is any good—without them knowing what you're building.

**The Core Problem:**
People will lie to you. Not maliciously, but because they want to be supportive. If you ask "Would you use this product?" everyone says yes. That's a useless signal.

**The Mom Test Rules:**

1. **Talk about their life, not your idea.** Bad: "Do you think this is a good idea?" Good: "Tell me about the last time you had this problem."

2. **Ask about specifics in the past, not generics about the future.** Bad: "Would you pay for this?" Good: "How much time/money did you spend trying to solve this last month?"

3. **Talk less, listen more.** You should be talking for less than 20% of the conversation. Every time you talk, you're losing an opportunity to learn.

**Questions That Actually Work:**
- "What's the hardest part about [doing this thing]?"
- "Tell me about the last time that happened."
- "What else have you tried?"
- "How are you dealing with this now?"
- "What would your dream solution look like?"

**Red Flags:**
- Compliments ("That's a great idea!")
- Fluff ("I would definitely use that")
- Future promises ("I would pay $X for that")

**Commitment and Advancement:**
Real signal comes from commitment: time, reputation, or money. If someone says they'd pay $100/month, ask for a pre-order. If they won't commit, the compliment was hollow.

This book saved me from building products nobody wanted. Required reading for anyone doing customer discovery.`,
    createdAt: '2024-02-20'
  },
  {
    id: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    type: 'book',
    notes: `Peter Thiel's contrarian manifesto on startups and innovation. The title refers to creating something genuinely new (going from 0 to 1) versus copying what works (going from 1 to n).

**The Contrarian Question:**
"What important truth do very few people agree with you on?" Great businesses are built on secrets—things that are true but not widely known or believed.

**On Competition:**
"Competition is for losers." Competition drives down profits. The goal should be monopoly through innovation, not fighting over scraps in a crowded market. Every monopoly is unique, but they usually share these traits: proprietary technology, network effects, economies of scale, and branding.

**The Power Law:**
A small handful of companies radically outperform all others. This applies to VC portfolios but also to life decisions. Focus on the few things that could have exponential impact.

**Definite vs. Indefinite Thinking:**
- Definite optimism (1950s-60s America): We can plan and build the future
- Indefinite optimism (today's America): The future will be better, but we don't know how, so we don't plan

The lack of definite thinking leads to incrementalism. Bold plans seem irrational when you don't believe the future is knowable.

**On Sales:**
"If you've invented something new but haven't invented an effective way to sell it, you have a bad business." Distribution matters as much as product.

**Building a Team:**
Early employees should be "cult-like" in their belief in the mission. Not a literal cult, but a tight group of true believers who would reject ordinary opportunities.

This book shaped how I evaluate opportunities. I now ask: Is this 0-to-1 or 1-to-n? What's the secret insight? How does this become a monopoly?`,
    createdAt: '2024-01-10'
  }
];

// Sample Comments
export const comments: Comment[] = [
  // Comments on Atomic Habits
  {
    id: 'c1',
    noteId: 'atomic-habits',
    parentId: null,
    content: 'The two-minute rule completely changed how I approach new habits. Started with "put on running shoes" and now I run 5km daily.',
    createdAt: '2024-03-20T10:30:00Z',
    depth: 1
  },
  {
    id: 'c2',
    noteId: 'atomic-habits',
    parentId: 'c1',
    content: 'How long did it take before it felt automatic?',
    createdAt: '2024-03-20T14:15:00Z',
    depth: 2
  },
  {
    id: 'c3',
    noteId: 'atomic-habits',
    parentId: 'c2',
    content: 'About 3 weeks. The first week was rough but after that putting on shoes became the trigger for the whole routine.',
    createdAt: '2024-03-21T09:00:00Z',
    depth: 3
  },
  {
    id: 'c4',
    noteId: 'atomic-habits',
    parentId: null,
    content: 'I think the identity piece is underrated. Saying "I don\'t eat sugar" vs "I\'m trying to quit sugar" hits completely different.',
    createdAt: '2024-03-22T16:45:00Z',
    depth: 1
  },
  
  // Comments on Mom Test
  {
    id: 'c5',
    noteId: 'mom-test',
    parentId: null,
    content: 'Wish I read this before my first startup. We built for 8 months based on "that sounds useful" feedback.',
    createdAt: '2024-02-25T11:20:00Z',
    depth: 1
  },
  {
    id: 'c6',
    noteId: 'mom-test',
    parentId: 'c5',
    content: 'Same. The pre-order test would have saved us so much time.',
    createdAt: '2024-02-26T08:30:00Z',
    depth: 2
  },
  {
    id: 'c7',
    noteId: 'mom-test',
    parentId: null,
    content: 'The "how are you dealing with this now" question is gold. If they\'re not actively trying to solve it, they won\'t pay for your solution either.',
    createdAt: '2024-02-28T15:00:00Z',
    depth: 1
  },
  
  // Comments on Zero to One
  {
    id: 'c8',
    noteId: 'zero-to-one',
    parentId: null,
    content: 'The definite vs indefinite optimism framework explains so much about why big projects feel impossible today.',
    createdAt: '2024-01-15T13:40:00Z',
    depth: 1
  },
  {
    id: 'c9',
    noteId: 'zero-to-one',
    parentId: 'c8',
    content: 'Agreed. We used to build nuclear plants in 5 years. Now we spend 5 years on environmental reviews.',
    createdAt: '2024-01-16T10:10:00Z',
    depth: 2
  },
  {
    id: 'c10',
    noteId: 'zero-to-one',
    parentId: 'c9',
    content: 'Though I wonder if some of that caution is warranted. The 50s also gave us a lot of environmental disasters.',
    createdAt: '2024-01-17T14:25:00Z',
    depth: 3
  }
];

// Sample Experiments
export const experiments: Experiment[] = [
  {
    id: 'exp1',
    title: 'Sales Funnel Optimization',
    description: 'Testing new email sequences with different value propositions. A/B testing subject lines, send times, and CTA placements.',
    status: 'Active',
    createdAt: '2024-03-01'
  },
  {
    id: 'exp2',
    title: 'Market Expansion Analysis',
    description: 'Researching new cities for potential expansion. Analyzing demographics, competition density, and regulatory environment.',
    status: 'Active',
    createdAt: '2024-02-15'
  },
  {
    id: 'exp3',
    title: 'CRM Integration',
    description: 'Automated deal scoring based on engagement signals. Connected email, calendar, and website analytics for unified view.',
    status: 'Completed',
    createdAt: '2024-01-20'
  }
];

// Contact Info
export const contactInfo = {
  name: 'Michael Kempski',
  email: 'hello@example.com',
  twitter: '@example',
  linkedin: 'linkedin.com/in/example',
  github: 'github.com/example'
};

// Resume Highlights
export const resumeHighlights = {
  currentRole: 'Building things',
  experience: [
    'Previously built and sold two startups',
    'Led product at a Series B company',
    '10+ years in tech'
  ],
  skills: ['Product Strategy', 'Customer Discovery', 'Growth', 'Engineering'],
  resumeUrl: '/resume.pdf'
};

// Helper to get comments for a specific note
export function getCommentsForNote(noteId: string): Comment[] {
  return comments.filter(c => c.noteId === noteId);
}

// Helper to get recent comments across all notes
export function getRecentComments(limit: number = 10): (Comment & { noteTitle: string })[] {
  return comments
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
    .map(comment => {
      const note = readingNotes.find(n => n.id === comment.noteId);
      return {
        ...comment,
        noteTitle: note ? `${note.title} by ${note.author}` : 'Unknown'
      };
    });
}

