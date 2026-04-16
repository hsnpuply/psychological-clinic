import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  await delayedResponse()
  try {
    const dbPath = path.resolve(process.cwd(), 'db.json')
    const data = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(data)
    
    const query = getQuery(event)
    if (query.id) {
      return db.therapists.find((t: any) => t.id === query.id)
    }
    
    return db.therapists || []
  } catch (error) {
    console.error('API Error:', error)
    return []
  }
})
