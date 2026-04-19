import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const patchFile = async (filePath, transform) => {
  const source = await readFile(filePath, 'utf8')
  const nextSource = transform(source)

  if (nextSource !== source) {
    await writeFile(filePath, nextSource)
  }
}

const payloadNextRestPath = path.resolve(
  __dirname,
  '../node_modules/@payloadcms/next/dist/routes/rest/index.js',
)

await patchFile(
  payloadNextRestPath,
  (source) =>
    source
      .replace("import { generateOGImage } from './og/index.js';\n", '')
      .replace('let initedOGEndpoint = false;\n', '')
      .replace(
        "  // Add this endpoint only when using Next.js, still can be overridden.\n  if (initedOGEndpoint === false && !awaitedConfig.endpoints.some(endpoint => endpoint.path === '/og' && endpoint.method === 'get')) {\n    awaitedConfig.endpoints.push({\n      handler: generateOGImage,\n      method: 'get',\n      path: '/og'\n    });\n  }\n  initedOGEndpoint = true;\n",
        '',
      ),
)

const payloadDrizzleSchemaGeneratorPath = path.resolve(
  __dirname,
  '../node_modules/@payloadcms/drizzle/dist/utilities/createSchemaGenerator.js',
)

await patchFile(
  payloadDrizzleSchemaGeneratorPath,
  (source) =>
    source.replace(
      "        if (prettify) {\n            try {\n                const prettier = await eval('import(\"prettier\")');\n                const configPath = await prettier.resolveConfigFile();\n                const config = configPath ? await prettier.resolveConfig(configPath) : {};\n                code = await prettier.format(code, {\n                    ...config,\n                    parser: 'typescript'\n                });\n            } catch  {\n            /* empty */ }\n        }\n",
      '',
    ),
)

const payloadDrizzleBlocksMigratorPath = path.resolve(
  __dirname,
  '../node_modules/@payloadcms/drizzle/dist/utilities/blocksToJsonMigrator.js',
)

await patchFile(
  payloadDrizzleBlocksMigratorPath,
  (source) =>
    source.replace(
      /        try \{\n            \/\/ eslint-disable-next-line @typescript-eslint\/consistent-type-imports\n            const prettier = await dynamicImport\('prettier'\);\n            const configPath = await prettier\.resolveConfigFile\(\);\n            const config = configPath \? await prettier\.resolveConfig\(configPath\) : \{\};\n            output = await prettier\.format\(output, \{\n                \.\.\.config,\n                parser: 'typescript'\n            \}\);\n        \} catch \(err\) \{\n            this\.adapter\.payload\.logger\.error\(\{\n                err,\n                msg: 'Could not format payload config with Prettier'\n            \}\);\n        \}\n/,
      '',
    ),
)

const payloadD1ConnectPath = path.resolve(
  __dirname,
  '../node_modules/@payloadcms/db-d1-sqlite/dist/connect.js',
)

await patchFile(
  payloadD1ConnectPath,
  (source) => {
    let nextSource = source
      .replace(
        "import { drizzle } from 'drizzle-orm/d1';\n",
        "import { drizzle } from 'drizzle-orm/d1';\nimport { getCloudflareContext } from '@opennextjs/cloudflare';\n",
      )
      .replace(
        "import { drizzle } from 'drizzle-orm/d1';\nimport { getCloudflareContext } from '@opennextjs/cloudflare';\nimport { getCloudflareContext } from '@opennextjs/cloudflare';\n",
        "import { drizzle } from 'drizzle-orm/d1';\nimport { getCloudflareContext } from '@opennextjs/cloudflare';\n",
      )

    nextSource = nextSource.replace(
      /        let binding = this\.binding;\n(?:        if \(typeof binding === 'string'\) \{\n(?:            .*?\n)+        \}\n)+        if \(readReplicas && readReplicas === 'first-primary'\) \{\n            \/\/ @ts-expect-error - need to have types that support withSession binding from D1\n            binding = .*?;\n        \}/s,
      "        let binding = this.binding;\n        if (typeof binding === 'string') {\n            try {\n                binding = getCloudflareContext().env[binding] ?? binding;\n            } catch {\n            /* empty */ }\n        }\n        if (readReplicas && readReplicas === 'first-primary' && typeof binding === 'object' && binding && 'withSession' in binding) {\n            // @ts-expect-error - D1 binding provides withSession in Workers runtime\n            binding = binding.withSession('first-primary');\n        }",
    )

    nextSource = nextSource.replace(
      "    // On Workers we may start from an empty D1 DB; keep schema bootstrap enabled.\n    if (process.env.PAYLOAD_MIGRATING !== 'true' && this.push !== false) {\n        await pushDevSchema(this);\n    }\n",
      "    // Only push schema if not in production\n    if (process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_MIGRATING !== 'true' && this.push !== false) {\n        await pushDevSchema(this);\n    }\n",
    )

    nextSource = nextSource.replace(
      /    \/\/ On Workers[\s\S]*?if \(process\.env\.PAYLOAD_MIGRATING !== 'true' && this\.push !== false\) \{\n        await pushDevSchema\(this\);\n    \}\n/,
      "    // Only push schema if not in production\n    if (process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_MIGRATING !== 'true' && this.push !== false) {\n        await pushDevSchema(this);\n    }\n",
    )

    return nextSource
  },
)
