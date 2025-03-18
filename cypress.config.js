const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://teste-qa-devio.vercel.app/",
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
