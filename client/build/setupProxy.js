const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://the-waves.herokuapp.com/",
            changeOrigin: true,
            secure: false,
        })
    );
};
