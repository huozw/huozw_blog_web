const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('app: ', app);
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://192.168.139.119:3000',
      secure: false,
      changeOrigin: false,
      pathRewrite: {
        '^/api': '/',
      },
    })
  );
};
