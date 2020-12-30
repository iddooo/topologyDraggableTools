<template>
  <div class="page">
    <div class="tools">
      <Tools
        @dragstart="onDrag"
        @editComponent="editComponent"
        @delComponent="delComponent"
        @delImage="delImage"
        @addImage="addImage"
        :userMenusData="userMenusData"
        :userImagesData="userImagesData">
        <div class="operate">
            <el-button @click="saveComponent" size="small" type="primary" icon="el-icon-upload2">保存组件</el-button>
        </div>
      </Tools>
    </div>

    <div
      id="topology-canvas"
      class="full"
      @contextmenu="onContextMenu($event)"
    ></div>

    <div class="props">
      <!-- 画布属性面板 -->
      <PageProps
        v-if="canvas && !props.node"
        :canvas="canvas"
        :page="pageData"
        :userImagesData="userImagesData"
        @change="onRender">
        <div class="operate">
            <el-button @click="save" size="small" type="primary" icon="el-icon-document-checked">保存页面</el-button>
            <el-button @click="preview" type="primary" size="small" icon="el-icon-view">预览</el-button>
        </div>
      </PageProps>
      <!-- 节点属性面板 -->
      <CanvasProps
        v-if="props.node"
        :node="props.node"
        :userImagesData="userImagesData"
        @change="onUpdateProps">
      </CanvasProps>
    </div>

    <div
      class="context-menu"
      v-show="contextmenu.left"
      :style="this.contextmenu">
        <CanvasContextMenu 
        :canvas="canvas" 
        :props.sync="props" />
    </div>

    <el-dialog
      title='组件名称'
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-input v-model="name"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="cfmSaveComponent">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as FileSaver from "file-saver";
import { canvasRegister } from "~/services/canvas.js";

// 1. 导入绘画引擎
import { Topology, Node } from "@topology/core";

// 2. 导入属性组件
import CanvasProps from "~/components/CanvasProps";
// 3. 导入右键操作面板
import CanvasContextMenu from "~/components/CanvasContextMenu";
// 4. 导入左侧组件列表
import Tools from "~/components/Tools/index";
// 5. 导入页面控制面板
import PageProps from "~/components/PageProps/index";

import {
  addComponent,
  editComponent,
  delComponent,
  componentList,
  addPage,
  uploadImg,
  delImg,
  getImgList
} from "~/api/zutai";

// 测试数据
import json from "~/json/test.json";

const canvasOptions = {
  rotateCursor: "/img/rotate.cur"
};
let canvas;

