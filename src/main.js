import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import uuid from 'uuid/v1'
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
// 请求拦截
axios.interceptors.request.use(
    function (config) {
        // 组装报文：加签
        let url = config.url
        let client = 'web'
        let reqId = uuid()
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')
        let loginName = localStorage.getItem('loginName')
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        let signature = ''
        if (token) {
            signature = sha256(url + time + reqId + token)
        }
        config.headers = {
            'client': client,
            'req_id': reqId,
            'req_time': time,
            'x-token': token,
            'user_id': userId,
            'login_name': loginName,
            'signature': signature
        }
        return config
    },
    function (error) {
        console.log(error)
        return Promise.reject(error);
    })
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
            } else if (error.response.status == 401) {
                msg = '登录信息验证失败，请重新登录！[' + error + "]"
                router.push('/')
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
Vue.prototype.uuid = uuid
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
