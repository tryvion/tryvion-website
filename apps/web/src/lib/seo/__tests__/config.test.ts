import { describe, expect, it } from 'vitest'
import { getSiteOrigin, getSiteUrl } from '../config'

describe('site SEO configuration', () => {
  it('uses the configured site origin when valid', () => {
    expect(getSiteOrigin()).toBe('https://thetryvion.com')
  })

  it('returns a URL suitable for metadataBase', () => {
    expect(getSiteUrl()).toBeInstanceOf(URL)
  })
})
