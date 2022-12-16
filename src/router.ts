import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {useLocalStorage} from "@vueuse/core";

const Home = () => import('@/pages/home/Home.vue')
const User = () => import('@/pages/user/User.vue')
const Statistics = () => import('@/pages/statistics/Statistics.vue')
const Login = () => import('@/pages/login/Login.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/statistics',
        name: 'data',
        component: Statistics
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            const tokenRef = useLocalStorage('token', '')
            // 用户登录过就不要再访问登录页了
            if (tokenRef.value) {
                next({ name: 'home' })
            } else {
                next()
            }
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const tokenRef = useLocalStorage('token', '')
    if (tokenRef.value || to.name === 'login') {
        // 如果已经登录过，或者要去登录页，就通过
        next()
    } else {
        // 否则跳到登录页
        next({ name: 'login' })
    }
})

export default router
