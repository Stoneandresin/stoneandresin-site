// app/schedule/page.tsx
"use client";
import CalendlyWidget from "@/components/CalendlyWidget";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-4">
      <h1 className="text-3xl font-semibold">Book a Consultation</h1>
      <p className="text-gray-600">
        Pick a time that works. We'll confirm by SMS.
      </p>
      <CalendlyWidget url="https://calendly.com/stoneandresin/estimate" />
    </main>
  );
}
