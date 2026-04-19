import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const shimPath = path.resolve(
  __dirname,
  '../node_modules/@opennextjs/cloudflare/dist/cli/templates/shims/env.js',
)

const shimSource = `export function loadEnvConfig() {
  return { loadedEnvFiles: [] }
}

const nextEnv = { loadEnvConfig }

export default nextEnv
`

await writeFile(shimPath, shimSource)
