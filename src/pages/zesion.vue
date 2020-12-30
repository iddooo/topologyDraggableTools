<template>
  <div class='page'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/zesion' }">我的工具</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">我的页面</el-breadcrumb-item>
    </el-breadcrumb>  

    <div class="box">
        <div v-for="item in pageList" :key="item.id" class="item">
            <div class="page-name">
                <p>{{item.name}}</p>
            </div>
            <div class="col">
                <i @click="edit(item)" class="icon el-icon-edit"></i>
                <i @click="preview(item)" class="icon el-icon-view"></i>
                <i @click="del(item)" class="icon el-icon-delete"></i>
            </div>
        </div>

    </div>
      
  </div>
</template>

<script>
import { getPageList,delPage } from "~/api/zutai";
export default {
    name:'',
    components: {},
    data() {
      return {
          pageList:[]
      };
    },
    computed: {},
    watch: {},
    methods: {
        edit(data){
            this.$router.push({
                path: "/edit",
                query:{id:data.id}
            });
            window.topologyData = JSON.parse(data.data)
        },
        preview(data){
            window.topologyData = JSON.parse(data.data)
            this.$router.push({
                path: "/preview"
            });
        },
        del(data){
            delPage({id:data.id}).then(res=>{
                this.init()
            })
        },
        init(){
            getPageList().then(res=>{
                this.pageList = res.data
            })
        }
    },
    created() {
        this.init()
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.page{
    padding: 20px;
    .box{
        display: flex;
        flex-wrap: wrap;
        
    }
    .item{
        padding: 20px;
        margin-right: 20px;
        width: 150px;
        box-shadow: 0 15px 30px rgba(0,0,0,.1);
    }
    .col{
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
    }
    .icon{
        font-size: 20px;
    }
    .page-name{
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        p{
            text-align: center;
            line-height: 25px;
        }
    }
}
</style>