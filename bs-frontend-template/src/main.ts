// 导入 Vue 创建应用函数
import { createApp } from 'vue'
// 导入根组件
import App from '/@/App.vue'
// 导入 ElementPlus UI 库
import ElementPlus from 'element-plus'
// 导入自定义指令集
import direct from '/@/directive/index'
// 导入全局混入
import mixin from '/@/mixin/index'
// 导入路由配置
import router from '/@/router/index'
// 导入 Pinia 状态管理库
import { pinia } from '/@/store'
// 导入权限控制模块
import '/@/permission'

// 导入 ElementPlus 默认样式
import 'element-plus/dist/index.css'
// 导入 ElementPlus 额外主题样式
import 'element-plus/theme-chalk/display.css'
// 导入 NProgress 的 CSS（进度条）
import 'nprogress/nprogress.css'
// 导入项目的自定义 CSS 样式
import '/@/assets/css/index.css'
// 注册 SVG 图标（通过虚拟模块）
import 'virtual:svg-icons-register'
// 导入自定义 SVG 图标组件
import SvgIcon from '/@/components/SvnIcon/index.vue'
// 导入自定义评分文字组件
import RateText from '/@/components/RateText/index.vue'
// 导入 Echarts 组件封装
import VueEcharts from '/@/components/VueEcharts/index.vue'

// 创建 Vue 应用实例
const app = createApp(App)
// 应用自定义指令
direct(app)
// 使用 ElementPlus UI 组件库
app.use(ElementPlus)
// 应用 Vue 路由
app.use(router)
// 应用 Pinia 状态管理
app.use(pinia)
// 全局注册 SVG 图标组件
app.component('SvgIcon', SvgIcon)
// 全局注册 Echarts 组件
app.component('VueEcharts', VueEcharts)
// 全局注册评分文字组件
app.component('RateText', RateText)
// 应用全局混入
app.mixin(mixin)
// 挂载 Vue 应用到 DOM
app.mount('#app')

const win:any = window

if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {

    win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app

}
