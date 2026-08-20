export const SITE = {
  name: 'Jonas Balandraux',
  title: 'Jonas Balandraux — ML Engineer / Data Scientist',
  description:
    'Personal site and extended CV of Jonas Balandraux, Machine Learning Engineer and Data Scientist.',
  email: 'balandrauxjonas@gmail.com',
  github: 'https://github.com/JonasBlx',
  linkedin: 'https://www.linkedin.com/in/', // TODO: full LinkedIn profile URL
} as const;

/** Nav entries are added as the corresponding pages land (see ROADMAP.md). */
export const NAV = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
] as const;
