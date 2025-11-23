# How to Change Front Page Photos

This guide explains how to update photos on the Stone & Resin website front page.

## Quick Reference

All front page photos are configured in one centralized file:

**`/lib/frontPageContent.ts`**

## Photo Locations

### 1. Hero Image (Top of Page)
- **Current Path**: `/public/img/hero.webp`
- **Recommended Size**: 1600×1000px (16:10 aspect ratio)
- **Format**: WebP (with JPG fallback for older browsers via Next.js Image optimization)

To change:
1. Replace the image file at `/public/img/hero.webp`
2. Or update the path in `lib/frontPageContent.ts`:
   ```typescript
   export const heroImage = {
     src: "/img/your-new-hero.webp",
     alt: "Description of your image",
   };
   ```

### 2. Recent Projects Section
Photos are defined in the `recentProjects` array in `/lib/frontPageContent.ts`.

#### Before/After Project
```typescript
{
  id: "driveway-resurfacing",
  title: "Driveway resurfacing",
  type: "before-after",
  beforeImage: {
    src: "/gallery/before-photo.jpg",
    alt: "Before: description",
  },
  afterImage: {
    src: "/gallery/after-photo.jpg",
    alt: "After: description",
  },
  tags: ["Cincinnati, OH", "600 sq ft", "Blend: Grey mix"],
}
```

#### Single Image Project
```typescript
{
  id: "finished-edge",
  title: "Finished edge",
  type: "single",
  image: {
    src: "/gallery/your-photo.jpg",
    alt: "Description of image",
  },
  tags: ["Cincinnati, OH", "Detail type"],
}
```

**Recommended Image Size**: 1600×1000px (16:10 aspect ratio)

### 3. Certificate Image
- **Current Path**: `/public/AAC1A118-5584-4B37-9504-1F0C01C4B1D1.jpg`
- **Recommended Size**: 300×450px (2:3 aspect ratio)

## Step-by-Step: Adding a New Project Photo

1. **Add your photo** to `/public/gallery/` directory
   - Use descriptive filenames (e.g., `patio-mason-after.jpg`)
   - Optimize images before uploading (WebP recommended)

2. **Update the configuration** in `/lib/frontPageContent.ts`

3. **Add a new project** to the `recentProjects` array:
   ```typescript
   export const recentProjects = [
     // ... existing projects
     {
       id: "patio-mason",
       title: "Patio transformation",
       type: "single",
       image: {
         src: "/gallery/patio-mason-after.jpg",
         alt: "Modern resin-bound patio in Mason, OH",
       },
       tags: ["Mason, OH", "800 sq ft", "Blend: Nevada"],
     },
   ];
   ```

4. **Test your changes** by running `npm run dev` and visiting http://localhost:3000

## Tips

- **Image Optimization**: Use tools like [TinyPNG](https://tinypng.com/) or convert to WebP format
- **Alt Text**: Always provide descriptive alt text for accessibility
- **Aspect Ratio**: Maintain 16:10 for consistency (width ÷ height = 1.6)
- **File Size**: Keep images under 500KB for optimal loading
- **Naming**: Use kebab-case filenames (e.g., `driveway-cincinnati-after.jpg`)

## Re-ordering Projects

Projects appear in the order they're listed in the `recentProjects` array. Simply reorder the array items in `/lib/frontPageContent.ts` to change the display order.

## Removing a Project

Delete or comment out the project object from the `recentProjects` array in `/lib/frontPageContent.ts`.

## Need Help?

- Check `/public/gallery/` to see current photo files
- View `/lib/frontPageContent.ts` for current configuration
- Run `npm run build` to verify no errors before deploying
