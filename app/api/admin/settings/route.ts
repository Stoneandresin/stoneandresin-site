import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const file = path.join(process.cwd(), "public", "site-photos.json");

export async function GET() {
  try {
    const txt = await fs.readFile(file, "utf8");
    return NextResponse.json(JSON.parse(txt));
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await fs.writeFile(file, JSON.stringify(data, null, 2));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "write_failed" }, { status: 500 });
  }
}
