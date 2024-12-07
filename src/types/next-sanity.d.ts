declare module 'next-sanity' {
  import { SanityClient } from '@sanity/client';
  export function createClient(config: any): SanityClient;
  export const groq: any;
}

declare module 'next-sanity/studio' {
  export const NextStudio: React.FC<{ config: any }>;
}

declare module '@sanity/vision' {
  export const visionTool: () => any;
} 