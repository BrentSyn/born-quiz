import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Quiz from '../views/Quiz.vue'
import Results from '../views/Results.vue'
import ScoreBoard from '../views/ScoreBoard.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/scoreboard',
    name: 'ScoreBoard',
    component: ScoreBoard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
