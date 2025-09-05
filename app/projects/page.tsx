export const metadata = { title: "Projects" }

export default function ProjectsPage(){
  const items = Array.from({length:9}).map((_,i)=>({title:`Project ${i+1}`, img:"/placeholder.jpg"}))
  return (
    <main>
      <Navbar />
      <section className="container py-14">
        <h1 className="section-title mb-6">Recent projects</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((p,i)=>(
            <figure key={i} className="card overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
              <figcaption className="p-4">{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
