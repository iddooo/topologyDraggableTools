<template>
  <div class="preview">
    <div id="topology-canvas" class="full"></div>
    <div class="tools">
      <el-button type="primary" @click="onBack">返回</el-button>
    </div>
  </div>
</template>

<script>
  import { Topology } from "@topology/core";
  import json from "~/json/test.json";
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
      let url = window.topologySocketUrl
      data.locked = 1;
      canvas = new Topology('topology-canvas', {});
      canvas.open(data);
    //   canvas.openSocket(url)
      console.log("预览中的画布 :>> ", canvas);
    },
  methods: {
    onBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.preview {
  position: relative;
  height: 100vh;
  #topology-canvas{
    width: 100%;
    height: 100%;
  }
}
</style>
