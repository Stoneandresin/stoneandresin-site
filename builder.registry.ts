"use client";
import { Builder } from '@builder.io/sdk-react';
import CloudImage from '@/components/CloudImage';

Builder.registerComponent(CloudImage, {
  name: 'CloudImage',
  inputs: [
    { name: 'url', type: 'string', required: true, helperText: 'Paste your Cloudinary secure URL' },
    { name: 'alt', type: 'string' },
    { name: 'width', type: 'number', defaultValue: 800 },
    { name: 'height', type: 'number', defaultValue: 600 },
    { name: 'className', type: 'string', helperText: 'Tailwind classes (optional)' },
  ],
});
