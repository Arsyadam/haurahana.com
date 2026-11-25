"use client"

import Link from "next/link"

import { BlurFade } from "@/components/ui/blur-fade"
import { DotPattern } from "@/components/ui/dot-pattern"
import { MagicCard } from "@/components/ui/magic-card"
import { TextAnimate } from "@/components/ui/text-animate"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Portfolio() {
  return (
    <div className="relative mx-auto max-w-2xl px-5 pb-28 pt-16 sm:px-8">
      <DotPattern
        className={cn(
          "opacity-40 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
        width={20}
        height={20}
        cr={1}
      />

      <section id="about" className="relative mb-16 scroll-mt-24">
        <BlurFade delay={0.05} inView>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">{site.about.heading}</h2>
          <TextAnimate
            as="p"
            by="word"
            animation="fadeIn"
            className="text-base leading-relaxed text-muted-foreground"
            once
          >
            {site.about.body}
          </TextAnimate>
          <p className="mt-4 text-sm text-muted-foreground">
            More on{" "}
            <Link
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand underline underline-offset-4"
            >
              LinkedIn
            </Link>
            .
          </p>
        </BlurFade>
      </section>

      <section id="education" className="relative mb-16 scroll-mt-24">
        <BlurFade delay={0.05} inView>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Education</h2>
        </BlurFade>
        <ul className="space-y-3">
          {site.education.map((item, i) => (
            <BlurFade key={item.school} delay={0.08 + i * 0.05} inView>
              <MagicCard
                className="rounded-xl"
                gradientFrom="#E11D48"
                gradientTo="#FB7185"
                gradientColor="#E11D4820"
                gradientOpacity={0.35}
              >
                <div className="flex items-start justify-between gap-4 p-4">
                  <div>
                    <h3 className="font-semibold">{item.school}</h3>
                    <p className="text-sm text-muted-foreground">{item.degree}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {item.period}
                  </span>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </ul>
      </section>

      <section id="projects" className="relative mb-16 scroll-mt-24">
        <BlurFade delay={0.05} inView>
          <h2 className="mb-2 text-2xl font-bold tracking-tight">Selected work</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Research and programs that are on the public record.
          </p>
        </BlurFade>
        <ul className="grid gap-4">
          {site.projects.map((project, i) => (
            <BlurFade key={project.title} delay={0.08 + i * 0.06} inView>
              <MagicCard
                className="rounded-xl"
                gradientFrom="#E11D48"
                gradientTo="#FB7185"
                gradientColor="#E11D4820"
                gradientOpacity={0.35}
              >
                <div className="space-y-3 p-5">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-brand">{project.subtitle}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-[11px] text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </ul>
      </section>

      <section id="contact" className="relative scroll-mt-24">
        <BlurFade delay={0.05} inView>
          <h2 className="mb-3 text-2xl font-bold tracking-tight">{site.contact.heading}</h2>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            {site.contact.body}
          </p>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-brand/90"
          >
            Message on LinkedIn
          </Link>
        </BlurFade>
      </section>
    </div>
  )
}
