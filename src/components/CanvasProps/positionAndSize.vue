<template>
  <div class=''>
    <el-row>
      <el-col :span="12">X（px）</el-col>
      <el-col :span="12">Y（px）</el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><el-input v-model.number="$attrs.node.rect.x" @change="onChange"/></el-col>
      <el-col :span="12"><el-input v-model.number="$attrs.node.rect.y" @change="onChange"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="12">宽（px）</el-col>
      <el-col :span="12">高（px）</el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><el-input v-model.number="$attrs.node.rect.width" @change="onChange"/></el-col>
      <el-col :span="12"><el-input v-model.number="$attrs.node.rect.height" @change="onChange"/></el-col>
    </el-row>
  </div>
</template>

<script>

export default {
    name:'',
    components: {},
    data() {
      return {
        
      };
    },
    computed: {},
    watch: {},
    methods: {
      onChange(value){
        this.$emit('change', this.$attrs.node);
      },
    },
    created() {
 
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>

</style>