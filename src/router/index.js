import Vue from 'vue';
import Router from 'vue-router';
import ErrPage from '../components/page/error/NotFind';

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        children: [{
            path: '/',
            component: resolve => require(['../components/page/Main.vue'], resolve)
        }
        ]
    },
    {
        path: '/login',
        component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {//404
        path: '/404',
        component: ErrPage
    },
    { //重定向到404
        path: '*', redirect: '/404'
    }
]
Vue.use(Router);

export default new Router({
    routes: constantRouterMap
})
