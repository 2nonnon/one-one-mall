module.exports = {
    devServer: {
        port: 9030,
        proxy: {
            '^/api': {
                target: 'http://localhost:9090',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}