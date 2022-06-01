const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  pwa: {
    iconPaths: {
      favicon32: 'favicon-32x32.png',
      favicon16: 'favicon-16x16.png',
      appleTouchIcon: 'apple-touch-icon.png',
      maskIcon: null,
      msTileImage: 'mstile-150x150.png',
      faviconSVG: 'favicon.svg'
    }
  }
})
