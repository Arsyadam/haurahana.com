import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { achievements, educationNote, educationSchools, research, social, sources } from './content'
import { aestheticPhoto, loadMediumPosts, type MediumPost } from './medium-feed'

const logoWordStyle: CSSProperties = {
  display: 'block',
  font: "700 42px/1 'Comic Sans MS', 'Bradley Hand', cursive",
  color: 'var(--red)',
  letterSpacing: '-0.02em',
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && node.classList.add('is-visible'),
      { threshold: 0.16 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return ref
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

function useMotionScenes() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.add('motion-ready')
    if (reduced) return

    let frame = 0
    const update = () => {
      frame = 0
      const viewport = window.innerHeight
      const scroll = window.scrollY
      document.documentElement.style.setProperty('--scroll', `${scroll}`)
      document.documentElement.style.setProperty('--hero-p', `${clamp(scroll / viewport)}`)

      document.querySelectorAll<HTMLElement>('.quote-section blockquote > *').forEach((line, index) => {
        const section = line.closest('.quote-section')!.getBoundingClientRect()
        const reveal = clamp((viewport * 0.82 - section.top - index * viewport * 0.045) / (viewport * 0.32))
        line.style.setProperty('--line-p', `${reveal}`)
      })

      document.querySelectorAll<HTMLElement>('.service-row').forEach(row => {
        const box = row.getBoundingClientRect()
        const distance = Math.abs(box.top + box.height / 2 - viewport / 2)
        row.style.setProperty('--focus', `${clamp(1 - distance / (viewport * 0.62))}`)
      })

      document.querySelectorAll<HTMLElement>('.project').forEach((card, index) => {
        const section = card.closest('.portfolio')!.getBoundingClientRect()
        const progress = clamp((viewport * 0.88 - section.top - index * viewport * 0.08) / (viewport * 0.58))
        card.style.setProperty('--card-p', `${progress}`)
      })

      const writing = document.querySelector<HTMLElement>('.writing-section')
      if (writing) {
        const box = writing.getBoundingClientRect()
        const progress = clamp((viewport - box.top) / (viewport + box.height))
        writing.style.setProperty('--adv-p', `${progress}`)
      }
    }
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])
}

function Marquee() {
  const copy = Array.from({ length: 6 }, (_, index) => (
    <span className="marquee-item" key={index}>
      SMA NEGERI 3 YOGYAKARTA · ITB · PADMANABA
      <span className="heart" aria-hidden="true"><SketchedHeart /></span>
    </span>
  ))
  return (
    <div className="marquee" aria-label="SMA Negeri 3 Yogyakarta, ITB, Padmanaba">
      <div className="marquee-track">
        <div className="marquee-run">{copy}</div>
        <div className="marquee-run" aria-hidden="true">{copy}</div>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="haura, home">
      <span style={logoWordStyle}>haura</span>
    </a>
  )
}

