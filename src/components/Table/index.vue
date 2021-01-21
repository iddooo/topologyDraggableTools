<template>
  <div class='table'>
      <el-table
      header-row-class-name="header-row"
      header-cell-class-name="header-cell"
      row-class-name="tb-row"
      cell-class-name='tb-cell'
      ref="table"
      :height="height"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :span-method="objectSpanMethod"
      :data="data" 
      v-loading="isLoading"
      :cell-style="tableRowStyle"
      @selection-change="handleSelectionChange">
            <slot name="head"/>
            <el-table-column v-for="(col,i) in columns" :key="i"
                :label="col.label" 
                :width="col.width"
                :prop="col.prop"
                :sortable="col.sortable"
                :fixed="col.fixed"
                :render-header="col.renderHeader"
                :show-overflow-tooltip="col.overflow"
                align="center">
                <template slot-scope="{row}">
                    <div v-if="col.slot">
                        <slot :name="col.prop" :row="row">{{row[col.prop]}}</slot>
                    </div>
                    <span v-else>
                        {{row[col.prop]}}
                    </span>
                </template>
            </el-table-column>
            <!-- <template slot="empty">
                <div class="empty">
                    <p>暂无数据</p>
                </div>
            </template> -->
      </el-table>
      
  </div>
</template>

<script>

export default {
    name:"Table",
    props:{
        data:{
            type:Array,
            required:true,
            default:()=>{
                return []
            }
        },
        columns:{
            type:Array,
            required:true,
            default:()=>{
                return []
            }
        },
        isLoading:{
            type:Boolean,
            required:false,
            default:false
        },
        showSummary:{
            type:Boolean,
            required:false,
            default:false
        },
        summaryMethod:{
            type:Function,
            required:false
        },
        objectSpanMethod:{
            type:Function,
            required: false
        },
        tableRowStyle:{
            type: Function,
            required: false
        },
        height:{
            type:[String,Number],
            required:false
        },
        fixed:{
            type:[String],
            required:false
        }
    },
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSelectionChange(val){
            this.$emit('selection-change',val)
        },
        filterRow(row){
            if(row&&row.isNotSelectable){
                return false
            }else{
                return true
            }
        },
    },
    created() {
    
    },
    mounted() {
        // console.log(this.$refs);
    },
}
</script>
<style lang='scss' scoped>

</style>
