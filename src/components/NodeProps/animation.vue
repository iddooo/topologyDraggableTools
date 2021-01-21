<template>
  <div class="">
      <el-form ref="form" size="mini">
          <el-form-item label="自动播放">
              <el-checkbox v-model="$attrs.node.animatePlay"></el-checkbox>
          </el-form-item>
          <el-form-item label="动画间隔">
              <el-input size="mini" v-model="$attrs.node.animateDuration"></el-input>
          </el-form-item>
          <el-form-item label="动画方式">
                <el-select v-model="$attrs.node.animateType" @change="onChangeAnimate">
                    <el-option
                        v-for="item in animateTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { Node } from '@topology/core'
export default {
  name: "",
  components: {},
  data() {
    return {
      animateTypes: [
          { label: "upDown", value: "upDown" },
          { label: "leftRight", value: "leftRight" },
          { label: "heart", value: "heart" },
          { label: "success", value: "success" },
          { label: "warning", value: "warning" },
          { label: "error", value: "error" },
          { label: "show", value: "show" }
          ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    getTime(){
        var date = new Date()
        var hour = date.getHours()
        var min = date.getMinutes()
        min = min < 10 ? '0' + min : min
        var sec = date.getSeconds()
        sec = sec < 10 ? '0' + sec : sec
        return hour + ':' + min + ':' + sec
    },
    onChangeAnimate() {
      if (this.$attrs.node.animateType === "custom") {
        return;
      }
      this.$attrs.node.animateStart = Date.now();

      this.$attrs.node.animateFrames = [];
      const state = Node.cloneState(this.$attrs.node);
      switch (this.$attrs.node.animateType) {
        case "upDown":
          state.rect.y -= 10;
          state.rect.ey -= 10;
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state
          });
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(this.$attrs.node)
          });
          this.$attrs.node.animateFrames.push({
            duration: 200,
            linear: true,
            state: Node.cloneState(state)
          });
          break;
        case "leftRight":
          state.rect.x -= 10;
          state.rect.ex -= 10;
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state)
          });
          state.rect.x += 20;
          state.rect.ex += 20;
          this.$attrs.node.animateFrames.push({
            duration: 80,
            linear: true,
            state: Node.cloneState(state)
          });
          state.rect.x -= 20;
          state.rect.ex -= 20;
          this.$attrs.node.animateFrames.push({
            duration: 50,
            linear: true,
            state: Node.cloneState(state)
          });
          state.rect.x += 20;
          state.rect.ex += 20;
          this.$attrs.node.animateFrames.push({
            duration: 30,
            linear: true,
            state: Node.cloneState(state)
          });
          this.$attrs.node.animateFrames.push({
            duration: 300,
            linear: true,
            state: Node.cloneState(this.$attrs.node)
          });
          break;
        case "heart":
          state.rect.x -= 5;
          state.rect.ex += 5;
          state.rect.y -= 5;
          state.rect.ey += 5;
          state.rect.width += 5;
          state.rect.height += 10;
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state
          });
          this.$attrs.node.animateFrames.push({
            duration: 400,
            linear: true,
            state: Node.cloneState(this.$attrs.node)
          });
          break;
        case "success":
          state.strokeStyle = "#237804";
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state
          });
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(this.$attrs.node)
          });
          state.strokeStyle = "#237804";
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state
          });
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(this.$attrs.node)
          });
          state.strokeStyle = "#237804";
          state.fillStyle = "#389e0d22";
          this.$attrs.node.animateFrames.push({
            duration: 3000,
            linear: true,
            state
          });
          break;
        case "warning":
          state.strokeStyle = "#fa8c16";
          state.dash = 2;
          this.$attrs.node.animateFrames.push({
            duration: 300,
            linear: true,
            state
          });
          state.strokeStyle = "#fa8c16";
          state.dash = 0;
          this.$attrs.node.animateFrames.push({
            duration: 500,
            linear: true,
            state: Node.cloneState(state)
          });
          state.strokeStyle = "#fa8c16";
          state.dash = 2;
          this.$attrs.node.animateFrames.push({
            duration: 300,
            linear: true,
            state: Node.cloneState(state)
          });
          break;
        case "error":
          state.strokeStyle = "#cf1322";
          state.fillStyle = "#cf132222";
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state
          });
          break;
        case "show":
          state.strokeStyle = "#fa541c";
          state.rotate = -10;
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state)
          });
          state.rotate = 10;
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state)
          });
          state.rotate = 0;
          this.$attrs.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state)
          });
          break;
      }

      this.$emit('change', this.$attrs.node);

    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped></style>
