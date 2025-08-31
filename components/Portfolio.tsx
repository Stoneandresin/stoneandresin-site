export default function Portfolio(){
  const projects = [
    { title: "Amelia driveway", img: "/placeholder.jpg" },
    { title: "Cincinnati pool deck", img: "/placeholder.jpg" },
    { title: "Patio & walkway", img: "/placeholder.jpg" }
  ]
  return (
    <section id="surfaces" className="bg-gray-50 border-y border-gray-100">
      <div className="container py-14">
        <h2 className="section-title mb-6">Surfaces & Recent Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i)=>(
            <figure key={i} className="card overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
              <figcaption className="p-4">{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
