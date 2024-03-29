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
  http:{
    baseUrl:'http://localhost:8088',
    proxyHeaders: true,
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8080/v1/graphql', 
         httpLinkOptions: {
              headers: {
                'x-hasura-admin-secret': 'myadminsecretkey',
          },
      },
      },
      
    },
    
  },
  plugins: [
    { src: '~/plugins/hasuraActions.js', mode: 'server' },
    '~/plugins/api.js',
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
 