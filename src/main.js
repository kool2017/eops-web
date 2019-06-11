import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'    // 默认主题
// import '../static/css/theme-green/index.css'       // 浅绿色主题
import 'babel-polyfill'
import './assets/icon/iconfont.css'
import sha256 from 'sha256'
import moment from 'moment'

Vue.use(ElementUI)
//全局系统名称
localStorage.setItem('appName', '后台管理系统')
//通信配置
axios.defaults.baseURL = '/eops'
// axios.defaults.baseURL = '/mock'
axios.defaults.withCredentials = true
//请求拦截
// axios.interceptors.request.use(
//     function (config) {
//         // 组装报文：加签
//         let token = localStorage.getItem('token')
//         let url = config.url.substring(config.baseURL.length, config.url.length)
//         let userCid = localStorage.getItem('userCid')
//         let time = moment().format('YYYY-MM-DD HH:mm:ss')
//         let channelId = '0'
//         let sign = ''
//         if (token != null && token != '') {
//             sign = sha256(reqId  + userCid  + time  + channelId  + token)
//         }
//         config.params = {
//             reqId: reqId,
//             userCid: userCid,
//             time: time,
//             channelId: channelId,
//             sign: sign
//         }
//
//         return config
//     },
//     function (error) {
//         console.log(error)
//         return Promise.reject(error);
//     })
//响应拦截
axios.interceptors.response.use(
    function (response) {
        var pkgOut = response.data
        var code = pkgOut.code
        var errorMsg = pkgOut.msg
        if (code != 0) {
            console.log(errorMsg)
            return Promise.reject(errorMsg)
        }
        return response
    },
    function (error) {
        console.log(error)
        let msg = ''
        if (error.response) {
            if (error.response.status == 404) {
                msg = '无效的请求，请联系管理员！[' + error + ']'
            } else {
                msg = '系统错误，请联系管理员！[' + error + ']'
            }
        } else {
            msg = '通信失败！[' + error + ']'
        }
        return Promise.reject(msg) // 返回接口返回的错误信息
    }
)

Vue.prototype.$http = axios
Vue.prototype.$moment = moment
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
