import {createApp} from 'vue'
import App from '@/App.vue'

require('@/assets/js/dark')

import store from '@/store'
import router from '@/router'

//导入自定义css
import '@/assets/css/common.scss'
//elementplus暗黑主题从（element-plus/theme-chalk/dark/css-vars.css）拷贝
import '@/assets/css/elementplus-theme-dark-css-vars.css'

//多标签bus通信
import mitt from 'mitt'

//引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 统一导入el-icon图标
import * as Icons from '@element-plus/icons-vue'
//引入ElementPlus 结束

// import echarts from 'echarts'
const app = createApp(App)
// vue3.x的全局实例，要挂载在config.globalProperties上
app.config.globalProperties.$Bus = new mitt()

app.use(ElementPlus, {
    size: 'default',  // 默认控件尺寸default
    zIndex: 3000,  // 弹出组件的zIndex
    locale: zhCn,
})
// app.config.globalProperties.$echarts = echarts
//引入font-awesome字体图标
import 'font-awesome/scss/font-awesome.scss'
// 注册全局elementplus icon组件
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key]);
});

app.use(store)
app.use(router)
app.mount('#app')
