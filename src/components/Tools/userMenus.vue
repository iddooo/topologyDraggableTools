<template>
    <div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="默认组件" name="1">
                <div class="coms">
                    <div v-for="(btn, i) in defalutUMenusData" 
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
            <el-collapse-item title="我的组件" name="1">
                <div class="coms">
                    <div v-for="(btn, i) in data" 
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
import { userMenus as defalutUMenusData } from "~/services/userMenus.js";

export default {
    name:'',
    components: {},
    props:['data'],
    data() {
      return {
        editIconColor:'grey',
        deleteIconColor:'grey',
        activeComIndex:undefined,
        activeNames:['1','2'],
        defalutUMenusData,
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
            this.$emit('edit',data)
        },
        del(data){
            this.$emit('del',data)
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
    padding: 8px;
}
.com{
    display: inline-block;
    width: 50%;
    height: 40px;
    padding-left: 10px;
    margin: 8px auto 4px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
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