"use client"

import { useEffect, useState } from "react"

import { ComicText } from "@/components/ui/comic-text"
import { Marquee } from "@/components/ui/marquee"
import { PortraitScribbles } from "@/components/scribbles"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Hero() {
  const [firstName, setFirstName] = useState("")
  const [editing, setEditing] = useState(false)
  const [showPortrait, setShowPortrait] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    let cancelled = false
    const img = new window.Image()
    img.onload = () => {
      if (!cancelled) setShowPortrait(true)
    }
    img.src = site.portrait
    return () => {
      cancelled = true
    }
  }, [])

  const greeting = firstName.trim() || "{{ first name }}"

  return (
    <section aria-label={`hello, meet ${site.shortName.toLowerCase()}`} className="relative">
      <div className="border-b border-brand/20 bg-ink text-cream">
        <Marquee className="py-2 [--duration:28s] [--gap:2.5rem]" pauseOnHover>
          {site.marquee.map((item) => (
            <span
              key={item}
              className="font-mono text-xs tracking-wide uppercase whitespace-nowrap sm:text-sm"
            >
              {item}
              <span className="mx-3 text-brand" aria-hidden>
                ♥
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="min-h-[2.2rem]" suppressHydrationWarning>
          {mounted ? (
            <ComicText fontSize={1.35} className="!skew-x-0 tracking-tight">
              haura
            </ComicText>
          ) : (
            <span
              className="inline-block text-[1.35rem] font-black tracking-tight text-brand uppercase"
              style={{ fontFamily: "Bangers, Impact, sans-serif" }}
            >
              haura
            </span>
          )}
        </div>
        <a
          href="#about"
          className="font-mono text-xs tracking-[0.2em] text-brand uppercase underline-offset-4 hover:underline"
        >
          menu
        </a>
      </header>

      <div className="relative mx-auto grid min-h-[calc(100svh-7.5rem)] max-w-6xl grid-cols-1 content-center items-center gap-8 px-5 pb-20 pt-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr_1.1fr] lg:gap-6 lg:pb-16">
        <div className="order-1 flex flex-wrap items-start gap-4 sm:gap-6 lg:self-start lg:pt-6">
          <h1 className="text-5xl font-black tracking-tight text-brand uppercase sm:text-7xl lg:text-8xl">
            hello
          </h1>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className={cn(
              "mt-2 max-w-[14rem] border-b border-dashed border-brand/60 pb-1 text-left font-mono text-sm text-brand sm:mt-4 sm:text-base",
              !firstName && "opacity-80"
            )}
            aria-label="type your first name"
          >
            {editing ? (
              <input
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value || "")}
                onBlur={() => setEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setEditing(false)
                }}
                placeholder="first name"
                className="w-full bg-transparent outline-none placeholder:text-brand/40"
              />
            ) : (
              <span>
                {greeting}
                <span className="ml-0.5 animate-blink-cursor">|</span>
              </span>
            )}
          </button>
        </div>

        <div className="relative order-2 mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:order-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-brand/10">
            {showPortrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.portrait}
                alt={site.name}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-brand/15 to-brand/5">
                <span className="text-6xl font-black tracking-tighter text-brand/80">
                  {site.initials}
                </span>
              </div>
            )}
          </div>
          <PortraitScribbles className="-inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]" />
        </div>

        <div className="order-3 space-y-4 lg:col-start-1 lg:row-start-1 lg:self-end lg:pb-6">
          <p className="text-5xl font-black tracking-tight text-brand uppercase sm:text-7xl lg:text-8xl">
            meet
          </p>
        </div>

        <div className="order-4 space-y-3 lg:col-start-3 lg:row-start-1 lg:self-end lg:pb-6 lg:text-right">
          <p className="font-mono text-[11px] leading-relaxed tracking-wide text-ink/80 uppercase sm:text-xs dark:text-cream/70">
            {firstName.trim()
              ? `${firstName.trim()}, meet a researcher with plants and a headset.`
              : site.tagline}
          </p>
          <p className="text-5xl font-black tracking-tight text-brand uppercase sm:text-7xl lg:text-8xl">
            {site.displayName}
          </p>
        </div>
      </div>
    </section>
  )
}
