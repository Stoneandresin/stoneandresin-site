import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function verifyAdminAuth(req: NextRequest): boolean {
  const passwordHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH;
  if (!passwordHash) return false;
  
  // Check for authorization header (client can pass the hash after verifying password)
  const authHeader = req.headers.get("authorization");
  if (authHeader === `Bearer ${passwordHash}`) return true;
  
  return false;
}

function sanitizeFilename(filename: string): string {
  // Remove path separators and keep only safe characters
  const base = path.basename(filename);
  return base
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 255) || "image";
}

export async function POST(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { ok: false, error: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: `File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Determine save directory
    const galleryRoot = path.join(process.cwd(), "public", "gallery");
    const saveDir = category
      ? path.join(galleryRoot, category.replace(/[^a-zA-Z0-9_-]/g, "-"))
      : galleryRoot;

    // Ensure directory exists
    if (!existsSync(saveDir)) {
      await mkdir(saveDir, { recursive: true });
    }

    // Sanitize and create filename
    const sanitizedName = sanitizeFilename(file.name);
    const filename = sanitizedName.endsWith(ext) ? sanitizedName : `${sanitizedName}${ext}`;
    const filePath = path.join(saveDir, filename);

    // Handle filename conflicts
    let finalPath = filePath;
    let counter = 1;
    while (existsSync(finalPath)) {
      const baseName = path.basename(filename, ext);
      finalPath = path.join(saveDir, `${baseName}-${counter}${ext}`);
      counter++;
    }

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(finalPath, buffer);

    // Return relative path from public directory
    const relativePath = path
      .relative(path.join(process.cwd(), "public"), finalPath)
      .replace(/\\/g, "/");

    return NextResponse.json({
      ok: true,
      path: `/${relativePath}`,
      filename: path.basename(finalPath),
    });
  } catch (error: any) {
    console.error("[admin/upload] Error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Upload failed" },
      { status: 500 }
    );
  }
}

