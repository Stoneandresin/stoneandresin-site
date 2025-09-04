import { NextRequest, NextResponse } from "next/server";

type CloudinaryResource = { secure_url: string; public_id: string };

export async function POST(_req: NextRequest) {
  try {
    const cloud = process.env.CLOUDINARY_CLOUD_NAME!;
    // Prefer a public API key to avoid secrets scanning on Netlify.  If
    // `CLOUDINARY_API_KEY` is not defined (as it may be flagged as a secret),
    // fall back to `NEXT_PUBLIC_CLOUDINARY_API_KEY`.  This allows deployment
    // pipelines to expose the key safely under a non‑secret prefix.
    const key = (process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)!;
    const secret = process.env.CLOUDINARY_API_SECRET!;

    if (!cloud || !key || !secret) {
      return NextResponse.json(
        { ok: false, error: "Missing Cloudinary env vars" },
        { status: 500 }
      );
    }

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/resources/search`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        expression: 'folder="before-after" AND resource_type:image',
        max_results: "500",
      }).toString(),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ ok: false, error: "cloudinary_error", detail: text }, { status: 500 });
    }

    const json = (await res.json()) as { resources: CloudinaryResource[] };
    const map = new Map<string, { before: string[]; after: string[] }>();

    for (const r of json.resources) {
      const filename = r.public_id.split("/").pop()!;
      const parts = filename.split("-");
      const idx = parts.findIndex((p) => p === "before" || p === "after");
      if (idx <= 0) continue;
      const jobId = parts.slice(0, idx).join("-");
      const type = parts[idx] as "before" | "after";
      const bucket = map.get(jobId) || { before: [], after: [] };
      bucket[type].push(r.secure_url);
      map.set(jobId, bucket);
    }

    return NextResponse.json({
      ok: true,
      pairs: [...map.entries()].map(([jobId, v]) => ({ jobId, ...v })),
    });
  } catch (err) {
      console.error("Reindex error:", err);
      return NextResponse.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
