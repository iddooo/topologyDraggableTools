<template>
  <div class=''>
      <el-menu
      :collapse='false'
      text-color="#303133"
      active-text-color="#409EFF"
      :router="true"
      @open="open"
      @close="close">
        <div v-for="(item, i) in router"
            :key="i">
            <el-submenu
                :index="item.path"
                v-if="item.children">
                <span slot="title">{{item.meta.title}}</span>
                <el-menu-item
                    v-for="(subItem, ii) in item.children"
                    :key="i+'-'+ii"
                    v-if="!subItem.hidden"
                    :index="subItem.path">
                    {{subItem.meta.title}}
                </el-menu-item>
            </el-submenu>
            <el-menu-item
                v-else
                :index="item.path">
                {{item.meta.title}}
            </el-menu-item>
        </div>
        
        
      </el-menu>
  </div>
</template>

<script>
import { zesionRouter } from '~/router'
export default {
    name:'',
    components: {},
    data() {
      return {
          router:zesionRouter
      };
    },
    computed: {},
    watch: {},
    methods: {
        open(){

        },
        close(){

        }

    },
    created() {
 
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.el-menu{
    border: 0;
}
</style>