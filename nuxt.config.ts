// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  srcDir: 'app',
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    'nuxt-auth-utils',
  ],
  runtimeConfig: {
    session: {
      password: process.env.NUXT_SESSION_PASSWORD || 'a-very-long-secret-password-for-our-app-which-is-32-chars-long',
      cookie: {
        sameSite: 'none',
        secure: true
      }
    }
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
    'ag-grid-community/styles/ag-grid.css',
    'ag-grid-community/styles/ag-theme-alpine.css',
    '~/assets/css/main.css'
  ],
  colorMode: {
    preference: 'light'
  },
  future: {
    compatibilityVersion: 4,
  },
  typescript: {
    strict: true
  }
})
