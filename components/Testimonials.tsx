export default function Testimonials(){
  const items = [
    { name: "M. M., Amelia", text: "Our driveway drains perfectly after storms—and it looks amazing.", rating: 5 },
{ name: "K. R., Cincinnati", text: "Color hasn't faded through summer sun. Crew was professional.", rating: 5 },
    { name: "R. D., Anderson", text: "Fast install, zero puddles, and easy cleanup. Worth it.", rating: 5 }
  ]
  return (
    <section className="container py-14">
      <h2 className="section-title mb-6">Ohio customers, real results</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i)=>(
          <figure key={i} className="card p-5">
            <div className="flex items-center gap-2 text-amber-500" aria-label={`${t.rating} star rating`}>
              {"★★★★★".slice(0,t.rating)}
            </div>
            <blockquote className="mt-3 text-gray-800">“{t.text}”</blockquote>
            <figcaption className="mt-3 text-sm subtle">— {t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
