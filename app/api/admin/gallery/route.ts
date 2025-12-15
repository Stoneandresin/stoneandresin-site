import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

function verifyAdminAuth(req: NextRequest): boolean {
  const passwordHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH;
  if (!passwordHash) return false;
  
  const authHeader = req.headers.get("authorization");
  if (authHeader === `Bearer ${passwordHash}`) return true;
  
  return false;
}

export async function GET(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const manifestPath = path.join(process.cwd(), "data", "gallery-manifest.json");
    
    try {
      const content = await readFile(manifestPath, "utf-8");
      const photos = JSON.parse(content);
      
      return NextResponse.json({
        ok: true,
        photos,
        count: photos.length,
      });
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return NextResponse.json({
          ok: true,
          photos: [],
          count: 0,
        });
      }
      throw error;
    }
  } catch (error: any) {
    console.error("[admin/gallery] Error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to load gallery" },
      { status: 500 }
    );
  }
}

