import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                    path: '/',
                    component: resolve => require(['../components/page/Main.vue'], resolve)
                },
                // {
                //     path: '/sys-user',
                //     component: resolve => require(['../components/page/sys/user/UserMng.vue'], resolve)
                // },
                // {
                //     path: '/sys-aut',
                //     component: resolve => require(['../components/page/sys/aut/AutMng.vue'], resolve)
                // },
                // {
                //     path: '/sys-menu',
                //     component: resolve => require(['../components/page/sys/menu/MenuMng.vue'], resolve)
                // },
                // {
                //     path: '/sys-role',
                //     component: resolve => require(['../components/page/sys/role/RoleMng.vue'], resolve)
                // },
                // {
                //     path: '/sys-param',
                //     component: resolve => require(['../components/page/sys/param/ParamMng.vue'], resolve)
                // },
                {
                    path: '/sys-counter',
                    component: resolve => require(['../components/page/sys/counter/CounterMng.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})
