<template>
  <div class="image-props">
    <div class="flex-ct">
        <div class="sub-title">更换图片</div>
        <div class="flex-ct">
            <i class="change el-icon-document-add" @click="changeImage"></i>
            <img class="img-style" :src="$attrs.node.image">
        </div>
    </div>

    <div class="image-chose-box">
        <userImages v-bind="$attrs" @click="click"/>
    </div>
</div>
</template>

<script>
import userImages from "../Tools/userImages";
export default {
  name: "",
  components: {
    userImages
  },
  data() {
    return {
        visible:false
    };
  },
  computed: {},
  watch: {},
  methods: {
      changeImage(){
          this.visble = true
      },
      onChange(value){
        this.$emit('change', this.node);
    },
    click(data){
        // 点击选择图片 更新当前图片节点的图片
        this.$attrs.node.image = data.data.image
        this.onChange()
    }

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
.sub-title{
    margin-right: 20px;
}
// .image-chose-box{
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
// }
</style>
