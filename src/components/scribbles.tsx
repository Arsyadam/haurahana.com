import { cn } from "@/lib/utils"

export function PortraitScribbles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 420"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      fill="none"
    >
      <path
        d="M48 70c22-28 58-42 96-38 34 4 62 24 78 52"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-brand"
      />
      <path
        d="M246 96c18 24 26 58 18 90-6 28-24 52-48 68"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-brand"
      />
      <path
        d="M54 310c16 36 52 62 96 68 40 6 78-8 104-36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-brand"
      />
      <path
        d="M36 180c-8 34-2 72 18 102"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-brand"
      />
      <g className="text-brand" stroke="currentColor" strokeWidth="2.5" fill="none">
        <path d="M168 42c6 8 6 16 0 24-6-8-6-16 0-24Z" />
        <path d="M188 48c6 8 6 16 0 24-6-8-6-16 0-24Z" />
        <path d="M148 50c6 8 6 16 0 24-6-8-6-16 0-24Z" />
      </g>
      <path
        d="M268 220c12 4 20 14 18 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-brand"
      />
      <path
        d="M42 240c-10 8-14 20-10 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-brand"
      />
    </svg>
  )
}

export function NoteScribbles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 420"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M60 70c40-30 110-40 170-20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-brand/70"
      />
      <path
        d="M680 80c30 20 50 60 40 100"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-brand/70"
      />
      <path
        d="M90 340c50 30 140 40 210 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-brand/70"
      />
      <path
        d="M720 300c-20 40-70 70-120 70"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-brand/70"
      />
      <path
        d="M400 40c8 10 8 20 0 30-8-10-8-20 0-30Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand/80"
      />
      <path
        d="M430 48c8 10 8 20 0 30-8-10-8-20 0-30Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand/80"
      />
    </svg>
  )
}
