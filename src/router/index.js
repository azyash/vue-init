import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err)
// }

router.beforeEach((to, from, next) => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  if (to.path == '/login') {
    if (userInfo) {
      next('/')
    } else {
      next()
    }
  } else {
    if (userInfo) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
