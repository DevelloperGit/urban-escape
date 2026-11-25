import fs from 'node:fs'

const docPath =
  process.argv[2] ??
  'C:/Users/User/.cursor/projects/c-Users-User-Desktop-Web-site-project-one/agent-tools/330d6094-1820-4f07-92d8-9aaa52c489b1.txt'

const raw = fs.readFileSync(docPath, 'utf8')
const chunks = raw.split('"type":"TEXT"')

const styles = new Map()

for (const chunk of chunks.slice(1)) {
  const name = chunk.match(/"name":"([^"]*)"/)?.[1]
  const size = chunk.match(/"fontSize":(\d+(?:\.\d+)?)/)?.[1]
  const family = chunk.match(/"fontFamily":"([^"]+)"/)?.[1]
  const style = chunk.match(/"fontStyle":"([^"]+)"/)?.[1]
  const weight = chunk.match(/"fontWeight":(\d+)/)?.[1]
  if (!size || !family) continue

  const lh = chunk.match(/"lineHeight":(\{[^}]+\}|"[^"]+"|[0-9]+)/)?.[1] ?? 'null'
  const ls = chunk.match(/"letterSpacing":(\{[^}]+\}|"[^"]+"|[0-9]+)/)?.[1] ?? 'null'

  const key = `${family}|${style}|${weight}|${size}|${lh}|${ls}`
  if (!styles.has(key)) {
    styles.set(key, {
      name,
      family,
      style,
      weight: Number(weight),
      size: Number(size),
      lineHeight: lh,
      letterSpacing: ls,
    })
  }
}

const sorted = [...styles.values()].sort((a, b) => a.size - b.size)
console.log(JSON.stringify(sorted, null, 2))
console.error(`Found ${sorted.length} unique text styles`)