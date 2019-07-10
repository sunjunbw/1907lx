import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Shop from './views/shop.vue'
import List from './components/List.vue'
import My from './views/my.vue'
import Film from './views/Index.vue'
import Cinema from './views/cinema.vue'
import City from "./components/city"
import Detail from "./components/detail"
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:{name:"home"}
    },
    {
       path:'/detail/:id',
       component:Detail
    },
    {
       path: '/city',
       name:"city",
        component:City
    },
    {
       path:'/home',
       name:'home',
       component:Home,
       redirect:{'name':'film'},
       children:[
          {
            path:'/home/film',
            name:'film',
            component:Film,
            redirect:{'name':'filmlist'},
            children:[
              {
                path:"/home/film/:type?",
                name:'filmlist',
                component:List
              }
            ]
          },
          {
            path:'/home/cinema',
            name:'cinema',
            component:Cinema
          },
          {
             path:'/home/shop',
            name:'shop',
            component:Shop
          },
          {
             path:'/home/my',
            name:'my',
            component:My
          }
       ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    }
  ]
})
