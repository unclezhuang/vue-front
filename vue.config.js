const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        // proxy: {
        //     '/api': {
        //         target: 'http://192.168.3.8:8000/api', //接口域名
        //         changeOrigin: true,             //是否跨域
        //         ws: true,                       //是否代理 websockets
        //         secure: true,                   //是否https接口
        //         pathRewrite: {                  //路径重置
        //             '^/api': ''
        //         }
        //     }
        // }
    }
})
