<template>
    <div class='page-props'>
        <el-tabs type="border-card" stretch>
            <el-tab-pane label="图文">
                <slot></slot>
                <attribute v-bind="$attrs" v-on="$listeners"/>
            </el-tab-pane>
            <el-tab-pane label="通信">
                <connect v-bind="$attrs" v-on="$listeners"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import attribute from './attribute'
import connect from './connect'

export default {
    name:'',
    components: {
        attribute,
        connect
    },
    data() {
      return {
    
      };
    },
    computed: {},
    watch: {
    },
    methods: {
    },
    created() {
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.page-props{
    width: 100%;
    height: 100%;
    .el-tabs{
        min-height: 100%;
    }
}
</style>