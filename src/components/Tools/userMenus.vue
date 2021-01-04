<template>
    <div class="user-menus">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="默认组件" name="1">
                <div class="coms">
                    <div v-for="(btn, i) in defalutUserMenus" 
                        :key="i" 
                        class="com"
                        :title="btn.name" 
                        :draggable="btn.data" 
                        @dragstart="onDrag($event, btn)">
                        <i v-if="btn.icon" :class="`iconfont ${btn.icon}`"></i>
                        <img v-else :src="btn.image" alt="">
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="我的组件" name="2">
                <div class="coms">
                    <div v-for="(btn, i) in $attrs.userMenus" 
                        :key="i" 
                        class="com"
                        :title="btn.name" 
                        :draggable="btn.data" 
                        @mouseenter="activeComIndex=i"
                        @mouseleave="activeComIndex=undefined"
                        @dragstart="onDrag($event, btn)">
                        <i v-if="btn.icon" :class="`iconfont ${btn.icon}`"></i>
                        <img v-else :src="btn.image" alt="">
                        <i v-show="activeComIndex===i" 
                            class="edit el-icon-edit-outline"
                            :style="{color:editIconColor}"
                            @mouseenter="editIconColor=activeColor"
                            @mouseleave="editIconColor='grey'"
                            @click="edit(btn)" ></i>
                        <i v-show="activeComIndex===i" 
                            class="del el-icon-delete"
                            :style="{color:deleteIconColor}"
                            @mouseenter="deleteIconColor=activeColor"
                            @mouseleave="deleteIconColor='grey'"
                            @click="del(btn)" ></i>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
    
</template>

<script>
import { userMenus as defalutUserMenus } from "~/services/userMenus.js";

export default {
    name:'',
    components: {},
    data() {
      return {
        editIconColor:'grey',
        deleteIconColor:'grey',
        activeComIndex:undefined,
        activeNames:['1','2'],
        defalutUserMenus,
        activeColor:'#25D9FF'
      };
    },
    computed: {},
    watch: {},
    methods: {
        onDrag(event, node) {
            this.$emit('dragstart',event, node)
        },
        edit(data){
            this.$emit('event',{name:'editComponent',data})
        },
        del(data){
            this.$emit('event',{name:'delComponent',data})
        }
    },
    created() {
 
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.coms{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.com{
    width: 40%;
    height: 40px;
    position: relative;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
        // box-shadow: 1px 1px 16px 3px rgba(0,0,0,0.1);
    
    img{
        width: 64px;
        height: 40px;
        object-fit: contain;
    }
    .del{
        font-size: 20px;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .edit{
        font-size: 20px;
        position: absolute;
        right: 0;
        top: 0;
    }

}
</style>