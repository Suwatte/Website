import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docPage = z.object({
  title: z.string(),
  description: z.string(),
  /** Optional short label for the sidebar; falls back to the entry in consts.ts. */
  sidebarLabel: z.string().optional(),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: docPage,
});

const developers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/developers' }),
  schema: docPage,
});

export const collections = { docs, developers };
