<template>
    <div class="user-image">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="本地图片" name="1">
                <div :class="['u-image',{'active':activeClickIndex===btn.id}]"
                    v-for="btn in defalutUserImagesData"
                    :key="btn.id"
                    @click="onClick(btn)"
                    :draggable="true" 
                    @dragstart="onDrag($event, btn)">
                    <img :src="btn.data.image" alt="">
                </div>
            </el-collapse-item>
            <el-collapse-item title="网络图片" name="2">
                <div :class="['u-image',{'active':activeClickIndex===btn.id}]"
                    v-for="(btn,i) in $attrs.userImages"
                    :key="btn.id"
                    @click="onClick(btn)"
                    @mouseenter="onMouseenter(i)"
                    @mouseleave="onMouseleave(i)"
                    :draggable="true" 
                    @dragstart="onDrag($event, btn)">
                    <img :src="btn.data.image" alt="">
                    <i v-show="activeHoverIndex===i" 
                        class="del el-icon-close"
                        :style="{color:iconColor}"
                        @mouseenter="iconColor=activeColor"
                        @mouseleave="iconColor='grey'"
                        @click="del(btn)" ></i>
                </div>
            </el-collapse-item>
        </el-collapse>
        
    </div>
</template>

<script>
import { userImages as defalutUserImagesData} from "~/services/userImages.js";

export default {
    name:'',
    components: {},
    // props:['data'],
    data() {
      return {
        iconColor:'grey',
        activeHoverIndex:undefined,
        activeClickIndex:undefined,
        defalutUserImagesData,
        activeNames:['1','2'],
        activeColor:'#25D9FF'
      };
    },
    computed: {},
    watch: {},
    methods: {
        onDrag(event, node) {
            this.$emit('dragstart',event, node)
        },
        del(data){
            this.$emit('event',{name:'delImage',data})
        },
        onClick(data){
            this.activeClickIndex = data.id
            this.$emit('click',data)
        },
        onMouseenter(i){
            this.activeHoverIndex = i
        },
        onMouseleave(i){
            this.activeHoverIndex = undefined
        },
    },
    created() {
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.u-image{
    display: inline-block;
    margin: 10px 10px;
    height: 50px;
    width: 50px;
    position: relative;
    cursor: pointer;
    img{
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
    .del{
        font-size: 20px;
        position: absolute;
        right: 0;
        top: 0;
    }
    &.active{
        border: 1px solid lightblue;
    }
}
</style>