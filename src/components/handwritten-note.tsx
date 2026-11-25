"use client"

import { BlurFade } from "@/components/ui/blur-fade"
import { TextAnimate } from "@/components/ui/text-animate"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { NoteScribbles } from "@/components/scribbles"
import { site } from "@/lib/site"

export function HandwrittenNote() {
  return (
    <section
      aria-label="a written note"
      className="relative flex min-h-[70svh] items-center justify-center overflow-hidden border-y border-brand/15 px-5 py-20 sm:px-8"
    >
      <NoteScribbles />
      <BlurFade delay={0.1} inView className="relative z-10 mx-auto max-w-3xl text-center">
        <TypingAnimation
          as="p"
          className="mb-8 font-mono text-xs tracking-[0.25em] text-brand uppercase leading-none"
          duration={40}
          startOnView
        >
          a note from the lab
        </TypingAnimation>
        <TextAnimate
          as="p"
          by="word"
          animation="blurInUp"
          once
          className="font-note text-3xl leading-snug text-brand sm:text-4xl md:text-5xl"
        >
          {site.handwrittenNote}
        </TextAnimate>
        <p className="mt-10 font-mono text-sm text-ink/60 dark:text-cream/60">
          — {site.shortName}
        </p>
      </BlurFade>
    </section>
  )
}
