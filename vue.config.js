module.exports = {
  devServer: {
      // Paths
      //assetsSubDirectory: 'static',
      //assetsPublicPath: '/',
      proxy: {
          '/api': {
              // 此处的写法，目的是为了 将 /api 替换成 后端统一接口地址
              target: 'http://localhost:8899/shebao/v1',
              // 允许跨域
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  }
}