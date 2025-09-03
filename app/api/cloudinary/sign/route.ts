import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const hdr = request.headers.get("x-admin-key") || "";
  if (!process.env.ADMIN_KEY || hdr !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const cloud = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  if (!cloud || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Missing Cloudinary env vars" }, { status: 500 });
  }

  const folder = "before-after";
  const timestamp = Math.floor(Date.now() / 1000);
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  return NextResponse.json({ cloudName: cloud, apiKey, folder, timestamp, signature });
}
