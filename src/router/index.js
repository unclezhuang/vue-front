import {createRouter, createWebHistory} from 'vue-router';


// 异步加载路由组件
const Login = () => import('../views/Login.vue');
const Index = () => import('../views/Index.vue');


// import {useStore} from 'vuex'
// const store = useStore()
// 这样才能获取到数据
import store from '@/store'

// 定义一个路由守卫函数，用于验证用户是否已登录
const requireAuth = (to, from, next) => {
    // const isAuthenticated = localStorage.getItem('isAuthenticated');
    const isAuthenticated = store.getters.isAuthenticated;
    if (isAuthenticated) {
        next(); // 已登录，允许访问
    } else {
        next('/login'); // 未登录，跳转到登录页面
    }
}

// 定义路由表
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            requireAuth: true, // 需要权限验证
            title: '主页', // 页面标题
            index: '/'  // 将路径添加到index字段中
        },
        beforeEnter: requireAuth, // 路由独享的守卫函数
        children: [{
            path: '/home',
            name: 'home',
            component: () => import('../views/test/TestHome'),
            meta: {
                requireAuth: true,
                index: '/home'
            }
        }, {
            path: '/spiderTask',
            name: 'spiderTask',
            component: () => import('../views/spider/SpiderManager'),
            meta: {
                requireAuth: true,
                index: '/spiderTask'
            }
        }, {
            path: '/spiderDetail',
            name: 'spiderDetail',
            component: () => import('../views/spider/spiderDetail'),
            meta: {
                requireAuth: true,
                index: '/spiderDetail'
            }
        },{
            path: '/analysisTask',
            name: 'analysisTask',
            component: () => import('../views/analysis/analysisTask'),
            meta: {
                requireAuth: true,
                index: '/analysisTask'
            }
        },{
            path: '/analysisReport',
            name: 'analysisReport',
            component: () => import('../views/analysis/EchartsTest'),
            meta: {
                requireAuth: true,
                index: '/analysisReport'
            }
        },{
            path: '/robotDetection',
            name: 'robotDetection',
            component: () => import('../views/analysis/robotDetection'),
            meta: {
                requireAuth: true,
                index: '/robotDetection'
            }
        },{
            path: '/postManage',
            name: 'postManage',
            component: () => import('../views/content/postManage'),
            meta: {
                requireAuth: true,
                index: '/postManage'
            }
        },{
            path: '/articleManage',
            name: 'articleManage',
            component: () => import('../views/content/articleManage'),
            meta: {
                requireAuth: true,
                index: '/articleManage'
            }
        },{
            path: '/accountManage',
            name: 'accountManage',
            component: () => import('../views/content/accountManage'),
            meta: {
                requireAuth: true,
                index: '/accountManage'
            }
        },{
            path: '/relationManage',
            name: 'relationManage',
            component: () => import('../views/content/relationManage'),
            meta: {
                requireAuth: true,
                index: '/relationManage'
            }
        },{
            path: '/personal',
            name: 'personal',
            component: () => import('../views/system/PersonalCenter'),
            meta: {
                requireAuth: true,
                index: '/personal'
            }
        },{
            path: '/log',
            name: 'log',
            component: () => import('../views/system/LogManage'),
            meta: {
                requireAuth: true,
                index: '/log'
            }
        },
        ]
    }
];


// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
