import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJsonPath = path.resolve(__dirname, '../node_modules/jose/package.json')

const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))

const rewriteExportTarget = (entry) => {
  if (!entry || typeof entry !== 'object') {
    return
  }

  if (entry.workerd === './dist/browser/index.js') {
    entry.workerd = './dist/node/esm/index.js'
  }
}

rewriteExportTarget(packageJson.exports?.['.'])

for (const [key, value] of Object.entries(packageJson.exports ?? {})) {
  if (key === '.') {
    continue
  }

  rewriteExportTarget(value)
}

await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
