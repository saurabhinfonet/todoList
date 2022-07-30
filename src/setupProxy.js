const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/endpoint", {
      target: "https://demo.minder.care/interview/task",
      changeOrigin: true,
    })
  );
};
