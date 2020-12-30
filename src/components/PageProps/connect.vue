<template>
    <div>
        <div class="content">
            <div class="title">Websocket</div>
            <el-input size="mini" v-model="websocket" @change="opWebsocket"></el-input>
        </div>
        <!-- <div class="content">
            <div class="title">MQTT地址</div>
            <div class="sub-title">URL地址 *</div>
            <el-input size="mini" v-model="mqttUrl" @change="onChange"></el-input>
            <div class="sub-title">Client ID</div>
            <el-input size="mini" v-model="mqttOptions.clientId" @change="onChange"></el-input>
            <div class="sub-title">用户名</div>
            <el-input size="mini" v-model="mqttOptions.username" @change="onChange"></el-input>
            <div class="sub-title">密码</div>
            <el-input size="mini" v-model="mqttOptions.password" @change="onChange"></el-input>
            <div class="sub-title">topics *</div>
            <el-input size="mini" v-model="mqttTopics" @change="onChange"></el-input>
        </div> -->
    </div>
</template>

<script>

export default {
    name:'',
    components: {},
    data() {
      return {
        websocket:undefined,
        mqttUrl:undefined,
        mqttOptions:{},
        mqttTopics:undefined,
      };
    },
    watch:{
        '$attrs.canvas.socket'(v){
            // 默认赋值
            this.websocket = v.url
        }
    },
    methods: {
        onChange(value){
            // this.$emit('change', this.props);
        },
        // 连接websocket
        opWebsocket(value){
            this.$attrs.canvas.data.websocket = value
            this.$attrs.canvas.openSocket(value)
            console.log('输入websocket后： ',this.$attrs.canvas)
        }
    },
    created() {
            
    },
    mounted() {
        console.log(this.$attrs.canvas)
    },
}
</script>
<style lang='scss' scoped>
.content{
    padding: 16px;
}
</style>