// ... your imports ...
import { useState, useMemo } from "react";

export default function Page() {
  const [area, setArea] = useState<number>(400);
  const [open, setOpen] = useState(false);

  const [condition, setCondition] = useState<Condition>("moderate");
  const { low, high } = useMemo(
    () => estimate(area || 0, condition),
    [area, condition]
  ); // <-- This parenthesis closes useMemo

  return (
    <main>
      {/* Hero */}
      <section className="container py-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Resin-Bound Surfaces, Installed Right.
          </h1>
          <p className="mt-3 text-gray-600">
            Premium, permeable Vuba stone systems for driveways, patios,
            walkways, and pool decks across Greater Cincinnati.
          </p>
        </div>
      </section>

      {/* Vuba blends carousel — right under hero */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Choose Your Vuba Blend</h2>
        {/* ...rest of your component... */}
      </section>
    </main>
  );
}
