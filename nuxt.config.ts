// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  css: ["vuetify/styles"],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
});
