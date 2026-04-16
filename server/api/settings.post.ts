import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  await delayedResponse()
  try {
    const body = await readBody(event)
    const dbPath = path.resolve(process.cwd(), 'db.json')
    const data = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(data)
    
    db.settings = { ...db.settings, ...body }
    
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8')
    
    return { success: true, settings: db.settings }
  } catch (error) {
    console.error('API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update settings'
    })
  }
})
