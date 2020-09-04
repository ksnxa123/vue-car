import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index/index.vue";

Vue.use(VueRouter);

//跳转报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children:[
      {
        path: "/user",
        name: "User",
        component: ()=>import('../views/users/index')
      },
      // 安全设置 - 首页
      {
        path: "/safe",
        name: "Safe",
        component: () => import("../views/safe/index")
      },
      {
        path: "/password",
        name: "Password",
        component: () => import("../views/safe/password")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
