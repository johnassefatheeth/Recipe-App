// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt",'@nuxtjs/apollo'],
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  imports: {
    dirs: ["./stores"],
  },
  ssr:false,
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8080/v1/graphql'
      }
    },
  },
  plugins: [
    { src: '~/plugins/hasuraActions.js', mode: 'server' },
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
