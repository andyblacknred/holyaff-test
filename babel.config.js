module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
module.rules = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/variables.scss";
        `
      }
    }
  }
}
