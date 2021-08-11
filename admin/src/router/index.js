import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import ResourceCrud from "../views/ResourceCrud.vue";
import Login from '../views/Login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      { name: "home", path: "/", component: Home },
      {
        name: ":resource",
        path: "/:resource/list",
        component: ResourceCrud,
        props: true,
      },
    ],

  },
  {
    path:'/login',
    component:Login,
    meta:{isPublic:true}
  }
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
    next()
  })


export default router;
