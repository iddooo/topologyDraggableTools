<template>
  <div class=''>
      <el-menu
      :collapse='!sidebar.opened'
      text-color="#303133"
      active-text-color="#409EFF"
      :router="true">
        <div v-for="(item, i) in router"
            :key="i">
            <el-submenu
                :index="item.path"
                v-if="item.children">
                <div class="title elips" slot="title">{{item.meta.title}}</div>
                <el-menu-item
                    v-for="(subItem, ii) in item.children"
                    :key="i+'-'+ii"
                    v-show="!subItem.hidden"
                    :index="subItem.path">
                    {{subItem.meta.title}}
                </el-menu-item>
            </el-submenu>
            <el-menu-item
                v-else
                :index="item.path"
                v-show="!item.hidden">
                {{item.meta.title}}
            </el-menu-item>
        </div>
        
        
      </el-menu>
  </div>
</template>

<script>
import { zesionRouter } from '~/router'
import { mapGetters } from 'vuex'

export default {
    name:'',
    components: {},
    data() {
      return {
          router:zesionRouter
      };
    },
    computed: {
        ...mapGetters(['sidebar'])
    },
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
.title{
    width: 100%;
}
</style>