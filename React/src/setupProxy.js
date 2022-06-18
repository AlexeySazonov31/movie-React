
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      /\/selectionData\/.+/,
      createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
      })
  );
  app.use(
    /\/search\/.+/,
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
);
app.use(
    /\/getMoreInfo\/.+/,
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
);
};