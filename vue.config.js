module.exports = {
    devServer: {
        port: 9030,
        proxy: {
            '^/api': {
                target: 'http://localhost:5091',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}