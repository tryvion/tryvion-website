import { describe, it, expect } from 'vitest'
import { cn } from '@tryvion/utils'

describe('cn()', () => {
  it('joins two class names with a space', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filters out false', () => {
    expect(cn('a', false, 'b')).toBe('a b')
  })

  it('filters out null', () => {
    expect(cn('a', null, 'b')).toBe('a b')
  })

  it('filters out undefined', () => {
    expect(cn('a', undefined, 'b')).toBe('a b')
  })

  it('filters out 0', () => {
    expect(cn('a', 0, 'b')).toBe('a b')
  })

  it('returns empty string with no arguments', () => {
    expect(cn()).toBe('')
  })

  it('returns empty string when all values are falsy', () => {
    expect(cn(false, null, undefined)).toBe('')
  })

  it('handles a single class', () => {
    expect(cn('only')).toBe('only')
  })

  it('works with conditional classes', () => {
    const active = true
    expect(cn('base', active && 'active')).toBe('base active')
    expect(cn('base', !active && 'inactive')).toBe('base')
  })

  it('preserves existing spaces within a class string', () => {
    expect(cn('flex items-center', 'gap-4')).toBe('flex items-center gap-4')
  })
})
