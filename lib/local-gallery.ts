import path from "node:path";
import { readdir } from "node:fs/promises";

export type LocalPhoto = {
  src: string;
  label: string;
  category: string;
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const GALLERY_ROOT = path.join(process.cwd(), "public", "gallery");
const PUBLIC_ROOT = path.join(process.cwd(), "public");

async function walk(dir: string, segments: string[]): Promise<LocalPhoto[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const photos: LocalPhoto[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const nextSegments = [...segments, entry.name];
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      photos.push(...(await walk(fullPath, nextSegments)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) continue;

    const relativePath = path.relative(PUBLIC_ROOT, fullPath).replace(/\\/g, "/");
    const label = entry.name
      .replace(ext, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const categorySegments = segments.length ? segments : ["Gallery"];

    photos.push({
      src: `/${relativePath}`,
      label: label || "Project photo",
      category: categorySegments.join(" / "),
    });
  }

  return photos;
}

export async function loadLocalGallery(limit = 40): Promise<LocalPhoto[]> {
  try {
    const photos = await walk(GALLERY_ROOT, []);
    const sorted = photos.sort((a, b) => a.src.localeCompare(b.src)).reverse();
    return sorted.slice(0, limit);
  } catch (err) {
    console.error("loadLocalGallery error", err);
    return [];
  }
}
