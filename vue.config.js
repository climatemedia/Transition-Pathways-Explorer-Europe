// vue.config.js
module.exports = {
  devServer: {
    // hook to local development API
    proxy: 'http://127.0.0.1:9393'
  },
  // deactivate production-maps
  productionSourceMap: false,

  //very important, otherwise all async imports are inserted as links with rel="prefetch"
  chainWebpack: config => {
    // remove the prefetch plugin
    // flag async import for insertion as prefetch link with /* webpackPrefetch: true */
    config.plugins.delete('prefetch') //activated by vue cli by default
  }
};
