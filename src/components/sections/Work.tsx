import { projects } from "@/lib/content";
import { SectionHeading } from "../SectionHeading";
import { ProjectCard } from "../ProjectCard";

// Asymmetric editorial layout for up to five items; extras flow in pairs.
const layout = [
  { col: "lg:col-span-7", aspect: "aspect-[4/5] md:aspect-[5/6]" },
  { col: "lg:col-span-4 lg:col-start-9 lg:mt-48", aspect: "aspect-[4/5]" },
  { col: "lg:col-span-5 lg:mt-8", aspect: "aspect-square" },
  { col: "lg:col-span-6 lg:col-start-7 lg:-mt-24", aspect: "aspect-[5/4]" },
  { col: "lg:col-span-4 lg:col-start-3 lg:mt-4", aspect: "aspect-[4/5]" },
];

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y gutter bg-paper">
      <SectionHeading
        eyebrow="03 / Selected Work"
        id="work-title"
        size="xl"
        lines={["The work", "speaks."]}
        aside={
          <p className="text-ink/75">
            A new studio, so we label things honestly: concepts are self-initiated explorations of
            how we think. Client case studies will appear here as they launch.
          </p>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
        {projects.map((p, i) => {
          const l = layout[i] ?? { col: "lg:col-span-6", aspect: "aspect-[4/3]" };
          return (
            <ProjectCard
              key={p.slug}
              project={p}
              aspect={l.aspect}
              className={`${l.col} ${i === 0 ? "md:col-span-2 lg:col-span-7" : ""}`}
            />
          );
        })}
      </div>
    </section>
  );
}
