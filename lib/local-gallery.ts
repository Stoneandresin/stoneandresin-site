import galleryManifest from "@/data/gallery-manifest.json";

export type LocalPhoto = {
  src: string;
  label: string;
  category: string;
};

export async function loadLocalGallery(limit = 40): Promise<LocalPhoto[]> {
  try {
    // The manifest is generated at build time.
    // We cast it to LocalPhoto[] because JSON imports are sometimes loosely typed or 'any'.
    const photos = galleryManifest as LocalPhoto[];
    return photos.slice(0, limit);
  } catch (err) {
    console.error("loadLocalGallery error", err);
    return [];
  }
}

