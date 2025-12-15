import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

function verifyAdminAuth(req: NextRequest): boolean {
  const passwordHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH;
  if (!passwordHash) return false;
  
  const authHeader = req.headers.get("authorization");
  if (authHeader === `Bearer ${passwordHash}`) return true;
  
  return false;
}

export async function POST(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const scriptPath = "scripts/generate-gallery.js";
    const { stdout, stderr } = await execAsync(`node ${scriptPath}`);

    if (stderr && !stderr.includes("Wrote")) {
      console.error("[admin/regenerate-gallery] Error:", stderr);
      return NextResponse.json(
        { ok: false, error: stderr || "Failed to regenerate gallery" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Gallery manifest regenerated successfully",
      output: stdout,
    });
  } catch (error: any) {
    console.error("[admin/regenerate-gallery] Error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to regenerate gallery" },
      { status: 500 }
    );
  }
}

