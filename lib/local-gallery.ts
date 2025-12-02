import galleryManifest from "@/data/gallery-manifest.json";

export type LocalPhoto = {
  src: string;
  label: string;
  category: string;
};

const fallbackPhotos: LocalPhoto[] = [
  {
    src: "/gallery/driveway-cincy-after.jpg",
    label: "Cincinnati driveway — finished surface",
    category: "Driveway",
  },
  {
    src: "/gallery/driveway-cincy-before.jpg",
    label: "Driveway prep before resin",
    category: "Driveway",
  },
  {
    src: "/gallery/Best Photos/Patios/Commercial-2-.jpg",
    label: "Commercial patio resurfacing",
    category: "Patio",
  },
  {
    src: "/gallery/Best Photos/Pool Deck/Paradise Pools NW - Rio Medina Pool Deck.jpg",
    label: "Pool deck with non-slip finish",
    category: "Pool Deck",
  },
  {
    src: "/gallery/Steps/Stair case 1.jpg",
    label: "Granular finish on front steps",
    category: "Steps",
  },
  {
    src: "/gallery/Best Photos/Driveways/Permeable.jpg",
    label: "Permeable driveway detail",
    category: "Driveway",
  },
];

export async function loadLocalGallery(limit = 40): Promise<LocalPhoto[]> {
  try {
    // The manifest is generated at build time.
    // We cast it to LocalPhoto[] because JSON imports are sometimes loosely typed or 'any'.
    const photos = (galleryManifest as LocalPhoto[]).slice(0, limit);
    if (photos.length > 0) return photos;
  } catch (err) {
    console.error("loadLocalGallery error", err);
  }

  return fallbackPhotos.slice(0, limit);
}

