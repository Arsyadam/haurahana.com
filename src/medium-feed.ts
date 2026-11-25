const aestheticFallbacks = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80',
] as const

export function aestheticPhoto(index: number): string {
  return aestheticFallbacks[index % aestheticFallbacks.length] ?? aestheticFallbacks[0]
}

export type MediumPost = {
  title: string
  url: string
  date: string
  image: string | null
}

const CONTENT_NS = 'http://purl.org/rss/1.0/modules/content/'

function firstImage(html: string): string | null {
  const matches = [...html.matchAll(/https:\/\/(?:miro|cdn-images-1)\.medium\.com\/[^"'<\s]+/g)].map(match => match[0])
  return matches.find(url => !url.includes('/fit/c/150/')) ?? null
}

function formatDate(raw: string): string {
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return raw
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function parseMediumFeed(xml: string): MediumPost[] {
  const doc = new DOMParser().parseFromString(xml, 'text/xml')
  return [...doc.querySelectorAll('item')].flatMap(item => {
    const title = item.querySelector('title')?.textContent?.trim() ?? ''
    const url = item.querySelector('link')?.textContent?.trim() ?? ''
    const published = item.querySelector('pubDate')?.textContent?.trim() ?? ''
    const encoded = item.getElementsByTagNameNS(CONTENT_NS, 'encoded')[0]?.textContent ?? ''
    const description = item.querySelector('description')?.textContent ?? ''
    if (!title || !url) return []
    return [{
      title,
      url: url.split('?')[0] ?? url,
      date: formatDate(published),
      image: firstImage(encoded) ?? firstImage(description),
    }]
  })
}

export async function loadMediumPosts(): Promise<MediumPost[]> {
  const response = await fetch('/medium-feed')
  if (!response.ok) throw new Error('Medium feed failed')
  return parseMediumFeed(await response.text())
}
