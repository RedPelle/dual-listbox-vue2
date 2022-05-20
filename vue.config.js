const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {            //     Using `npm run publish`:
    extract: false  // <-- with this option css is embedded in one .js file
  }                 //     without this option 2 files are created: .js and .css
})
