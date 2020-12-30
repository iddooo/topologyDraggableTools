import Vue from "vue";
import Router from "vue-router";
import Layout from "~/layout";
import zesion from "~/pages/zesion.vue";

Vue.use(Router);

export const zesionRouter = [
  {
    path: "/",
    name: "tools",
    redirect: "/zesion",
    component: Layout,
    meta: { title: "我的工具", icon: "" },
    children:[
        {
            path: "zesion",
            name: "zesion",
            component: zesion,
            meta: { title: "我的页面", icon: "" }
          },
          {
            path: "edit",
            name: "Edit",
            component: () => import("~/pages/topologyEdit.vue"),
            meta: { title: "编辑", icon: "" }
          },
          {
            path: "preview",
            name: "Preview",
            hidden: true,
            component: () => import("~/pages/preview.vue"),
            meta: { title: "预览", icon: "" }
          }
    ]
  }
];

const createRouter = () => 
  new Router({
    mode: "hash",
    routes: zesionRouter
  });

const router = createRouter();

export default router;
