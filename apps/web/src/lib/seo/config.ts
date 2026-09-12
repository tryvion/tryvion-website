const PRODUCTION_SITE_URL = 'https://thetryvion.com'

function getConfiguredSiteUrl(): string | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!configuredUrl) return undefined

  try {
    const url = new URL(configuredUrl)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined

    return url.origin
  } catch {
    return undefined
  }
}

export function getSiteUrl(): URL {
  return new URL(getConfiguredSiteUrl() ?? PRODUCTION_SITE_URL)
}

export function getSiteOrigin(): string {
  return getSiteUrl().origin
}
