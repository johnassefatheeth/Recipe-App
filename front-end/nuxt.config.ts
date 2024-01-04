// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo'],
  ssr:false,
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8080/v1/graphql'
      }
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
