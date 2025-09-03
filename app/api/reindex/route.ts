// app/api/reindex/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Admin gate
  const hdr = req.headers.get("x-admin-key") || "";
  if (!process.env.ADMIN_KEY || hdr !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const cloud = process.env.CLOUDINARY_CLOUD_NAME!;
    const key = process.env.CLOUDINARY_API_KEY!;
    const secret = process.env.CLOUDINARY_API_SECRET!;
    if (!cloud || !key || !secret) {
      return NextResponse.json({ error: "Missing Cloudinary env vars" }, { status: 500 });
    }

    const searchUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/search`;
    const body = new URLSearchParams({
      expression: 'folder="before-after" AND resource_type:image',
      max_results: "500",
    });

    const res = await fetch(searchUrl, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json({ error: "cloudinary_error", detail: t }, { status: 500 });
    }

    const json = (await res.json()) as {
      resources: Array<{ secure_url: string; public_id: string }>;
    };

    const map = new Map<string, { before: string[]; after: string[] }>();

    for (const r of json.resources) {
      const filename = r.public_id.split("/").pop() || "";
      const parts = filename.split("-");
      const typeIndex = parts.findIndex((p) => p === "before" || p === "after");
      if (typeIndex <= 0) continue;

      const jobId = parts.slice(0, typeIndex).join("-");
      const kind = parts[typeIndex] as "before" | "after";

      const rec = map.get(jobId) || { before: [], after: [] };
      rec[kind].push(r.secure_url);
      map.set(jobId, rec);
    }

    const pairs = Array.from(map.entries())
      .filter(([, v]) => v.before.length && v.after.length)
      .map(([jobId, v]) => ({
        jobId,
        before: v.before.sort(),
        after: v.after.sort(),
      }));

    return NextResponse.json({ pairs });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "unknown" }, { status: 500 });
  }
}
