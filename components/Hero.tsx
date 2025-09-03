import { CldImage } from 'next-cloudinary';

async function getHero() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/settings`, {
    next: { revalidate: 30 }, // cache 30s
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.hero as string | undefined;
}

export default async function Hero() {
  const heroId = await getHero();
  if (!heroId) {
    return <div className="h-96 bg-gray-200 flex items-center justify-center">No hero set</div>;
  }
  return (
    <div className="relative h-96 w-full">
      <CldImage
        src={heroId}
        alt="Hero"
        width={1600}
        height={900}
        crop="fill"
        gravity="auto"
        priority
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl text-white font-bold drop-shadow-lg">Stone & Resin</h1>
      </div>
    </div>
  );
}
