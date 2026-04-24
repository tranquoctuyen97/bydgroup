const getNodeText = (node: unknown): string => {
  if (!node || typeof node !== 'object') return ''

  const record = node as Record<string, unknown>

  if (typeof record.text === 'string') {
    return record.text
  }

  if (!Array.isArray(record.children)) {
    return ''
  }

  return record.children.map(getNodeText).filter(Boolean).join('\n')
}

export const richTextToPlainText = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''

  const record = value as Record<string, unknown>
  const root = record.root && typeof record.root === 'object' ? record.root : record
  const text = getNodeText(root)

  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
}
