// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import "./assets/css/base.css"; //引入基础样式表
import Element from "element-ui";
import "element-ui/packages/theme-chalk/lib/index.css";
import "./assets/css/reset.css"; //引入重置样式表
Vue.use(Element);

import vcolorpicker from "vcolorpicker";
Vue.use(vcolorpicker);

Vue.config.productionTip = false;

/* eslint-disable no-new */
var vm = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

//自定义事件
import { fns } from "./components/NodeProps/e";
import { controlDevice } from "~/api/zutai";

Object.keys(fns).forEach(fn => {
  window[fn] = fns[fn];
});
window.control = (pen, params) => {
  console.log("控制", JSON.parse(params));
  controlDevice(JSON.parse(params)).then(res => {
    // 执行控制操作
    console.log(res);
  });
};
window.link = (pen, params) => {
  console.log("链接", JSON.parse(params));
  console.log(vm);
  vm.$router.push({
    path: "/preview",
    query: {
      id: params
    }
  });
};

