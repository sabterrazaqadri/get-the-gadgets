import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-27',
  useCdn: false,
});

// Create image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export const urlForImage = (source: any, width = 300, height = 300) => {
  if (!source?.asset?._ref) return '';
  return builder.image(source).width(width).height(height).url();
};