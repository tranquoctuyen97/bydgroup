import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const [, , inputPath, outputPath] = process.argv

if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/export-migration-sql.mjs <input.ts> <output.sql>')
  process.exit(1)
}

const source = await readFile(path.resolve(inputPath), 'utf8')

const upSectionMatch = source.match(
  /export async function up[\s\S]*?\{([\s\S]*?)\n\}\n\nexport async function down/,
)

if (!upSectionMatch) {
  console.error(`Could not find migration up() section in ${inputPath}`)
  process.exit(1)
}

const upSection = upSectionMatch[1]
const sqlBlocks = [
  ...upSection.matchAll(/await db\.(?:run|execute)\(sql`((?:\\`|[^`])*)`\);?/g),
].map((match) => match[1].replaceAll('\\`', '`').trim())

if (!sqlBlocks.length) {
  console.error(`No SQL blocks found in ${inputPath}`)
  process.exit(1)
}

const sqlContent = `${sqlBlocks.join('\n\n')}\n`
await writeFile(path.resolve(outputPath), sqlContent, 'utf8')

console.log(`Exported ${sqlBlocks.length} statements to ${outputPath}`)
