export const config = {
  runtime: 'edge',
}

export default async function handler(): Promise<Response> {
  const upstream = await fetch('https://medium.com/feed/@howrahana', {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/rss+xml, application/xml, text/xml',
    },
  })

  if (!upstream.ok) {
    return new Response('Medium feed unavailable', { status: upstream.status })
  }

  return new Response(await upstream.text(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}