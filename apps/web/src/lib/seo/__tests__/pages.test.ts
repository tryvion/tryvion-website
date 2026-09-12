import { describe, expect, it } from 'vitest'
import { pageMetadata } from '../pages'

describe('priority page metadata', () => {
  it('gives every priority page a canonical path', () => {
    for (const metadata of Object.values(pageMetadata)) {
      expect(metadata.alternates).toMatchObject({ canonical: expect.any(String) })
    }
  })

  it('uses titles without the site-name suffix', () => {
    for (const metadata of Object.values(pageMetadata)) {
      expect(metadata.title).not.toEqual(expect.stringMatching(/\|\s*TRYVION$/))
    }
  })
})
