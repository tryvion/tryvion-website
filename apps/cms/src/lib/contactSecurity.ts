const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5

type RateLimitEntry = {
  count: number
  resetAt: number
}

const requests = new Map<string, RateLimitEntry>()

export const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

export const isRateLimited = (ip: string): boolean => {
  const now = Date.now()
  const existing = requests.get(ip)

  if (!existing || now >= existing.resetAt) {
    requests.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })

    return false
  }

  existing.count += 1

  if (existing.count > MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  return false
}

export const isHoneypotTriggered = (value: unknown): boolean => {
  if (typeof value !== 'string') {
    return false
  }

  return value.trim().length > 0
}
