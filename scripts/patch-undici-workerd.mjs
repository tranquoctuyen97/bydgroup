import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const undiciRoot = path.resolve(__dirname, '../node_modules/undici')
const indexPath = path.join(undiciRoot, 'index.js')
const runtimeFeaturesPath = path.join(undiciRoot, 'lib/util/runtime-features.js')

const indexSource = await readFile(indexPath, 'utf8')
const nextIndexSource = indexSource
  .replace(
    "\nconst SqliteCacheStore = require('./lib/cache/sqlite-cache-store')\nmodule.exports.cacheStores.SqliteCacheStore = SqliteCacheStore\n",
    '\n',
  )
  .replace(
    "\nconst { runtimeFeatures } = require('./lib/util/runtime-features')\nif (runtimeFeatures.has('sqlite')) {\n  module.exports.cacheStores.SqliteCacheStore = require('./lib/cache/' + 'sqlite-cache-store')\n}\n",
    '\n',
  )

if (nextIndexSource !== indexSource) {
  await writeFile(indexPath, nextIndexSource)
}

const runtimeFeaturesSource = await readFile(runtimeFeaturesPath, 'utf8')
const nextRuntimeFeaturesSource = runtimeFeaturesSource
  .replace(
    "'use strict'\n\nconst localRequire = require\n\n/** @typedef {`node:${string}`} NodeModuleName */\n",
    "'use strict'\n\n/** @typedef {`node:${string}`} NodeModuleName */\n",
  )
  .replace(
    "  'node:sqlite': () => require('node:sqlite'),\n",
    '',
  )
  .replace(
    "  'node:sqlite': () => localRequire('node:' + 'sqlite'),\n",
    '',
  )
  .replace(
    "const runtimeFeaturesAsNodeModule = /** @type {const} */ (['crypto', 'sqlite'])\n",
    "const runtimeFeaturesAsNodeModule = /** @type {const} */ (['crypto'])\n",
  )

if (nextRuntimeFeaturesSource !== runtimeFeaturesSource) {
  await writeFile(runtimeFeaturesPath, nextRuntimeFeaturesSource)
}
