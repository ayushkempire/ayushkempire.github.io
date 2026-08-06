const items = [
  "Backend Engineering",
  "Full-stack Systems",
  "REST APIs",
  "PostgreSQL",
  "Next.js",
  "TypeScript",
  "AI Integration",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-5">
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-serif text-2xl italic md:text-3xl">{item}</span>
            <span className="text-signal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
