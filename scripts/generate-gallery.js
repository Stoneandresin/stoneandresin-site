const fs = require('fs');
const path = require('path');

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const GALLERY_ROOT = path.join(process.cwd(), "public", "gallery");
const PUBLIC_ROOT = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(process.cwd(), "data", "gallery-manifest.json");

function walk(dir, segments) {
  let photos = [];
  let entries;
  
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    console.warn(`Could not read directory ${dir}: ${e.message}`);
    return [];
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const nextSegments = [...segments, entry.name];
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      photos.push(...walk(fullPath, nextSegments));
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

console.log("Generating gallery manifest...");
try {
  if (!fs.existsSync(GALLERY_ROOT)) {
    console.log("No public/gallery directory found. Writing empty manifest.");
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    process.exit(0);
  }

  const photos = walk(GALLERY_ROOT, []);
  const sorted = photos.sort((a, b) => a.src.localeCompare(b.src)).reverse();
  
  // Ensure data directory exists
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sorted, null, 2));
  console.log(`Wrote ${sorted.length} photos to ${OUTPUT_FILE}`);
} catch (err) {
  console.error("Failed to generate gallery manifest:", err);
  process.exit(1);
}
