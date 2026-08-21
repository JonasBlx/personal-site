import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const experiences = defineCollection({
  // `[^_]*` keeps underscore-prefixed files (e.g. _template.md) out of the build.
  loader: glob({ base: './src/content/experiences', pattern: '**/[^_]*.md' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    dateLabel: z.string(), // "Feb 2025 – Aug 2025"
    startDate: z.string(), // "2025-02", used for sorting
    duration: z.string().optional(),
    summary: z.string().optional(),
    tech: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    url: z.url().optional(),
    current: z.boolean().default(false),
  }),
});

export const collections = { experiences };
