import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  await delayedResponse()
  try {
    const dbPath = path.resolve(process.cwd(), 'db.json')
    const data = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(data)
    return db.settings || {}
  } catch (error) {
    console.error('API Error:', error)
    return {}
  }
})
