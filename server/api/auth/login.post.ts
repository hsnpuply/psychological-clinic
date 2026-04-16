import { z } from 'zod'

export default defineEventHandler(async (event) => {
  await delayedResponse()
  
  const body = await readBody(event)
  const { phone } = body

  const users = {
    '09104646471': { role: 'admin', name: 'مدیر کلینیک' },
    '09928717698': { role: 'secretary', name: 'منشی کلینیک' }
  }

  const user = users[phone as keyof typeof users]

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'شماره تماس وارد شده معتبر نیست'
    })
  }

  await setUserSession(event, {
    user: {
      phone,
      role: user.role as 'admin' | 'secretary',
      name: user.name
    }
  })

  return { success: true }
})