export default {
    components: {
        Tools,
        CanvasProps,
        PageProps,
        CanvasContextMenu
    },
    data() {
        return {
            // 工具
            userMenusData: [],
            uploadOptions: {},
            userImagesData: [],
            // 右键操作面板
            contextmenu: {
                left: null,
                top: null
            },
            props: {
                node: null,
                line: null,
                nodes: null,
                multi: false,
                expand: false,
                locked: false
            },
            canvas: canvas,
            TopologyData: undefined, //画布数据
            type: 'add', // 新增 add 编辑 edit
            editData: {},
            name: undefined,
            dialogFormVisible: false,
            pageData:{
                name:undefined,
                deviceId:undefined
            },
            id:undefined,//pageID
        };
    },
    created() {
        canvasRegister();
        this.getImageList();
        this.getComponentList();
        this.id = this.$route.query.id
    },
    mounted() {
        canvasOptions.on = this.onMessage;
        canvas = new Topology("topology-canvas", canvasOptions);
        this.canvas = canvas;
        console.log('初始化canvas',this.canvas)


        if (window.topologyData) {
            window.topologyData.locked = 0;
            canvas.open(window.topologyData);
            if(window.topologyData.websocket){
                canvas.openSocket(window.topologyData.websocket)
            }
        } 

        console.log('mounted canvas',this.canvas)
    },
    methods: {
        // 图片 ========start
        // 获取图片列表
        async getImageList() {
            let res = await getImgList();
            let result = res.data.reduce((a, v) => {
                a.push({
                id: v.id,
                data: {
                    rect: v.rect,
                    name: v.name,
                    image: v.image
                }
                });
                return a;
            }, []);
            this.userImagesData = result;
        },
        // 添加图片
        addImage(data) {
            let d = {
                width: data.data.rect.width,
                height: data.data.rect.height,
                name: data.data.name,
                image: data.data.image
            };
            uploadImg(d).then(res => {
                this.getImageList();
            });
        },
        // 删除图片
        delImage(data) {
            delImg({ id: data.id }).then(res => {
                this.getImageList();
            });
        },
        // 图片 ========end
        onDrag(event, node) {
            event.dataTransfer.setData("text", JSON.stringify(node.data));
        },
        onUpdateProps(node) {
            // 如果是node属性改变，需要传入node，重新计算node相关属性值
            // 如果是line属性改变，无需传参
            canvas.updateProps(node);
        },
        onRender() {
            // 重绘画布
            console.log(this.canvas)
            canvas.render();
        },
        onContextMenu(event) {
            event.preventDefault();
            event.stopPropagation();

            if (event.clientY + 360 < document.body.clientHeight) {
                this.contextmenu = {
                left: event.clientX + "px",
                top: event.clientY + "px"
                };
            } else {
                this.contextmenu = {
                left: event.clientX + "px",
                bottom: document.body.clientHeight - event.clientY + "px"
                };
            }
        },
        onMessage(event, data) {
            // console.log("onMessage", event, data);
            // 右侧输入框编辑状态时点击编辑区域其他元素，onMessage执行后才执行onUpdateProps方法，通过setTimeout让onUpdateProps先执行
            setTimeout(() => {
                switch (event) {
                case "node":
                case "addNode":
                    this.props = {
                    node: data,
                    line: null,
                    multi: false,
                    expand: this.props.expand,
                    nodes: null,
                    locked: data.lockedb
                    };
                    break;
                case "line":
                case "addLine":
                    this.props = {
                    node: null,
                    line: data,
                    multi: false,
                    nodes: null,
                    locked: data.locked
                    };
                    break;
                case "multi":
                    this.props = {
                    node: null,
                    line: null,
                    multi: true,
                    nodes: data.length > 1 ? data : null,
                    locked: this.getLocked({ nodes: data })
                    };
                    break;
                case "space":
                    this.props = {
                    node: null,
                    line: null,
                    multi: false,
                    nodes: null,
                    locked: false
                    };
                    this.contextmenu = {
                    left: null,
                    top: null
                    };
                    break;
                case "moveOut":
                    break;
                case "moveNodes":
                case "resizeNodes":
                    if (data.length > 1) {
                    this.props = {
                        node: null,
                        line: null,
                        multi: true,
                        nodes: data,
                        locked: this.getLocked({ nodes: data })
                    };
                    } else {
                    this.props = {
                        node: data[0],
                        line: null,
                        multi: false,
                        nodes: null,
                        locked: false
                    };
                    }
                    break;
                case "resize":
                case "scale":
                case "locked":
                    // if (canvas && canvas.data) {
                    //   this.$store.commit('canvas/data', {
                    //     scale: canvas.data.scale || 1,
                    //     lineName: canvas.data.lineName,
                    //     fromArrowType: canvas.data.fromArrowType,
                    //     toArrowType: canvas.data.toArrowType,
                    //     fromArrowlockedType: canvas.data.locked
                    //   });
                    // }
                    break;
                }
            }, 0);
        },
        getLocked(data) {
            let locked = true;
            if (data.nodes && data.nodes.length) {
                for (const item of data.nodes) {
                if (!item.locked) {
                    locked = false;
                    break;
                }
                }
            }
            if (locked && data.lines) {
                for (const item of data.lines) {
                if (!item.locked) {
                    locked = false;
                    break;
                }
                }
            }

            return locked;
        },
        handle_save(data) {
            FileSaver.saveAs(
                new Blob([JSON.stringify(canvas.data)], {
                type: "text/plain;charset=utf-8"
                }),
                `page.json`
            );
        },

        handle_savePng(data) {
            canvas.saveAsImage("le5le.topology.png");
        },
        // 预览
        preview() {
            window.topologyData = window.topology.data;
            this.$router.push({
                path: "/preview"
            });
        },
        // 保存页面
        save() {
            console.log(this.canvas,this.pageData)
            let page = {
                ...this.pageData,
                data:JSON.stringify(this.canvas.data)
            }
            addPage(page).then(res=>{
                
            })
        },
        // 组件========start
        addComponent(){
            this.type = 'add'
            this.dialogFormVisible = true;
            this.name = undefined
        },
        editComponent(data) {
            this.type = 'edit'
            this.editData = data;
            this.name = data.name
            this.canvas.open({pens:[data.data]})
            console.log('editComponent',this.canvas)
        },
        // 删除组件
        delComponent(data) {
            delComponent({ id: data.id }).then(res => {
                this.getComponentList();
            });
        },
        // 保存组件
        saveComponent() {
            // 画布内容验证
            let image = window.topology.toImage();
            if (image == "data:,") {
                this.$message.error("画布为空");
                return;
            }

            // 新增组件
            if(!this.name){
                this.type=='add'
                this.dialogFormVisible = true
                return;
            }

            // 编辑组件
            let jsonData = JSON.stringify(window.topology.toComponent())
            let componentData = {
                id:this.editData.id,
                name:this.editData.name,
                image: image,
                data: jsonData
            }
            editComponent(componentData).then(res => {
                this.getComponentList();
            });
        },
        cfmSaveComponent() {
            if(!this.name){
                this.$message.error("组件名称不能为空");
                return;
            }
            let image = window.topology.toImage();
            let jsonData = JSON.stringify(window.topology.toComponent())

            let componentData = {
                    name: this.name,
                    image: image,
                    data: jsonData
            };
            addComponent(componentData).then(res => {
                this.getComponentList();
                this.dialogFormVisible = false
            });
        },
        // 组件列表
        getComponentList() {
            componentList().then(res => {
                this.userMenusData = res.data.map(v => {
                    v.data = JSON.parse(v.data)
                    return v
                });;
            });
        }
        // 组件========end
    }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  width: 100%;
  height: 100%;
  .tools {
    width: 260px;
    height: 100%;
    overflow: scroll;
  }

  .full {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #020a21;
    .head {
      height: 40px;
      color: #ffffff;
      padding-left: 20px;
    }
    #topology-canvas {
      flex: 1;
    }
  }

  .props {
    width: 300px;
    height: 100%;
    overflow: scroll;
  }

  .context-menu {
    position: fixed;
    z-index: 10;
  }
}

.operate{
    padding: 8px 0 10px 10px;
}
</style>
