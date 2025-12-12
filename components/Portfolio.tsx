import Image from "next/image";

export default function Portfolio(){
  const projects = [
    { title: "Amelia driveway", img: "/gallery/driveway-cincy-after-2.jpg" },
    { title: "Cincinnati pool deck", img: "/gallery/Before + After/Waterfront after.JPG" },
    { title: "Patio & walkway", img: "/gallery/Before + After/Hussein After 1.jpg" }
  ]
  return (
    <section id="surfaces" className="bg-gray-50 border-y border-gray-100">
      <div className="container py-14">
        <h2 className="section-title mb-6">Surfaces & Recent Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i)=>(
            <figure key={i} className="card overflow-hidden">
              <div className="relative w-full h-48">
                <Image 
                  src={p.img} 
                  alt={p.title} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                />
              </div>
              <figcaption className="p-4">{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
