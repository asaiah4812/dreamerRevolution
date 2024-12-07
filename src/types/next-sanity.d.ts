declare module 'next-sanity' {
  import { SanityClient } from '@sanity/client';
  import { ClientConfig } from '@sanity/client';

  // Specify the type for the config parameter
  export function createClient(config: ClientConfig): SanityClient;

  // Use `unknown` or a more specific type if possible
  export const groq: string; // Assuming groq is a string, update if needed
}

declare module 'next-sanity/studio' {
  import React from 'react';

  // Use a generic or more explicit type for the `config` prop
  export const NextStudio: React.FC<{ config: Record<string, unknown> }>;
}

declare module '@sanity/vision' {
  // Return a more specific type for `visionTool` if available
  export const visionTool: () => unknown;
}
