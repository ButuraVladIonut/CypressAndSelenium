const { defineConfig } = require("cypress");
const pg = require("pg");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    baseUrl: 'http://localhost:3000/admin',
    //excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        //create task - take 2 params, first being config, second is sql
        READFROMDB({dbConfig, sql}) {
          //create a client using the config argument object
          const client = new pg.Pool(dbConfig);
          //return from the results from the sql
          return client.query(sql);
        },
      }
      )
    },
  },
  DB: {
    user: 'postgres',
    host: 'localhost',
    database: 'evershop',
    password: 'Vladd123$',
    port: '5432'
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
});
