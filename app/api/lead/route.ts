import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json().catch(() => null);
    if (!data) {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    // Basic normalization
    const name  = String(data.name ?? "").trim().slice(0, 200);
    const email = String(data.email ?? "").trim().slice(0, 200);
    const phone = data.phone ? String(data.phone).trim().slice(0, 40) : undefined;
    const zip   = data.zip   ? String(data.zip).trim().slice(0, 20)   : undefined;

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name & email required" }, { status: 400 });
    }

    const url = process.env.LEAD_WEBHOOK_URL;

    const payload = {
      source: "stoneandresin.com",
      ...data,
      name, email, phone, zip,
      receivedAt: new Date().toISOString(),
      // Optional observability:
      userAgent: req.headers.get("user-agent") ?? undefined,
      ip: req.headers.get("x-forwarded-for") ?? req.ip ?? undefined,
    };

    if (!url) {
      // Fallback: accept the lead and log it when webhook is not configured
      console.warn("[lead] LEAD_WEBHOOK_URL not set. Logging payload only.", payload);
      return NextResponse.json({ ok: true, note: "lead accepted (no webhook configured)" }, { status: 200 });
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      // Bubble up failure so the UI can show a real error
      return NextResponse.json({ ok: false, error: "webhook_failed", status: res.status }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "unknown" }, { status: 500 });
  }
}
