import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })

  // Basic validation
  const name = (data.name || "").toString().trim()
  const email = (data.email || "").toString().trim()
  if (!name || !email) return NextResponse.json({ ok: false, error: "Name & email required" }, { status: 400 })

  // Forward to webhook if provided
  const url = process.env.LEAD_WEBHOOK_URL
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "stoneandresin.com", ...data, receivedAt: new Date().toISOString() })
      })
      if (!res.ok) {
        console.error("Webhook failed", res.status)
      }
    } catch (e) {
      console.error("Webhook error", e)
    }
  }

  return NextResponse.json({ ok: true })
}
