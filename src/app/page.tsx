import { HandwrittenNote } from "@/components/handwritten-note"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { SiteDock } from "@/components/site-dock"

export default function Home() {
  return (
    <main id="top" className="flex-1 pb-24">
      <Hero />
      <HandwrittenNote />
      <Portfolio />
      <SiteDock />
    </main>
  )
}
