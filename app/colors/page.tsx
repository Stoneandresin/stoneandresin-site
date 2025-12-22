import ColorsSlider from '../../components/ColorsSlider';

export const metadata = {
  title: 'Colors | Stone & Resin',
  description: 'Explore our range of resin-bound color blends.',
};

export default function ColorsPage() {
  return (
    <main>
      <div className="bg-slate-900 pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-serif text-white mb-4">Color Collection</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Explore our range of resin-bound aggregate blends.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <ColorsSlider />
      </div>
    </main>
  );
}
