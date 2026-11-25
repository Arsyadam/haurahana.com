"use client"

import Link from "next/link"
import { HomeIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Dock, DockIcon } from "@/components/ui/dock"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteDock() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center">
      <Dock className="pointer-events-auto border-border/60 bg-background/80 shadow-lg">
        <DockIcon>
          <Link
            href="#top"
            aria-label="Home"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
              "size-full rounded-full"
            )}
          >
            <HomeIcon className="size-4" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
              "size-full rounded-full"
            )}
          >
            <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V23h-4V8.5z" />
            </svg>
          </Link>
        </DockIcon>
        <span className="mx-1 h-6 w-px bg-border" aria-hidden />
        <DockIcon>
          <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
              "size-full rounded-full"
            )}
          >
            {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          </button>
        </DockIcon>
      </Dock>
    </div>
  )
}
