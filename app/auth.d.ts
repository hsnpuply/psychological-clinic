declare module '#auth-utils' {
  interface User {
    phone: string
    role: 'admin' | 'secretary'
    name: string
  }
}

export {}
