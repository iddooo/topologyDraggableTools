<template>
  <div class="image-props">
    <div class="flex-ct">
        <div class="sub-title">图片选择</div>
        <div class="flex-ct">
            <i class="change el-icon-document-add" @click="changeImage"></i>
            <img class="img-style" :src="$attrs.node.image">
        </div>
    </div>
</div>
</template>

<script>
import userImages from "../Tools/userImages";
// import positionAndSize from './positionAndSize'
export default {
  name: "",
  components: {
    userImages,
    // positionAndSize
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
      changeImage(){

      },
      onChange(value){
        this.$emit('change', this.node);
    },
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.change{
    font-size: 20px;
    margin: 0 10px;
}
.img-style{
    max-width: 100px;
}
</style>
