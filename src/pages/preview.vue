<template>
  <div class="preview">
    <div id="topology-canvas" class="full">
    <component :is="componentName"></component>

    </div>
    <div class="tools">
      <el-button type="primary" @click="onBack">返回</el-button>
      <el-button type="primary" @click="onfullScreen">全屏</el-button>
    </div>
  </div>
</template>

<script>
import { Topology } from "@topology/core";
import screenfull from "screenfull";
let canvas;
import { getPage } from "~/api/zutai";
import warn from "./warn";

export default {
  name: "Preview",
  data() {
    return {
      data: {},
      componentName: undefined
    };
  },
  components: {
    warn
  },
  created() {},
  mounted() {
    canvas = new Topology("topology-canvas", {});
    console.log("预览中的画布 :>> ", canvas);
      this.id = this.$route.query.id;

    this.init()
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onfullScreen() {
      screenfull.toggle();
    },
    init() {
      if (this.id) {
        getPage(this.id).then(res => {
          let data = JSON.parse(res.data.data);
          data.locked = 1;

          // 预警
          if (this.id == 3) {
            this.componentName = "warn";
          }

          canvas.open(data);
        });
      } else if (window.topologyData) {
        let data = window.topologyData;
        data.locked = 1;
        canvas.open(data);
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 可以访问组件实例 `this`
    console.log('路由更新了',to, from);
    this.id = to.query.id
    this.init()
  }
};
</script>
<style lang="scss" scoped>
.preview {
  position: relative;
  height: 100vh;
  .tools {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 99;
  }
  #topology-canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
