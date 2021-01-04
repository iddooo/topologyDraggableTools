<template>
    <div class="tools-box">
        <el-tabs type="border-card" stretch>
            <!-- 系统组件 -->
            <!-- <el-tab-pane label="系统组件">
                <defalutMenus 
                    :defalutMenusData="defalutMenusData"
                    @dragstart="onDrag" />
            </el-tab-pane> -->
            <el-tab-pane label="我的组件">
                <div>
                    <slot/>
                    <userMenus v-bind="$attrs" v-on="$listeners" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="我的图片">
                <div>
                    <el-upload
                        class="operate"
                        multiple
                        :action="uploadOptions.action"
                        :headers="uploadOptions.headers"
                        :data="uploadOptions.data"
                        :name="uploadOptions.name"
                        :on-success="handleSuccess"
                        :before-upload="handleBeforeUpload">
                            <el-button size="small" type="primary" icon="el-icon-picture">上传图片</el-button>
                        </el-upload>
                    <!-- 用户上传背景图 -->
                    <userImages v-bind="$attrs" v-on="$listeners" />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 默认组件
import defalutMenus from './defalutMenus'
import { defalutMenus as  defalutMenusData} from "~/services/defalutMenus.js";
// 用户组件
import userMenus from './userMenus'
// 默认图片
import userImages from './userImages'

var vm ;

export default {
    name:'',
    props:{
        defalutMenusData:{
            type:Array,
            required:false,
            default:()=>{
                return defalutMenusData
            }
        },
        uploadOptions:{
            type:Object,
            require:false,
            default:()=>{
                return {
                    action:"http://47.103.57.103:8006/zutai/img/upload",
                }
            }
        }
    },
    components: {
        defalutMenus,
        userMenus,
        userImages
    },
    data() {
        return {
            toolTypes:[
                // {type:1,name:"系统组件"},
                {type:2,name:"我的组件"},
                {type:3,name:"我的图片"},
            ],
            activeType:2,
            //   图片节点宽高
            rect:{
                width:50,
                height:50
            },
      };
    },
    computed: {},
    watch: {},
    methods: {
        onDrag(event, node) {
            this.$emit('dragstart',event, node)
        },
        addImage(data){
            this.$emit('event',{name:'addImage',data})
        },
        handleBeforeUpload(file){
            // 文件上传之前 获取文件的width height
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function(e){
                let img = new Image()
                img.src = e.target.result
                img.onload = function(){
                    // this 指向img
                    console.log('获取图片宽高',this.height,this.width)
                    vm.rect.width = this.width
                    vm.rect.height = this.height
                }
            }
        },
        handleSuccess(response, file, fileList){
            // console.log(response, file, fileList)
            // 上传成功后 获取文件的访问地址
            let url = response.data
            // 当前节点的 componentData
            let imageComponent = {
                // id,用来删除图片
                data:{
                    rect:{
                    ...vm.rect
                    },
                    name:"image", //不可改变
                    image:url
                }
            }

            // vm.userImages.push(imageComponent)
            vm.addImage(imageComponent)
        },
    },
    created() {
        vm = this // vm 当前实例的指向
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.el-upload{
    display: block!important;
}

.tools-box {
    width: 100%;
    height: 100%;
  }
</style>