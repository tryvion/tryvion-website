import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

function customRender(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { ...options })
}

export * from '@testing-library/react'
export { customRender as render }

/**
 * Runs axe-core on a container and throws if any WCAG violations are found.
 * Scoped to WCAG 2.1 AA rules — the same baseline as TRYVION's design system.
 */
export async function expectNoA11yViolations(container: HTMLElement): Promise<void> {
  const axe = (await import('axe-core')).default
  const results = await axe.run(container, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
    },
  })
  if (results.violations.length === 0) return
  const report = results.violations
    .map(v =>
      `[${v.impact ?? 'unknown'}] ${v.id}: ${v.description}\n` +
      v.nodes.map(n => `    ${n.html}`).join('\n'),
    )
    .join('\n\n')
  throw new Error(`Accessibility violations:\n\n${report}`)
}
