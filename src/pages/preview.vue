<template>
  <div class="preview">
    <div id="topology-canvas" class="full"></div>
    <div class="tools">
      <el-button type="primary" @click="onBack">返回</el-button>
      <el-button type="primary" @click="onfullScreen">全屏</el-button>
    </div>
  </div>
</template>

<script>
import { Topology } from "@topology/core";
import screenfull from 'screenfull'
let canvas;

export default {
  name: "Preview",
  data() {
    return {
      data: { },
    };
  },
  created() {
    
  },
  mounted() {
      let data = window.topologyData
    //   data.locked = 1;
      canvas = new Topology('topology-canvas', {});
      canvas.open(data);
      console.log("预览中的画布 :>> ", canvas);
    },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onfullScreen(){
      screenfull.toggle()
    }
  }
};
</script>
<style lang="scss" scoped>
.preview {
  position: relative;
  height: 100vh;
  .tools{
      position: absolute;
      left: 20px;
      top: 20px;
  }
  #topology-canvas{
    width: 100%;
    height: 100%;
  }
}
</style>
