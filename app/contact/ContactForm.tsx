// app/contact/ContactForm.tsx (client component)
"use client";
import { useState } from "react";

/**
 * ContactForm renders an interactive form for collecting leads.
 * This component is marked as a client component because it uses
 * React hooks for state and interacts with the browser.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      // Post the form data to your API route. Replace this endpoint with a real webhook if needed.
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...form }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      setStatus("sent");
      // Clear the form after a successful submission.
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (e) {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="grid md:grid-cols-2 gap-4 mt-6 max-w-2xl"
    >
      <input
        className="input"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="input"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="input"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        className="input md:col-span-2"
        placeholder="Project details"
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button className="btn md:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {status === "sent" && (
        <p className="text-emerald-700 text-sm md:col-span-2">
         Thanks! We'll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm md:col-span-2">
          There was a problem. Please call 513‑787‑8798.
        </p>
      )}
    </form>
  );
}
