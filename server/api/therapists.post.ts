import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const body = await readBody(event)
  
  if (!body.name || !body.phone || !body.medicalCouncilNumber) {
    throw createError({
      statusCode: 400,
      message: 'لطفا اطلاعات ضروری را تکمیل کنید'
    })
  }

  await delayedResponse(1000)
  
  try {
    const dbPath = path.resolve(process.cwd(), 'db.json')
    const data = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(data)
    
    // Generate a new ID if it doesn't exist
    const newId = body.id || `T-${Math.floor(Math.random() * 10000)}`
    
    const newTherapist = {
      ...body,
      id: newId,
      status: body.status || 'فعال'
    }
    
    if (!db.therapists) {
      db.therapists = []
    }
    
    db.therapists.push(newTherapist)
    
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8')
    
    return { success: true, therapist: newTherapist }
  } catch (error) {
    console.error('API Error:', error)
    throw createError({
      statusCode: 500,
      message: 'خطا در ثبت اطلاعات'
    })
  }
})
