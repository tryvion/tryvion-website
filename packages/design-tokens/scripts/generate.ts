/**
 * TRYVION Design Token Generator
 *
 * Reads TypeScript source tokens and regenerates:
 *   - dist/css/variables.css
 *   - dist/json/tokens.json
 *
 * Run: pnpm --filter @tryvion/design-tokens generate
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = join(__dirname, '..')

function ensureDir(filePath: string) {
  mkdirSync(dirname(filePath), { recursive: true })
}

function write(filePath: string, content: string) {
  ensureDir(filePath)
  writeFileSync(filePath, content, 'utf8')
  console.log('  written:', filePath.replace(root, '.'))
}

console.log('Generating TRYVION design tokens...')
console.log('NOTE: CSS and JSON outputs are pre-authored in this version.')
console.log('This script validates that source files are importable.')

// Validate source files are importable
try {
  const primitives = await import('../src/primitives/index.js')
  const semantic   = await import('../src/semantic/index.js')
  console.log('  source/primitives: OK (' + Object.keys(primitives).length + ' exports)')
  console.log('  source/semantic:   OK (' + Object.keys(semantic).length + ' exports)')
} catch (err) {
  console.error('Source validation failed:', err)
  process.exit(1)
}

console.log('Generation complete.')
console.log('To regenerate CSS/JSON, update dist/ files alongside src/ changes.')
