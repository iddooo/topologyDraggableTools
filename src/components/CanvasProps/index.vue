<template>
    <div class='canvas-props'>
        <el-tabs type="border-card" stretch>
            <el-tab-pane label="外观">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="位置和大小" name="1">
                        <positionSize v-bind="$attrs" v-on="$listeners" />
                    </el-collapse-item>
                    <el-collapse-item title="文字" name="2"
                        v-show="textNodeList.length>0">
                        <fontStyle
                            v-for="(n,i) in textNodeList"
                            :key="i"
                            :node="n"
                            @change="onChange" />
                    </el-collapse-item>
                    <el-collapse-item title="图片" name="3"
                        v-show="imageNodeList.length>0">
                        <imageProps
                            v-bind="$attrs"
                            v-for="(n,i) in imageNodeList"
                            :key="i"
                            :node="n"
                            @change="onChange" />
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>

            <el-tab-pane label="事件">
                <el-button type="primary" @click="addEvent">添加事件</el-button>
                <div class="event"  
                    v-for="(e,i) in $attrs.node.events" 
                    :key="i">
                    <div class="e-title">
                        <div>事件</div>
                        <i @click="delEvent(i)" class="el-icon-delete"></i>
                    </div>
                    <event :event="e" />
                </div>
            </el-tab-pane>

            <el-tab-pane label="数据">
                <div>{{$attrs.node.id}}</div>
                <componetData v-bind="$attrs" v-on="$listeners"/>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
import positionSize from './positionSize'
import fontStyle from './fontStyle'
import event from './event'
import componetData from './componetData'
import imageProps from './imageProps'


const eModel = {
  type:2,
  name:undefined,
  action:undefined,
  value:undefined
}

export default {
    name:'',
    components: {
      positionSize,
      fontStyle,
      event,
      componetData,
      imageProps
    },
    data() {
      return {
        activeNames:["1","2",'3'],
        textNodeList:[],
        imageNodeList:[]
      };
    },
    watch: {
      '$attrs.node':{
            immediate:true,
            handler(node){
                console.log('node============',node)
                this.textNodeList = []
                this.imageNodeList = []
                if(node.name=='text'){
                    this.textNodeList.push(node)
                }
                if(node.name=='image'){
                    this.imageNodeList.push(node)
                }
                if(node.children){
                    node.children.forEach(n => {
                        if(n.name=='text'){
                            this.textNodeList.push(n)
                        }
                        if(n.name=='image'){
                            this.imageNodeList.push(n)
                        }
                    });
                }

                
            }
        }
    },
    computed: {},
    methods: {
      onChange(value){
        this.$emit('change', this.node);
      },
      addEvent(){
        this.$attrs.node.events.push(Object.assign({},eModel))
      },
      delEvent(i){
        this.$attrs.node.events.splice(i,1)
      },
    },
    created() {
 
    },
    mounted() {
    },
}
</script>
<style lang='scss' scoped>
.canvas-props{
    width: 100%;
    height: 100%;
}
.event{
  .e-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
.choose-img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}
</style>