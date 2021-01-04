<template>
  <div class='attribute'>
      <el-form ref="form" size="mini">
          <el-form-item label="页面名称">
              <el-input v-model="$attrs.page.name"></el-input>
          </el-form-item>
          <el-form-item label="设备ID">
              <el-input size="mini" v-model="$attrs.page.deviceId"></el-input>
          </el-form-item>
          <el-form-item label="背景颜色">
                <div class="flex-ct">
                    <colorPicker v-model="color"  @change="headleChangeColor"/>
                    <div class="ml-20">
                        <el-input size="mini" v-model="$attrs.canvas.data.bkColor" @change="onChange"></el-input>
                    </div>
                </div>
          </el-form-item>
          <el-form-item label="背景图片">
                <div v-show="!$attrs.canvas.data.bkImage">
                    <i class="el-icon-document-add" @click="addbkImage"></i>
                </div>
                <div v-show="$attrs.canvas.data.bkImage">
                    <img :src="$attrs.canvas.data.bkImage">
                    <i class="el-icon-delete" @click="delbkImage"></i>
                </div>
          </el-form-item>
      </el-form>
      
      <div class='image-box'>
            <userImages @click="choosebkImage"/>
      </div>
  </div>
</template>

<script>
import imageProps from '../CanvasProps/imageProps'
import userImages from "../Tools/userImages";

export default {
    name:'',
    components: {
        imageProps,
        userImages
    },
    data() {
      return {
        color:'#fff',
      };
    },
    computed: {},
    watch: {
        '$attrs.canvas.data.bkColor':{
            immediate:true,
            handler(v){
                console.log('背景色：',v)
                this.color = v ? v : '#fff'
            }
        },
        '$attrs.canvas.data.bkImage':{
            immediate:true,
            deep:true,
            handler(v){
                console.log('背景图 :>> ', v);
            }
        }
    },
    methods: {
        headleChangeColor(v){
            this.$attrs.canvas.data.bkColor = v
            this.$emit('change', this.$attrs.canvas);
        },
        onChange(value){
            this.$emit('change', this.$attrs.canvas);
        },
        choosebkImage(data){
            this.$attrs.canvas.clearBkImg()
            this.$attrs.canvas.data.bkImage = data.data.image
            this.$emit('change', this.$attrs.canvas);
        },
        addbkImage(){

        },
        delbkImage(){

        }
    },
    created() {
 
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.ml-20{
    margin-left: 20px;
}
.m-colorPicker{
    border: 1px solid#DCDFE6;
}
</style>