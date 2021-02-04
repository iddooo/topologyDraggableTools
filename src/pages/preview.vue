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
// 预警
import warn from "./warn/index";

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
    this.id = this.$route.query.id;

    this.init();
  },
  watch: {
    $route(v) {
      this.id = v.query.id;
      this.init();
    }
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
          this.componentName = undefined

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
