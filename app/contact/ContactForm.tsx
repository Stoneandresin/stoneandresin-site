"use client"
import { useState, useEffect } from "react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  useEffect(() => {
    // Pre-fill message subject from URL params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const subject = params.get('subject')
      if (subject) {
        setMessage(`Subject: ${decodeURIComponent(subject)}\n\n`)
      }
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please add name, email, and phone.")
      return
    }
    try {
      setStatus("sending")
      console.log("Contact lead", { name, email, phone, message })
      await new Promise(r => setTimeout(r, 600))
      setStatus("sent")
    } catch (e) {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 max-w-xl">
      <div>
        <label className="label">Full name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="label">Project details (optional)</label>
        <textarea className="input min-h-28" value={message} onChange={e=>setMessage(e.target.value)} />
      </div>
      <button type="submit" className="btn" disabled={status==="sending"}>
        {status==="sending" ? "Sending..." : "Book my on‑site quote"}
      </button>
      {status==="sent" && <p className="text-emerald-700 text-sm">Thanks! We'll be in touch shortly.</p>}
      {status==="error" && <p className="text-red-600 text-sm">There was a problem submitting. Please call 513-787-8798.</p>}
    </form>
  )
}