const menuItems = [
  { label: 'EDUCATION', href: '#education' },
  { label: 'RESEARCH', href: '#research' },
  { label: 'WRITING', href: '#writing' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
] as const

function MenuOverlay({ open, close }: { open: boolean; close: () => void }) {
  return (
    <div className={`menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="menu-top">
        <Logo />
        <button className="menu-close" onClick={close} aria-label="Close menu"><span /><span /></button>
      </div>
      <nav className="menu-links" aria-label="Overlay navigation">
        {menuItems.map((item, index) => (
          <a
            className={index === 0 ? 'active' : ''}
            href={item.href}
            onClick={close}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <img className="menu-photo" src="/haura.png" alt="Haura Hanarissa Putri" />
      <div className="menu-mark" aria-hidden="true">✳</div>
      <div className="menu-social">
        <a href={sources.mediumProfile} target="_blank" rel="noreferrer">
          MEDIUM
        </a>
      </div>
    </div>
  )
}

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="site-header">
      <Logo />
      <button className="burger" onClick={onMenu} aria-label="Open menu"><span /><span /><span /></button>
    </header>
  )
}

function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  )
}

function FloatingElements() {
  const links = [
    { href: social.linkedin, name: 'LinkedIn', path: 'M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.48h4.52V24H.24V8.48zM8.34 8.48h4.33v2.12h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.02 5.42 6.94V24h-4.52v-7.7c0-1.84-.04-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24H8.34V8.48z' },
    { href: social.email, name: 'Email', path: 'M2 4h20v16H2V4zm10 7.2L4.2 6h15.6L12 11.2zM4 8.4V18h16V8.4l-8 5.2-8-5.2z' },
    { href: social.instagram, name: 'Instagram', path: 'M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zM17.8 6.7a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12zM21.4 7.1a6.3 6.3 0 0 0-1.72-4.46A6.3 6.3 0 0 0 15.22 1H8.78A6.3 6.3 0 0 0 4.32 2.64 6.3 6.3 0 0 0 2.6 7.1v6.44a6.3 6.3 0 0 0 1.72 4.46A6.3 6.3 0 0 0 8.78 23h6.44a6.3 6.3 0 0 0 4.46-1.72 6.3 6.3 0 0 0 1.72-4.46zM19.6 17.4a3.6 3.6 0 0 1-2 2 3.6 3.6 0 0 1-2.38.4H8.78a3.6 3.6 0 0 1-2.38-.4 3.6 3.6 0 0 1-2-2 3.6 3.6 0 0 1-.4-2.38V7.1a3.6 3.6 0 0 1 .4-2.38 3.6 3.6 0 0 1 2-2A3.6 3.6 0 0 1 8.78 2.3h6.44a3.6 3.6 0 0 1 2.38.42 3.6 3.6 0 0 1 2 2 3.6 3.6 0 0 1 .4 2.38z' },
    { href: social.medium, name: 'Medium', path: 'M4.3 7.4a.7.7 0 0 0-.23-.6L2.2 4.7V4.4h5.5l4.26 9.33L16.4 4.4H21.6v.3l-1.63 1.56a.42.42 0 0 0-.16.4v10.1a.42.42 0 0 0 .16.4l1.59 1.56v.3h-8v-.3l1.65-1.6c.16-.16.16-.21.16-.4V8.7l-4.58 11.62h-.62L4.7 8.7v7.78c-.04.32.06.64.28.87l2.14 2.6v.3H2.1v-.3l2.14-2.6c.22-.23.32-.55.28-.87z' },
  ] as const
  return (
    <>
      <nav className="nominee social-rail" aria-label="Social links">
        {links.map(link => (
          <a key={link.name} href={link.href} target="_blank" rel="noreferrer" aria-label={link.name} title={link.name}>
            <Icon path={link.path} />
          </a>
        ))}
      </nav>
      <a className="contact-float" href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <svg viewBox="0 0 60 48" aria-hidden="true">
          <path d="M4 5h52v38H4z" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="m5 7 25 20L55 7" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M30 36c-8-5-9-10-5-12 3-2 5 1 5 1s2-3 5-1c4 2 3 7-5 12Z" fill="currentColor" />
        </svg>
      </a>
    </>
  )
}

function SketchedHeart() {
  return (
    <svg className="heart-sketch" viewBox="0 0 32 28" aria-hidden="true">
      <path
        d="M8 4c-3 0-5 3-4 6 1 4 9 12 12 15 3-3 11-11 12-15 1-3-1-6-4-6-2 0-4 1-5 3-1-2-3-3-5-3-2 0-4 1-6 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Doodles() {
  return (
    <svg className="hero-doodles" viewBox="0 0 700 790" aria-hidden="true">
      <path d="M135 177c-45-44-70-11-42 21 19 22 66 6 35-38-35-49-73-3-44 42" />
      <path d="M478 70c-22 21-38 53-16 74 20 20 67-9 37-30-28-20-72 23-35 45" />
      <path d="M92 432c-47 4-64 44-21 57 52 17 63-47 11-36-31 7-34 43-3 54" />
      <path d="M578 367c-49-31-83 12-43 42 44 34 91-18 42-45-24-13-53 9-43 33" />
      <path d="M514 636c-38 6-50 44-10 52 44 9 65-44 20-47" />
      <path d="M180 624c-30 28-7 62 25 40 28-20 18-61-14-46" />
      <path d="M330 34c-8 21-10 38-6 56M308 48l21-12m-12 34 21-10" />
      <path d="M625 231l-31 22m41 0-38-13m24 37-25-28" />
    </svg>
  )
}

function Hero() {
  const phrase = 'SMA NEGERI 3 YOGYAKARTA.'
  const [typed, setTyped] = useState('')
  useEffect(() => {
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTyped(phrase.slice(0, index))
      if (index >= phrase.length) window.clearInterval(timer)
    }, 45)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero')
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (event: PointerEvent) => {
      hero.style.setProperty('--my', `${(event.clientY / window.innerHeight - 0.5) * 10}px`)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return (
    <section className="hero" id="top">
      <div className="hero-label">{'{{ first name }}'}</div>
      <h1 className="hero-word hello"><span>HELLO</span></h1>
      <h1 className="hero-word meet"><span>MEET</span></h1>
      <h1 className="hero-word sruthi"><span>HAURA</span></h1>
      <div className="hero-art">
        <Doodles />
        <img className="hero-photo" src="/haura.png" alt="Haura Hanarissa Putri" />
      </div>
      <p className="hero-role">{typed}<span className="caret">|</span></p>
    </section>
  )
}

function Vision() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="quote-section reveal" id="vision" ref={ref}>
      <span className="quote-dot d1" /><span className="quote-dot d2" />
      <span className="quote-star s1">✳</span><span className="quote-star s2">×</span>
      <blockquote>
        <span>the vision of honey:</span>
        <span>rooms that feel slow,</span>
        <span>warm, a little sweet—</span>
        <span>living green first,</span>
        <span>then that same calm</span>
        <span>on a headset.</span>
        <cite>— introduction, haura</cite>
      </blockquote>
    </section>
  )
}

function ResearchSection() {
  const ref = useReveal<HTMLElement>()
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const list = listRef.current?.querySelectorAll('.service-row-detail .service-row')
    if (!list) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.target.classList.toggle('active', entry.isIntersecting)),
      { rootMargin: '-37% 0px -37% 0px', threshold: 0 },
    )
    list.forEach(row => observer.observe(row))
    return () => observer.disconnect()
  }, [])
  return (
    <section className="services research-section reveal" id="research" ref={ref}>
      <div className="services-copy">
        <h2>RESEARCH</h2>
      </div>
      <div className="services-list" ref={listRef}>
        <div className="service-row-detail">
          <a
            className="service-row service-row-virblox"
            href={research.href}
            target="_blank"
            rel="noreferrer"
          >
            {research.title}
          </a>
          <p className="service-row-tagline">{research.tagline}</p>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const ref = useReveal<HTMLElement>()
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const list = listRef.current?.querySelectorAll('.service-row-detail .service-row')
    if (!list) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.target.classList.toggle('active', entry.isIntersecting)),
      { rootMargin: '-37% 0px -37% 0px', threshold: 0 },
    )
    list.forEach(row => observer.observe(row))
    return () => observer.disconnect()
  }, [])
  return (
    <section className="services education-section reveal" id="education" ref={ref}>
      <div className="services-list" ref={listRef}>
        {educationSchools.map(school => (
          <div key={school.school} className="service-row-detail">
            <img className="edu-logo" src={school.logo} alt="" />
            <div className={`service-row${school.school.length > 24 ? ' service-row-long' : ''}`}>
              {school.school}
            </div>
            <p className="service-row-meta">{school.major}</p>
          </div>
        ))}
      </div>
      <div className="services-copy">
        <h2>EDUCATION</h2>
        <p>{educationNote}</p>
        <a href={sources.schoolArchive} target="_blank" rel="noreferrer">
          [ SMA NEGERI 3 JOGJA ]
        </a>
      </div>
    </section>
  )
}

function Portfolio() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="portfolio reveal" id="achievements" ref={ref}>
      <h2>ACHIEVEMENTS<span>.</span></h2>
      <div className="project-collage">
        {achievements.map((item, index) => (
          <a
            href={item.href}
            className={`project p${index + 1}`}
            key={item.source}
            aria-label={item.label}
            target="_blank"
            rel="noreferrer"
          >
            <img src={item.image} alt={item.caption} />
            <span className="project-cap">{item.label} — {item.caption}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Advantage() {
  const ref = useReveal<HTMLElement>()
  const [posts, setPosts] = useState<MediumPost[] | null>(null)
  useEffect(() => {
    let active = true
    loadMediumPosts()
      .then(next => { if (active) setPosts(next) })
      .catch(() => { if (active) setPosts([]) })
    return () => { active = false }
  }, [])
  const wall = posts?.map(post => post.title) ?? []
  return (
    <section className="writing-section reveal" id="writing" ref={ref}>
      <div className="ink-wall" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index}>
            {(wall[index % Math.max(wall.length, 1)] ?? 'haura hana')}{' '}
            {(wall[(index + 3) % Math.max(wall.length, 1)] ?? 'medium')}
          </span>
        ))}
      </div>
      <h2>WRITING<span>.</span></h2>
      <div className="writing-grid">
        {posts === null ? <p className="writing-status">loading medium…</p> : null}
        {posts?.length === 0 ? <p className="writing-status">medium feed unavailable</p> : null}
        {posts?.map((article, index) => (
          <a
            className="writing-card"
            href={article.url}
            key={article.url}
            target="_blank"
            rel="noreferrer"
            style={{ transform: `rotate(${index % 2 === 0 ? -1.6 : 1.5}deg)` }}
          >
            <img src={article.image ?? aestheticPhoto(index)} alt="" />
            <span>
              <strong>{article.title}</strong>
              <em>{article.date}</em>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  const nav1 = [
    { label: 'EDUCATION 01', href: '#education' },
    { label: 'RESEARCH 02', href: '#research' },
  ]
  const nav2 = [
    { label: 'WRITING 03', href: '#writing' },
    { label: 'ACHIEVEMENTS 04', href: '#achievements' },
  ]
  return (
    <footer>
      <a className="back-top" href="#top">[ BACK TO TOP ]</a>
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>haura hana on Medium.</p>
          <div className="socials">
            <a href={sources.mediumProfile} target="_blank" rel="noreferrer">MEDIUM</a>
          </div>
        </div>
        <div className="footer-links">
          <ul>
            {nav1.map(item => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <ul>
            {nav2.map(item => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="copyright">© 2026 HAURA HANARISSA PUTRI</div>
    </footer>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  useMotionScenes()
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])
  return (
    <>
      <Marquee /><Header onMenu={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} close={() => setMenuOpen(false)} /><FloatingElements />
      <main><Hero /><Vision /><ResearchSection /><Services /><Portfolio /><Advantage /></main>
      <Footer />
    </>
  )
}