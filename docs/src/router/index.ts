import Vue from 'vue'
import Router from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

Vue.use(Router)

const routes = setupLayouts(generatedRoutes)
routes.push({
  path: '*',
  component: () => import(`~/components/error-page.vue`)
})

const router = new Router({
  mode: 'hash',
  routes
})

export default router